"use client";

import {
  DT,
  fmt,
  fmtSci,
  HORIZON,
  STEPS,
} from "@/lib/vivacity/orbit";
import {
  act,
  commit,
  createRuntime,
  fork,
  hud,
  reset,
  rollback,
  select,
  verify,
  type Branch,
  type Runtime,
} from "@/lib/vivacity/runtime";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useId, useRef, useState } from "react";

const OrbitView = dynamic(
  () => import("./vivacity/OrbitView").then((m) => m.OrbitView),
  { ssr: false },
);

type Mode = "compact" | "full";

function branchMeta(s: Runtime) {
  return s.forks.map((f) => ({
    id: f.id,
    label: f.label,
    kind: f.kind,
    verified: f.verified,
  }));
}

export function VivacitySim({ mode = "compact" }: { mode?: Mode }) {
  const uid = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const engine = useRef<Runtime>(createRuntime(mode === "compact"));
  const [playing, setPlaying] = useState(mode === "compact");
  const [speed, setSpeed] = useState(1);
  const [t, setT] = useState(0);
  const [log, setLog] = useState<string[]>([]);
  const [gen, setGen] = useState(0);
  const [touched, setTouched] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [branches, setBranches] = useState<
    { id: string; label: string; kind: Branch["kind"]; verified: boolean | null }[]
  >([]);
  const [flash, setFlash] = useState({ on: false, ok: true });
  const [metrics, setMetrics] = useState(() => hud(engine.current));

  const bump = (nudge?: number) => setGen((g) => g + (nudge ?? 1));

  const sync = useCallback(() => {
    const s = engine.current;
    setMetrics(hud(s));
    setT(s.t);
    setPlaying(s.playing);
    setLog(s.log);
    setSelected(s.selected);
    setBranches(branchMeta(s));
    setFlash({ on: s.flash > 0.08, ok: s.ok });
  }, []);

  const kick = () => {
    act(engine.current);
    setPlaying(true);
    bump();
    sync();
  };

  const doFork = () => {
    fork(engine.current);
    bump();
    sync();
  };

  const doVerify = () => {
    verify(engine.current);
    bump();
    sync();
  };

  const doCommit = () => {
    commit(engine.current);
    bump();
    sync();
  };

  const doRollback = () => {
    rollback(engine.current);
    bump();
    sync();
  };

  const doReset = () => {
    reset(engine.current, mode === "compact");
    setSpeed(1);
    setPlaying(mode === "compact");
    bump();
    sync();
  };

  const togglePlay = () => {
    const next = !engine.current.playing;
    engine.current.playing = next;
    setPlaying(next);
  };

  const onSelect = useCallback(
    (id: string | null) => {
      select(engine.current, id);
      bump();
      sync();
    },
    [sync],
  );

  const onScrub = (value: number) => {
    engine.current.t = value;
    engine.current.playing = false;
    setPlaying(false);
    sync();
  };

  const keyRef = useRef({
    togglePlay: () => {},
    kick: () => {},
    fork: () => {},
    verify: () => {},
    commit: () => {},
    rollback: () => {},
  });
  keyRef.current = {
    togglePlay,
    kick,
    fork: doFork,
    verify: doVerify,
    commit: doCommit,
    rollback: doRollback,
  };

  useEffect(() => {
    if (mode !== "full") return;
    const el = rootRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      const k = keyRef.current;
      if (e.key === " " || e.code === "Space") {
        e.preventDefault();
        k.togglePlay();
        return;
      }
      if (e.key === "k") k.kick();
      if (e.key === "f") k.fork();
      if (e.key === "v") k.verify();
      if (e.key === "c") k.commit();
      if (e.key === "r") k.rollback();
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [mode]);

  const tau = (t / STEPS) * HORIZON;

  return (
    <div
      ref={rootRef}
      className={`viva-sim ${mode === "full" ? "viva-sim-full" : "viva-sim-compact"}`}
      tabIndex={mode === "full" ? 0 : undefined}
    >
      <div className="viva-sim-head">
        <span className="mono viva-sim-kicker">example / two-body</span>
        <span className="mono viva-sim-exp">001</span>
      </div>
      <div className="viva-sim-subhead">
        <span className="mono">orbital dynamics</span>
        <span className="mono viva-sim-hint">drag to look · scroll to dolly</span>
      </div>
      <div className="viva-sim-canvas-wrap">
        <OrbitView
          runtimeRef={engine}
          gen={gen}
          autoRotate={mode === "compact" && !touched}
          onSelect={onSelect}
          onInteract={() => setTouched(true)}
          onFrame={sync}
        />
        <div
          className={`viva-sim-flash${flash.on ? " is-on" : ""}${flash.ok ? "" : " is-fail"}`}
          aria-hidden
        />
      </div>
      {mode === "full" && (
        <div className="viva-sim-transport">
          <button
            type="button"
            className={`viva-verb viva-verb-play${playing ? " is-on" : ""}`}
            onClick={togglePlay}
            aria-pressed={playing}
          >
            {playing ? "Pause" : "Play"}
          </button>
          <label>
            <span>
              Trajectory time {tau.toFixed(3)} / {HORIZON.toFixed(3)} τ
            </span>
            <input
              type="range"
              min={0}
              max={STEPS}
              step={1}
              value={Math.floor(t)}
              onChange={(e) => onScrub(Number(e.target.value))}
            />
          </label>
          <div className="viva-sim-speeds">
            {[1, 2, 4].map((n) => (
              <button
                key={n}
                type="button"
                className={`viva-verb${speed === n ? " is-on" : ""}`}
                onClick={() => {
                  engine.current.speed = n;
                  setSpeed(n);
                }}
              >
                {n}×
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="viva-sim-metrics">
        <span>
          <em>Specific energy</em>
          <strong>{fmt(metrics.E, 4)}</strong>
        </span>
        <span>
          <em>Eccentricity</em>
          <strong>{fmt(metrics.e, 3)}</strong>
        </span>
        <span>
          <em>Periapsis</em>
          <strong>{fmt(metrics.peri, 3)} R</strong>
        </span>
      </div>
      {mode === "full" && (
        <p className="mono viva-sim-caption">
          x {fmt(metrics.x, 5)} · y {fmt(metrics.y, 5)} · z {fmt(metrics.z, 5)} · |v|{" "}
          {fmt(metrics.v, 5)} · energy residual {fmtSci(metrics.residual)} · Δt {DT} τ
        </p>
      )}
      {mode === "full" && (
        <ul className="viva-sim-branches mono" aria-label="world branches">
          <li>
            <button
              type="button"
              className={`viva-branch${selected === null ? " is-on" : ""}`}
              onClick={() => onSelect(null)}
            >
              <span>b0</span>
              <span>live</span>
              <span>exact</span>
            </button>
          </li>
          {branches.map((b) => (
            <li key={b.id}>
              <button
                type="button"
                className={`viva-branch${selected === b.id ? " is-on" : ""}`}
                onClick={() => onSelect(b.id)}
              >
                <span>{b.id}</span>
                <span>{b.label}</span>
                <span>
                  {b.verified === true
                    ? "pass"
                    : b.verified === false
                      ? "fail"
                      : b.kind}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="viva-sim-verbs" role="group" aria-label="runtime verbs">
        {mode === "compact" && (
          <button
            type="button"
            className={`viva-verb viva-verb-play${playing ? " is-on" : ""}`}
            onClick={togglePlay}
            aria-pressed={playing}
          >
            {playing ? "pause" : "play"}
          </button>
        )}
        <button type="button" className="viva-verb" onClick={kick}>
          {mode === "compact" ? "kick" : "act(+10%)"}
        </button>
        <button type="button" className="viva-verb viva-verb-primary" onClick={doFork}>
          {mode === "compact" ? "fork" : "Fork trajectories"}
        </button>
        {mode === "full" && (
          <>
            <button type="button" className="viva-verb" onClick={doVerify}>
              Verify
            </button>
            <button type="button" className="viva-verb" onClick={doCommit}>
              Commit
            </button>
            <button type="button" className="viva-verb" onClick={doRollback}>
              Rollback
            </button>
            <button type="button" className="viva-verb" onClick={doReset}>
              Reset
            </button>
          </>
        )}
      </div>
      <p className="viva-sim-note">
        interactive two-body model in your browser, to just explain what
        vivacity is. not a product api.
      </p>
      {mode === "full" && (
        <ol className="viva-sim-log mono" aria-live="polite">
          {log.length === 0 ? (
            <li>world live. an agent would call these verbs. you can too.</li>
          ) : (
            log.map((line, n) => <li key={`${uid}-${n}`}>{line}</li>)
          )}
        </ol>
      )}
    </div>
  );
}
