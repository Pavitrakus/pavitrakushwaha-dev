"use client";

import { useEffect, useId, useRef, useState } from "react";

type Mode = "compact" | "full";

type Body = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

type ForkGhost = Body & { hue: number };

const MU = 1;
const DT = 0.0125;
const R0 = 1.8;

function circularV(r: number) {
  return Math.sqrt(MU / Math.max(r, 0.2));
}

function seed(): Body {
  return { x: R0, y: 0, vx: 0, vy: circularV(R0) };
}

function accel(b: Body) {
  const r = Math.hypot(b.x, b.y) || 0.2;
  const k = -MU / (r * r * r);
  return { ax: k * b.x, ay: k * b.y };
}

function step(b: Body, dt: number): Body {
  const a0 = accel(b);
  const x = b.x + b.vx * dt + 0.5 * a0.ax * dt * dt;
  const y = b.y + b.vy * dt + 0.5 * a0.ay * dt * dt;
  const n = { x, y, vx: b.vx, vy: b.vy };
  const a1 = accel(n);
  return {
    x,
    y,
    vx: b.vx + 0.5 * (a0.ax + a1.ax) * dt,
    vy: b.vy + 0.5 * (a0.ay + a1.ay) * dt,
  };
}

function elements(b: Body) {
  const r = Math.hypot(b.x, b.y) || 0.2;
  const v2 = b.vx * b.vx + b.vy * b.vy;
  const E = 0.5 * v2 - MU / r;
  const h = b.x * b.vy - b.y * b.vx;
  const rv = b.x * b.vx + b.y * b.vy;
  const ex = ((v2 - MU / r) * b.x - rv * b.vx) / MU;
  const ey = ((v2 - MU / r) * b.y - rv * b.vy) / MU;
  const e = Math.hypot(ex, ey);
  const a = E < -1e-6 ? -MU / (2 * E) : Infinity;
  const peri = Number.isFinite(a) ? Math.max(0.15, a * (1 - Math.min(e, 0.98))) : r;
  return { r, v: Math.sqrt(v2), E, e, a, peri, h, ex, ey };
}

