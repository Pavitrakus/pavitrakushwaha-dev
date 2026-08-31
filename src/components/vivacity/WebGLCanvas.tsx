"use client";

import { useEffect, useRef } from "react";
import {
  BufferAttribute,
  BufferGeometry,
  CircleGeometry,
  Color,
  DoubleSide,
  Group,
  Line,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Raycaster,
  Scene,
  SphereGeometry,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Line2 } from "three/addons/lines/Line2.js";
import { LineGeometry } from "three/addons/lines/LineGeometry.js";
import { LineMaterial } from "three/addons/lines/LineMaterial.js";
import { INC, STEPS, type Body } from "@/lib/vivacity/orbit";
import { simulate } from "@/lib/vivacity/runtime";
import type { OrbitViewProps } from "./types";

const BG = 0x050505;
const TRAIL = 56;
const STRIDE = 2;

function flatten(path: Body[], stride = STRIDE) {
  const pts: number[] = [];
  for (let i = 0; i < path.length; i += stride) {
    const b = path[i];
    pts.push(b.x, b.y, b.z);
  }
  const last = path[path.length - 1];
  if (path.length && (path.length - 1) % stride !== 0) {
    pts.push(last.x, last.y, last.z);
  }
  return pts;
}

function latLonSphere(radius: number, lats: number, lons: number) {
  const positions: number[] = [];
  for (let i = 1; i < lats; i++) {
    const lat = (i / lats - 0.5) * Math.PI;
    const r = radius * Math.cos(lat);
    const y = radius * Math.sin(lat);
    for (let j = 0; j < 64; j++) {
      const a0 = (j / 64) * Math.PI * 2;
      const a1 = ((j + 1) / 64) * Math.PI * 2;
      positions.push(
        r * Math.sin(a0),
        y,
        r * Math.cos(a0),
        r * Math.sin(a1),
        y,
        r * Math.cos(a1),
      );
    }
  }
  for (let i = 0; i < lons; i++) {
    const lon = (i / lons) * Math.PI * 2;
    for (let j = 0; j < 48; j++) {
      const a0 = (j / 48 - 0.5) * Math.PI;
      const a1 = ((j + 1) / 48 - 0.5) * Math.PI;
      positions.push(
        radius * Math.cos(a0) * Math.sin(lon),
        radius * Math.sin(a0),
        radius * Math.cos(a0) * Math.cos(lon),
        radius * Math.cos(a1) * Math.sin(lon),
        radius * Math.sin(a1),
        radius * Math.cos(a1) * Math.cos(lon),
      );
    }
  }
  const geo = new BufferGeometry();
  geo.setAttribute("position", new BufferAttribute(new Float32Array(positions), 3));
  return geo;
}

function planeNormal() {
  return new Vector3(0, -Math.sin(INC), Math.cos(INC)).normalize();
}

function makeRing(radius: number, color: number, opacity: number) {
  const pts: number[] = [];
  const n = 128;
  const nrm = planeNormal();
  const q = new Vector3(0, 0, 1);
  const axis = new Vector3().crossVectors(q, nrm);
  const angle = Math.acos(Math.max(-1, Math.min(1, q.dot(nrm))));
  const rot = (p: Vector3) => {
    if (axis.lengthSq() < 1e-8) return p;
    return p.applyAxisAngle(axis.normalize(), angle);
  };
  for (let i = 0; i <= n; i++) {
    const a = (i / n) * Math.PI * 2;
    const p = rot(new Vector3(Math.cos(a) * radius, Math.sin(a) * radius, 0));
    pts.push(p.x, p.y, p.z);
  }
  const geo = new LineGeometry();
  geo.setPositions(pts);
  const mat = new LineMaterial({
    color,
    linewidth: radius === 1 ? 1.15 : 0.8,
    transparent: true,
    opacity,
    dashed: false,
  });
  const line = new Line2(geo, mat);
  line.computeLineDistances();
  return { line, mat };
}

