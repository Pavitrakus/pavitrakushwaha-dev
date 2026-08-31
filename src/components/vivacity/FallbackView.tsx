"use client";

import { at, STEPS, type Body } from "@/lib/vivacity/orbit";
import { simulate } from "@/lib/vivacity/runtime";
import { useEffect, useRef } from "react";
import type { OrbitViewProps } from "./types";

function project(
  x: number,
  y: number,
  z: number,
  cx: number,
  cy: number,
  scale: number,
) {
  const az = 0.72;
  const el = 0.46;
  const ca = Math.cos(az);
  const sa = Math.sin(az);
  const ce = Math.cos(el);
  const se = Math.sin(el);
  const x1 = x * ca - z * sa;
  const z1 = x * sa + z * ca;
  const y1 = y * ce - z1 * se;
  return { sx: cx + x1 * scale, sy: cy - y1 * scale };
}

function drawPath(
  ctx: CanvasRenderingContext2D,
  path: Body[],
  cx: number,
  cy: number,
  scale: number,
  color: string,
  width: number,
  dashed: boolean,
) {
  if (path.length < 2) return;
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.setLineDash(dashed ? [4, 4] : []);
  ctx.beginPath();
  const p0 = project(path[0].x, path[0].y, path[0].z, cx, cy, scale);
  ctx.moveTo(p0.sx, p0.sy);
  for (let i = 2; i < path.length; i += 2) {
    const p = project(path[i].x, path[i].y, path[i].z, cx, cy, scale);
    ctx.lineTo(p.sx, p.sy);
  }
  ctx.stroke();
  ctx.setLineDash([]);
}

export function FallbackView({
  runtimeRef,
  onSelect,
  onFrame,
}: OrbitViewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onSelectRef = useRef(onSelect);
  const onFrameRef = useRef(onFrame);
  onSelectRef.current = onSelect;
  onFrameRef.current = onFrame;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    let live = true;
    let visible = true;
    let hudTick = 0;
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
    io?.observe(canvas);

    const nearest = (mx: number, my: number, w: number, h: number) => {
      const s = runtimeRef.current;
      const cx = w * 0.5;
      const cy = h * 0.54;
      const scale = Math.min(w, h) * 0.195;
      let bestId: string | null = null;
      let bestD = Infinity;
      const consider = (id: string, path: Body[]) => {
        for (let i = 0; i < path.length; i += 8) {
          const p = project(path[i].x, path[i].y, path[i].z, cx, cy, scale);
          const d = (p.sx - mx) ** 2 + (p.sy - my) ** 2;
          if (d < bestD) {
            bestD = d;
            bestId = id;
          }
        }
      };
      consider("b0", s.parent);
      for (const f of s.forks) consider(f.id, f.path);
      if (bestId && bestD < 140) onSelectRef.current(bestId === "b0" ? null : bestId);
    };

    const draw = () => {
      if (!live) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (
        canvas.width !== Math.floor(w * dpr) ||
        canvas.height !== Math.floor(h * dpr)
      ) {
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, w, h);

      const s = runtimeRef.current;
      simulate(s, visible);

      const cx = w * 0.5;
      const cy = h * 0.54;
      const scale = Math.min(w, h) * 0.195;
      const i = Math.max(0, Math.min(STEPS, Math.floor(s.t)));

      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      ctx.lineWidth = 1;
      for (const R of [1, 2, 3]) {
        ctx.beginPath();
        for (let a = 0; a <= 64; a++) {
          const t = (a / 64) * Math.PI * 2;
          const p = project(
            Math.cos(t) * R,
            Math.sin(t) * R * 0.22,
            Math.sin(t) * R * 0.4,
            cx,
            cy,
            scale,
          );
          if (a === 0) ctx.moveTo(p.sx, p.sy);
          else ctx.lineTo(p.sx, p.sy);
        }
        ctx.stroke();
      }

      const g = project(0, 0, 0, cx, cy, scale);
      ctx.fillStyle = "#050505";
      ctx.beginPath();
      ctx.arc(g.sx, g.sy, scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(220,220,220,0.35)";
      ctx.stroke();

      drawPath(ctx, s.parent, cx, cy, scale, "rgba(244,244,244,0.7)", 1.2, false);
      for (const f of s.forks) {
        const selected = s.selected === f.id;
        drawPath(
          ctx,
          f.path,
          cx,
          cy,
          scale,
          selected ? "rgba(255,255,255,0.9)" : "rgba(176,176,176,0.4)",
          selected ? 1.4 : 1,
          !selected,
        );
        const fb = f.path[i] ?? f.path[0];
        const fp = project(fb.x, fb.y, fb.z, cx, cy, scale);
        ctx.fillStyle = selected ? "#fff" : "rgba(200,200,200,0.85)";
        ctx.beginPath();
        ctx.arc(fp.sx, fp.sy, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      const body = at(s.parent, s.t);
      const p = project(body.x, body.y, body.z, cx, cy, scale);
      ctx.fillStyle = "#f6f6f6";
      ctx.beginPath();
      ctx.arc(p.sx, p.sy, 3.6, 0, Math.PI * 2);
      ctx.fill();

      hudTick += 1;
      if (hudTick % 5 === 0) onFrameRef.current();
      raf = requestAnimationFrame(draw);
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
      const rect = canvas.getBoundingClientRect();
      nearest(
        e.clientX - rect.left,
        e.clientY - rect.top,
        canvas.clientWidth,
        canvas.clientHeight,
      );
    };
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointerup", onUp);

    raf = requestAnimationFrame(draw);
    return () => {
      live = false;
      cancelAnimationFrame(raf);
      io?.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointerup", onUp);
    };
  }, [runtimeRef]);

  return (
    <canvas
      ref={canvasRef}
      className="viva-sim-canvas"
      aria-label="two-body orbit an agent can inspect, kick, and fork"
    />
  );
}