export function VivacitySim({ mode = "compact" }: { mode?: Mode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const state = useRef({
    body: seed(),
    forks: [] as ForkGhost[],
    last: null as Body | null,
    lastE: elements(seed()).E,
    log: [] as string[],
    flash: 0,
    ok: true,
    playing: false,
    trail: [] as { x: number; y: number }[],
  });
  const [playing, setPlaying] = useState(false);
  const [hud, setHud] = useState(() => {
    const el = elements(seed());
    return {
      verb: "observe()",
      forks: 0,
      e: el.e,
      E: el.E,
      r: el.r,
      v: el.v,
      peri: el.peri,
      note: "exact-physics backend",
    };
  });
  const [log, setLog] = useState<string[]>([]);
  const uid = useId();

  const syncHud = (
    verb: string,
    note: string,
    extra?: Partial<typeof hud>,
  ) => {
    const el = elements(state.current.body);
    setHud({
      verb,
      forks: state.current.forks.length,
      e: el.e,
      E: el.E,
      r: el.r,
      v: el.v,
      peri: el.peri,
      note,
      ...extra,
    });
  };

  const pushLog = (line: string) => {
    const s = state.current;
    s.log = [line, ...s.log].slice(0, 6);
    setLog(s.log);
  };

  const observe = () => {
    const s = state.current;
    s.last = { ...s.body };
    s.lastE = elements(s.body).E;
    const el = elements(s.body);
    pushLog(`observe()  r=${el.r.toFixed(3)}  |v|=${el.v.toFixed(4)}`);
    syncHud("observe()", "state read. pixels are optional.");
  };

  const act = () => {
    const s = state.current;
    const r = Math.hypot(s.body.x, s.body.y) || 0.2;
    const tx = -s.body.y / r;
    const ty = s.body.x / r;
    s.body.vx += 0.11 * tx;
    s.body.vy += 0.11 * ty;
    s.trail = [];
    pushLog(`act(+Δv)  |v| → ${elements(s.body).v.toFixed(4)}`);
    syncHud("act(+Δv)", "next state computed, not guessed.");
  };

  const fork = () => {
    const s = state.current;
    if (s.forks.length >= 5) {
      pushLog("fork()  max 5 branches");
      return;
    }
    const scale = 0.78 + Math.random() * 0.42;
    s.forks.push({
      ...s.body,
      vx: s.body.vx * scale,
      vy: s.body.vy * scale,
      hue: 42 + s.forks.length * 26,
    });
    pushLog(`fork(${s.forks.length})  addressable branch`);
    syncHud(`fork(${s.forks.length})`, "parent world stays. ghosts are futures.");
  };

  const verify = () => {
    const s = state.current;
    const now = elements(s.body).E;
    const base = s.last ? s.lastE : now;
    const drift = Math.abs(now - base);
    const ok = drift < 0.12;
    s.ok = ok;
    s.flash = 1;
    pushLog(
      ok
        ? `verify()  pass  ΔE=${drift.toFixed(3)}`
        : `verify()  fail  ΔE=${drift.toFixed(3)}  rollback?`,
    );
    syncHud(
      "verify()",
      ok ? "conservation holds. commit is legal." : "constraint broke. this branch dies.",
    );
  };

  const rollback = () => {
    const s = state.current;
    if (!s.last) {
      pushLog("rollback()  nothing stored");
      return;
    }
    s.body = { ...s.last };
    s.forks = [];
    s.trail = [];
    pushLog("rollback()  prior world restored");
    syncHud("rollback()", "memory is a feature of the runtime.");
  };

  const togglePlay = () => {
    const next = !state.current.playing;
    state.current.playing = next;
    setPlaying(next);
    if (next) syncHud(hud.verb, "velocity verlet. μ = 1.");
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    let live = true;
    let visible = true;
    let hudTick = 0;

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

    const drawPlanet = (cx: number, cy: number, rad: number) => {
      const g = ctx.createRadialGradient(
        cx - rad * 0.35,
        cy - rad * 0.4,
        rad * 0.1,
        cx,
        cy,
        rad,
      );
      g.addColorStop(0, "#3a3834");
      g.addColorStop(0.55, "#1a1916");
      g.addColorStop(1, "#070706");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, rad, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "rgba(201,166,107,0.22)";
      ctx.lineWidth = 1;
      for (let i = -2; i <= 2; i++) {
        const ry = rad * Math.cos((i * Math.PI) / 6) * 0.42;
        ctx.beginPath();
        ctx.ellipse(cx, cy + i * rad * 0.18, rad * 0.96, Math.abs(ry) + 0.8, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.ellipse(cx, cy, rad * 0.28, rad * 0.96, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx, cy, rad, 0, Math.PI * 2);
      ctx.stroke();
    };

    const draw = () => {
      if (!live) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, w, h);

      const s = state.current;
      if (s.playing && visible) {
        s.body = step(s.body, DT);
        s.forks = s.forks.map((f) => ({ ...step(f, DT), hue: f.hue }));
        s.trail.push({ x: s.body.x, y: s.body.y });
        if (s.trail.length > 220) s.trail.shift();
        hudTick += 1;
        if (hudTick % 8 === 0) {
          const el = elements(s.body);
          setHud((prev) => ({
            ...prev,
            e: el.e,
            E: el.E,
            r: el.r,
            v: el.v,
            peri: el.peri,
            forks: s.forks.length,
          }));
        }
      }
      if (s.flash > 0) s.flash *= 0.9;

      const cx = w * 0.5;
      const cy = h * 0.54;
      const scale = Math.min(w, h) * 0.22;
      const toX = (x: number) => cx + x * scale;
      const toY = (y: number) => cy + y * scale * 0.72;

      ctx.strokeStyle = "rgba(201,166,107,0.16)";
      ctx.fillStyle = "rgba(201,166,107,0.45)";
      ctx.font = "10px 'JetBrains Mono', monospace";
      ctx.lineWidth = 1;
      for (const R of [1, 2, 3]) {
        ctx.beginPath();
        ctx.ellipse(cx, cy, R * scale, R * scale * 0.72, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillText(`${R}R`, cx + R * scale + 4, cy - 4);
      }

      if (s.trail.length > 1) {
        ctx.strokeStyle = "rgba(236,234,230,0.35)";
        ctx.beginPath();
        ctx.moveTo(toX(s.trail[0].x), toY(s.trail[0].y));
        for (let i = 1; i < s.trail.length; i++) {
          ctx.lineTo(toX(s.trail[i].x), toY(s.trail[i].y));
        }
        ctx.stroke();
      }

      drawPlanet(cx, cy, Math.min(w, h) * 0.07);

      for (const f of s.forks) {
        ctx.fillStyle = `hsla(${f.hue}, 70%, 62%, 0.85)`;
        ctx.beginPath();
        ctx.arc(toX(f.x), toY(f.y), 3, 0, Math.PI * 2);
        ctx.fill();
      }

      const px = toX(s.body.x);
      const py = toY(s.body.y);
      ctx.fillStyle = "#eceae6";
      ctx.beginPath();
      ctx.arc(px, py, 3.6, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "#c9a66b";
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(px + s.body.vx * scale * 0.55, py + s.body.vy * scale * 0.4);
      ctx.stroke();

      ctx.fillStyle = "rgba(201,166,107,0.85)";
      ctx.font = "10px 'JetBrains Mono', monospace";
      const liveEl = elements(s.body);
      ctx.fillText("μ = 1 / R = 1", 10, 16);
      ctx.fillText(`r ${liveEl.r.toFixed(3)} R`, 10, h - 12);
      ctx.fillStyle = "rgba(236,234,230,0.55)";
      ctx.fillText("velocity verlet", w - 108, 16);
      ctx.fillText(`Δt ${DT} τ`, w - 88, h - 12);

      if (s.flash > 0.05) {
        ctx.strokeStyle = s.ok
          ? `rgba(217,255,87,${s.flash})`
          : `rgba(255,90,70,${s.flash})`;
        ctx.lineWidth = 2;
        ctx.strokeRect(5, 5, w - 10, h - 10);
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      live = false;
      cancelAnimationFrame(raf);
      io?.disconnect();
    };
  }, []);

  const verbs = [
    { id: "obs", label: "observe()", run: observe },
    { id: "act", label: "act(+Δv)", run: act },
    { id: "fork", label: "fork()", run: fork },
    { id: "verify", label: "verify()", run: verify },
    ...(mode === "full" ? [{ id: "rb", label: "rollback()", run: rollback }] : []),
  ];

  return (
    <div className={`viva-sim ${mode === "full" ? "viva-sim-full" : ""}`}>
      <div className="viva-sim-head">
        <span className="mono viva-sim-mark">vivacity runtime</span>
        <span className="mono muted">{hud.note}</span>
      </div>
      <canvas
        ref={canvasRef}
        className="viva-sim-canvas"
        aria-label="two-body orbit you can play, kick, fork, and verify"
      />
      <div className="viva-sim-verbs" role="group" aria-label="runtime verbs">
        <button
          type="button"
          className={`viva-verb viva-verb-play${playing ? " is-on" : ""}`}
          onClick={togglePlay}
          aria-pressed={playing}
        >
          {playing ? "pause" : "play"}
        </button>
        {verbs.map((v) => (
          <button key={v.id} type="button" className="viva-verb" onClick={v.run}>
            {v.label}
          </button>
        ))}
      </div>
      <p className="mono viva-sim-hud">
        {hud.verb} · E={hud.E.toFixed(3)} · e={hud.e.toFixed(3)} · peri={hud.peri.toFixed(2)} R
      </p>
      <p className="mono viva-sim-metrics">
        <span>specific energy {hud.E.toFixed(4)}</span>
        <span>eccentricity {hud.e.toFixed(3)}</span>
        <span>periapsis {hud.peri.toFixed(3)} R</span>
      </p>
      {mode === "full" && (
        <ol className="viva-sim-log mono" aria-live="polite">
          {log.length === 0 ? (
            <li>world live. play it. this is state, not a clip.</li>
          ) : (
            log.map((line, i) => <li key={`${uid}-${i}`}>{line}</li>)
          )}
        </ol>
      )}
    </div>
  );
}
