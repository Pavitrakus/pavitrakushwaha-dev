"use client";

import { useEffect, useId, useRef, useState } from "react";

type Mode = "compact" | "full";

type Snapshot = {
  r: number;
  th: number;
  w: number;
  e: number;
};

type ForkGhost = {
  id: number;
  w: number;
  th: number;
  hue: number;
};

function energy(r: number, w: number) {
  // unit mass, mu=1, crude vis-viva so verify has a number to chew
  return 0.5 * (r * w) ** 2 - 1 / Math.max(r, 0.2);
}

export function VivacitySim({ mode = "compact" }: { mode?: Mode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const state = useRef({
    r: 0.62,
    th: 0.4,
    w: 0.55,
    forks: [] as ForkGhost[],
    last: null as Snapshot | null,
    log: [] as string[],
    flash: 0,
    ok: true,
  });
  const [hud, setHud] = useState({
    verb: "observe()",
    forks: 0,
    e: energy(0.62, 0.55),
    note: "exact-physics backend",
  });
  const [log, setLog] = useState<string[]>([]);
  const uid = useId();

  const pushLog = (line: string) => {
    const s = state.current;
    s.log = [line, ...s.log].slice(0, 6);
    setLog(s.log);
  };

  const snapshot = (): Snapshot => {
    const s = state.current;
    return { r: s.r, th: s.th, w: s.w, e: energy(s.r, s.w) };
  };

  const observe = () => {
    const snap = snapshot();
    state.current.last = snap;
    pushLog(`observe()  r=${snap.r.toFixed(3)}  ω=${snap.w.toFixed(3)}`);
    setHud({
      verb: "observe()",
      forks: state.current.forks.length,
      e: snap.e,
      note: "state read. pixels are optional.",
    });
  };

  const act = () => {
    const s = state.current;
    s.w = Math.min(1.35, s.w + 0.12);
    pushLog(`act(+Δv)  ω → ${s.w.toFixed(3)}`);
    setHud({
      verb: "act(+Δv)",
      forks: s.forks.length,
      e: energy(s.r, s.w),
      note: "next state computed, not guessed.",
    });
  };

  const fork = () => {
    const s = state.current;
    if (s.forks.length >= 5) {
      pushLog("fork()  max 5 branches");
      return;
    }
    s.forks.push({
      id: Date.now(),
      w: s.w * (0.72 + Math.random() * 0.5),
      th: s.th,
      hue: 48 + s.forks.length * 28,
    });
    pushLog(`fork(${s.forks.length})  addressable branch`);
    setHud({
      verb: `fork(${s.forks.length})`,
      forks: s.forks.length,
      e: energy(s.r, s.w),
      note: "parent world stays. ghosts are futures.",
    });
  };

  const verify = () => {
    const s = state.current;
    const now = energy(s.r, s.w);
    const base = s.last ? s.last.e : now;
    const drift = Math.abs(now - base);
    const ok = drift < 0.35;
    s.ok = ok;
    s.flash = 1;
    pushLog(
      ok
        ? `verify()  pass  ΔE=${drift.toFixed(3)}`
        : `verify()  fail  ΔE=${drift.toFixed(3)}  rollback?`,
    );
    setHud({
      verb: "verify()",
      forks: s.forks.length,
      e: now,
      note: ok
        ? "conservation holds. commit is legal."
        : "constraint broke. this branch dies.",
    });
  };

  const rollback = () => {
    const s = state.current;
    if (!s.last) {
      pushLog("rollback()  nothing stored");
      return;
    }
    s.r = s.last.r;
    s.th = s.last.th;
    s.w = s.last.w;
    s.forks = [];
    pushLog("rollback()  prior world restored");
    setHud({
      verb: "rollback()",
      forks: 0,
      e: energy(s.r, s.w),
      note: "memory is a feature of the runtime.",
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    let live = true;

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

      const s = state.current;
      s.th += s.w * 0.016;
      for (const f of s.forks) f.th += f.w * 0.016;
      if (s.flash > 0) s.flash *= 0.92;

      const cx = w * 0.5;
      const cy = h * 0.52;
      const R = Math.min(w, h) * 0.38;

      ctx.strokeStyle = "rgba(217,255,87,0.18)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, R * s.r * 1.15, 0, Math.PI * 2);
      ctx.stroke();

      for (const f of s.forks) {
        const fx = cx + Math.cos(f.th) * R * s.r;
        const fy = cy + Math.sin(f.th) * R * s.r * 0.72;
        ctx.strokeStyle = `hsla(${f.hue}, 90%, 62%, 0.35)`;
        ctx.beginPath();
        ctx.arc(cx, cy, R * s.r * 1.15, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = `hsla(${f.hue}, 90%, 62%, 0.85)`;
        ctx.beginPath();
        ctx.arc(fx, fy, 3.2, 0, Math.PI * 2);
        ctx.fill();
      }

      const x = cx + Math.cos(s.th) * R * s.r;
      const y = cy + Math.sin(s.th) * R * s.r * 0.72;

      ctx.fillStyle = "#d9ff57";
      ctx.beginPath();
      ctx.arc(cx, cy, 5.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "rgba(236,234,230,0.55)";
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(x, y);
      ctx.stroke();

      ctx.fillStyle = "#eceae6";
      ctx.beginPath();
      ctx.arc(x, y, 4.4, 0, Math.PI * 2);
      ctx.fill();

      if (s.flash > 0.05) {
        ctx.strokeStyle = s.ok
          ? `rgba(217,255,87,${s.flash})`
          : `rgba(255,90,70,${s.flash})`;
        ctx.lineWidth = 2;
        ctx.strokeRect(6, 6, w - 12, h - 12);
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      live = false;
      cancelAnimationFrame(raf);
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
        aria-label="vivacity world: a body on an exact-physics orbit you can fork"
      />
      <div className="viva-sim-verbs" role="group" aria-label="runtime verbs">
        {verbs.map((v) => (
          <button key={v.id} type="button" className="viva-verb" onClick={v.run}>
            {v.label}
          </button>
        ))}
      </div>
      <p className="mono viva-sim-hud">
        {hud.verb} · E={hud.e.toFixed(3)} · forks={hud.forks}
      </p>
      {mode === "full" && (
        <ol className="viva-sim-log mono" aria-live="polite">
          {log.length === 0 ? (
            <li>world live. drag nothing. this is state, not a clip.</li>
          ) : (
            log.map((line, i) => <li key={`${uid}-${i}`}>{line}</li>)
          )}
        </ol>
      )}
    </div>
  );
}
