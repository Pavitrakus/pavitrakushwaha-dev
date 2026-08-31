import {
  type Body,
  applyScale,
  at,
  checks,
  elements,
  integrate,
  integrateLearned,
  residual,
  seed,
} from "./orbit";

export type BranchKind = "exact" | "learned";

export type Branch = {
  id: string;
  label: string;
  scale: number;
  kind: BranchKind;
  path: Body[];
  verified: boolean | null;
};

export type Snapshot = {
  origin: Body;
  impulse: number;
  parent: Body[];
};

export type Runtime = {
  origin: Body;
  impulse: number;
  parent: Body[];
  forks: Branch[];
  selected: string | null;
  snapshot: Snapshot | null;
  t: number;
  playing: boolean;
  speed: number;
  flash: number;
  ok: boolean;
  log: string[];
};

export function createRuntime(playing: boolean): Runtime {
  const origin = seed();
  return {
    origin,
    impulse: 1,
    parent: integrate(origin),
    forks: [],
    selected: null,
    snapshot: null,
    t: 0,
    playing,
    speed: 1,
    flash: 0,
    ok: true,
    log: [],
  };
}

function pushLog(s: Runtime, line: string) {
  s.log = [line, ...s.log].slice(0, 7);
}

export function rebuild(s: Runtime, impulse: number, origin = s.origin) {
  s.origin = origin;
  s.impulse = impulse;
  s.parent = integrate(applyScale(origin, impulse));
  s.forks = [];
  s.selected = null;
  s.t = 0;
}

export function act(s: Runtime, factor = 1.1) {
  const next = Math.min(1.5, s.impulse * factor);
  rebuild(s, next);
  s.playing = true;
  pushLog(s, `act(+10%)  |v| scale ${next.toFixed(2)}`);
}

export function fork(s: Runtime) {
  if (s.forks.length > 0) {
    pushLog(s, "fork()  branches already open");
    return;
  }
  const start = applyScale(s.origin, s.impulse);
  const up = Math.min(1.5, Math.max(0.5, s.impulse * 1.12));
  const down = Math.min(1.5, Math.max(0.5, s.impulse * 0.88));
  s.forks = [
    {
      id: "b1",
      label: "+12% impulse",
      scale: up,
      kind: "exact",
      path: integrate(applyScale(s.origin, up)),
      verified: null,
    },
    {
      id: "b2",
      label: "-12% impulse",
      scale: down,
      kind: "exact",
      path: integrate(applyScale(s.origin, down)),
      verified: null,
    },
    {
      id: "b3",
      label: "learned backend",
      scale: s.impulse,
      kind: "learned",
      path: integrateLearned(start, 11),
      verified: null,
    },
  ];
  s.selected = "b1";
  pushLog(s, "fork(3)  b1 exact  b2 exact  b3 learned");
}

export function select(s: Runtime, id: string | null) {
  if (id === "b0" || id === null) {
    s.selected = null;
    return;
  }
  if (s.forks.some((f) => f.id === id)) s.selected = id;
}

function branchById(s: Runtime, id: string | null) {
  if (!id) return null;
  return s.forks.find((f) => f.id === id) ?? null;
}

export function verify(s: Runtime) {
  const target = branchById(s, s.selected);
  const path = target?.path ?? s.parent;
  const report = checks(path);
  s.ok = report.pass;
  s.flash = 1;
  if (target) target.verified = report.pass;
  else {
    for (const f of s.forks) f.verified = checks(f.path).pass;
  }
  const who = target ? target.id : "b0";
  const kind = target?.kind ?? "exact";
  pushLog(
    s,
    report.pass
      ? `verify(${who})  pass  ${kind}  ΔE=${report.drift.toExponential(2)}  peri=${report.peri.toFixed(3)}R`
      : `verify(${who})  fail  ${kind}  ΔE=${report.drift.toExponential(2)}  peri=${report.peri.toFixed(3)}R`,
  );
}

export function commit(s: Runtime) {
  const target = branchById(s, s.selected);
  if (!target) {
    pushLog(s, "commit()  no branch selected");
    return;
  }
  if (target.verified === null) {
    const report = checks(target.path);
    target.verified = report.pass;
    if (!report.pass) {
      s.ok = false;
      s.flash = 1;
      pushLog(s, `commit(${target.id})  blocked  verify fail`);
      return;
    }
  }
  if (target.verified === false) {
    s.ok = false;
    s.flash = 1;
    pushLog(s, `commit(${target.id})  blocked  ${target.kind} failed checks`);
    return;
  }
  s.snapshot = {
    origin: { ...s.origin },
    impulse: s.impulse,
    parent: s.parent,
  };
  s.impulse = target.scale;
  s.parent = target.path;
  s.forks = [];
  s.selected = null;
  s.t = 0;
  s.ok = true;
  pushLog(s, `commit(${target.id})  ${target.kind} is live`);
}

export function rollback(s: Runtime) {
  if (!s.snapshot) {
    pushLog(s, "rollback()  nothing stored");
    return;
  }
  s.origin = s.snapshot.origin;
  s.impulse = s.snapshot.impulse;
  s.parent = s.snapshot.parent;
  s.forks = [];
  s.selected = null;
  s.t = 0;
  pushLog(s, "rollback()  parent restored");
}

export function reset(s: Runtime, playing: boolean) {
  rebuild(s, 1, seed());
  s.snapshot = null;
  s.playing = playing;
  s.speed = 1;
  s.ok = true;
  s.flash = 0;
  pushLog(s, "reset()  circular parent");
}

export function simulate(s: Runtime, visible: boolean) {
  if (s.playing && visible) {
    s.t += s.speed;
    if (s.t > s.parent.length - 1) s.t = 0;
  }
  if (s.flash > 0) s.flash *= 0.88;
}

export function hud(s: Runtime) {
  const b = at(s.parent, s.t);
  const el = elements(b);
  const selected = branchById(s, s.selected);
  return {
    r: el.r,
    v: el.v,
    E: el.E,
    e: el.e,
    peri: el.peri,
    residual: residual(s.parent),
    forks: s.forks.length,
    x: b.x,
    y: b.y,
    z: b.z,
    vx: b.vx,
    vy: b.vy,
    vz: b.vz,
    selected: s.selected,
    selectedKind: selected?.kind ?? "exact",
  };
}