function makeHatches(path: Body[]) {
  const positions: number[] = [];
  for (let i = 4; i < path.length - 4; i += 28) {
    const a = path[i];
    const b = path[i + 2];
    const tx = b.x - a.x;
    const ty = b.y - a.y;
    const tz = b.z - a.z;
    const rx = a.x;
    const ry = a.y;
    const rz = a.z;
    let hx = ty * rz - tz * ry;
    let hy = tz * rx - tx * rz;
    let hz = tx * ry - ty * rx;
    const len = Math.hypot(hx, hy, hz) || 1;
    const s = 0.07 / len;
    hx *= s;
    hy *= s;
    hz *= s;
    positions.push(a.x - hx, a.y - hy, a.z - hz, a.x + hx, a.y + hy, a.z + hz);
  }
  const geo = new BufferGeometry();
  geo.setAttribute("position", new BufferAttribute(new Float32Array(positions), 3));
  const mat = new LineBasicMaterial({
    color: 0xf0f0f0,
    transparent: true,
    opacity: 0.55,
  });
  return new LineSegments(geo, mat);
}

function makePickLine(path: Body[], id: string) {
  const geo = new BufferGeometry();
  geo.setAttribute(
    "position",
    new BufferAttribute(new Float32Array(flatten(path, 4)), 3),
  );
  const mat = new LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0,
    depthWrite: false,
  });
  const line = new Line(geo, mat);
  line.userData.branchId = id;
  return line;
}

function disposeObject(root: Group | Scene) {
  root.traverse((obj) => {
    const mesh = obj as Mesh;
    if (mesh.geometry) mesh.geometry.dispose();
    const mat = mesh.material;
    if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
    else if (mat) mat.dispose();
  });
}

export function WebGLCanvas({
  runtimeRef,
  gen,
  autoRotate,
  onSelect,
  onInteract,
  onFrame,
}: OrbitViewProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const genRef = useRef(gen);
  const autoRef = useRef(autoRotate);
  const onSelectRef = useRef(onSelect);
  const onInteractRef = useRef(onInteract);
  const onFrameRef = useRef(onFrame);

  genRef.current = gen;
  autoRef.current = autoRotate;
  onSelectRef.current = onSelect;
  onInteractRef.current = onInteract;
  onFrameRef.current = onFrame;

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const scene = new Scene();
    scene.background = new Color(BG);

    const camera = new PerspectiveCamera(42, 1, 0.12, 80);
    camera.position.set(5.1, 2.35, 4.6);

    const renderer = new WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(BG, 1);
    renderer.domElement.className = "viva-sim-canvas";
    renderer.domElement.setAttribute(
      "aria-label",
      "two-body orbit an agent can inspect, kick, and fork",
    );
    wrap.appendChild(renderer.domElement);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.07;
    controls.enablePan = false;
    controls.minDistance = 2.4;
    controls.maxDistance = 14;
    controls.autoRotate = autoRef.current && !reduceMotion;
    controls.autoRotateSpeed = 0.55;
    controls.target.set(0, 0, 0);
    controls.addEventListener("start", () => {
      controls.autoRotate = false;
      onInteractRef.current();
    });

    const world = new Group();
    scene.add(world);

    const globe = new Group();
    const ball = new Mesh(
      new SphereGeometry(0.992, 48, 32),
      new MeshBasicMaterial({ color: BG }),
    );
    globe.add(ball);
    const wire = new LineSegments(
      latLonSphere(1, 11, 14),
      new LineBasicMaterial({
        color: 0xd4d4d4,
        transparent: true,
        opacity: 0.28,
      }),
    );
    globe.add(wire);
    const terminator = new Line(
      new BufferGeometry().setFromPoints(
        Array.from({ length: 97 }, (_, i) => {
          const a = (i / 96) * Math.PI * 2;
          return new Vector3(Math.cos(a), Math.sin(a) * 0.18, Math.sin(a)).multiplyScalar(1.002);
        }),
      ),
      new LineBasicMaterial({ color: 0xe8e8e8, transparent: true, opacity: 0.45 }),
    );
    globe.add(terminator);
    world.add(globe);

    const plane = new Mesh(
      new CircleGeometry(3.2, 96),
      new MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.035,
        side: DoubleSide,
        depthWrite: false,
      }),
    );
    plane.quaternion.setFromUnitVectors(new Vector3(0, 0, 1), planeNormal());
    world.add(plane);

    const rings: { line: Line2; mat: LineMaterial }[] = [];
    for (const R of [1, 2, 3]) {
      const ring = makeRing(R, 0xcfcfcf, R === 1 ? 0.38 : 0.16);
      world.add(ring.line);
      rings.push(ring);
    }

    const axisMat = new LineBasicMaterial({
      color: 0x9a9a9a,
      transparent: true,
      opacity: 0.28,
    });
    const axisGeo = new BufferGeometry();
    axisGeo.setAttribute(
      "position",
      new BufferAttribute(
        new Float32Array([
          0, 0, 0, 1.35, 0, 0, 0, 0, 0, 0, 1.35, 0, 0, 0, 0, 0, 0, 1.35,
        ]),
        3,
      ),
    );
    world.add(new LineSegments(axisGeo, axisMat));

    const paths = new Group();
    world.add(paths);

    const bodyMesh = new Mesh(
      new SphereGeometry(0.046, 16, 12),
      new MeshBasicMaterial({ color: 0xf6f6f6 }),
    );
    world.add(bodyMesh);

    const velGeo = new BufferGeometry();
    const velArr = new Float32Array(6);
    velGeo.setAttribute("position", new BufferAttribute(velArr, 3));
    const velLine = new Line(
      velGeo,
      new LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.85 }),
    );
    world.add(velLine);

    const trailArr = new Float32Array(TRAIL * 3);
    const trailGeo = new BufferGeometry();
    trailGeo.setAttribute("position", new BufferAttribute(trailArr, 3));
    const trail = new Line(
      trailGeo,
      new LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.32 }),
    );
    world.add(trail);

    const forkDots: Mesh[] = [];
    const forkDotGeo = new SphereGeometry(0.038, 10, 8);

    const pickables: Line[] = [];
    const raycaster = new Raycaster();
    raycaster.params.Line = { threshold: 0.14 };
    const pointer = new Vector2();

    let builtGen = -1;
    let parentLine: Line2 | null = null;
    let parentMat: LineMaterial | null = null;
    let hudTick = 0;
    let visible = true;
    let raf = 0;
    let live = true;
    let pointerDown: { x: number; y: number } | null = null;

    const io =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            (entries) => {
              visible = entries[0]?.isIntersecting ?? true;
            },
            { threshold: 0.05 },
          )
        : null;
    io?.observe(wrap);

    const sizeMats = () => {
      const w = wrap.clientWidth || 1;
      const h = wrap.clientHeight || 1;
      const dpr = Math.min(window.devicePixelRatio || 1, w < 640 ? 1.5 : 2);
      renderer.setPixelRatio(dpr);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      for (const r of rings) r.mat.resolution.set(w, h);
      if (parentMat) parentMat.resolution.set(w, h);
      paths.traverse((obj) => {
        const mat = (obj as Line2).material;
        if (mat && "resolution" in mat) mat.resolution.set(w, h);
      });
    };

    const ro = new ResizeObserver(sizeMats);
    ro.observe(wrap);
    sizeMats();

    const rebuildPaths = () => {
      disposeObject(paths);
      while (paths.children.length) paths.remove(paths.children[0]);
      pickables.length = 0;
      for (const d of forkDots) world.remove(d);
      forkDots.length = 0;

      const s = runtimeRef.current;
      const w = wrap.clientWidth || 1;
      const h = wrap.clientHeight || 1;

      const pgeo = new LineGeometry();
      pgeo.setPositions(flatten(s.parent));
      parentMat = new LineMaterial({
        color: 0xf4f4f4,
        linewidth: 1.65,
        transparent: true,
        opacity: 0.78,
      });
      parentMat.resolution.set(w, h);
      parentLine = new Line2(pgeo, parentMat);
      parentLine.computeLineDistances();
      paths.add(parentLine);
      const parentPick = makePickLine(s.parent, "b0");
      paths.add(parentPick);
      pickables.push(parentPick);

      for (const f of s.forks) {
        const geo = new LineGeometry();
        geo.setPositions(flatten(f.path));
        const selected = s.selected === f.id;
        const failed = f.verified === false;
        const mat = new LineMaterial({
          color: selected ? 0xffffff : 0xb0b0b0,
          linewidth: selected ? 1.8 : 1.1,
          transparent: true,
          opacity: selected ? 0.9 : 0.38,
          dashed: !selected,
          dashSize: 0.09,
          gapSize: 0.07,
        });
        mat.resolution.set(w, h);
        const line = new Line2(geo, mat);
        line.computeLineDistances();
        paths.add(line);
        if (failed) paths.add(makeHatches(f.path));
        const pick = makePickLine(f.path, f.id);
        paths.add(pick);
        pickables.push(pick);

        const dot = new Mesh(
          forkDotGeo,
          new MeshBasicMaterial({
            color: selected ? 0xffffff : 0xc0c0c0,
          }),
        );
        dot.userData.branchId = f.id;
        world.add(dot);
        forkDots.push(dot);
      }

      builtGen = genRef.current;
    };

    const hitTest = (clientX: number, clientY: number) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(pickables, false);
      if (hits.length) {
        const id = hits[0].object.userData.branchId as string;
        onSelectRef.current(id === "b0" ? null : id);
      }
    };

    const onDown = (e: PointerEvent) => {
      pointerDown = { x: e.clientX, y: e.clientY };
    };
    const onUp = (e: PointerEvent) => {
      if (!pointerDown) return;
      const dx = e.clientX - pointerDown.x;
      const dy = e.clientY - pointerDown.y;
      pointerDown = null;
      if (dx * dx + dy * dy > 16) return;
      hitTest(e.clientX, e.clientY);
    };
    renderer.domElement.addEventListener("pointerdown", onDown);
    renderer.domElement.addEventListener("pointerup", onUp);

    const draw = () => {
      if (!live) return;
      const s = runtimeRef.current;
      simulate(s, visible);
      if (controls.autoRotate && !autoRef.current) controls.autoRotate = false;

      if (builtGen !== genRef.current) rebuildPaths();

      const i = Math.max(0, Math.min(STEPS, Math.floor(s.t)));
      const body = s.parent[i] ?? s.parent[0];
      bodyMesh.position.set(body.x, body.y, body.z);

      velArr[0] = body.x;
      velArr[1] = body.y;
      velArr[2] = body.z;
      velArr[3] = body.x + body.vx * 0.5;
      velArr[4] = body.y + body.vy * 0.5;
      velArr[5] = body.z + body.vz * 0.5;
      velGeo.attributes.position.needsUpdate = true;

      for (let k = 0; k < TRAIL; k++) {
        const ti = Math.max(0, i - k * 2);
        const p = s.parent[ti] ?? body;
        trailArr[k * 3] = p.x;
        trailArr[k * 3 + 1] = p.y;
        trailArr[k * 3 + 2] = p.z;
      }
      trailGeo.attributes.position.needsUpdate = true;

      for (let f = 0; f < s.forks.length; f++) {
        const mesh = forkDots[f];
        if (!mesh) continue;
        const fb = s.forks[f].path[i] ?? s.forks[f].path[0];
        mesh.position.set(fb.x, fb.y, fb.z);
      }

      globe.rotation.y += visible ? 0.0012 : 0;
      controls.update();
      renderer.render(scene, camera);

      hudTick += 1;
      if (hudTick % 5 === 0) onFrameRef.current();

      raf = requestAnimationFrame(draw);
    };

    rebuildPaths();
    raf = requestAnimationFrame(draw);

    return () => {
      live = false;
      cancelAnimationFrame(raf);
      io?.disconnect();
      ro.disconnect();
      renderer.domElement.removeEventListener("pointerdown", onDown);
      renderer.domElement.removeEventListener("pointerup", onUp);
      controls.dispose();
      disposeObject(world);
      disposeObject(paths);
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [runtimeRef]);

  return <div ref={wrapRef} className="viva-sim-gl" />;
}
