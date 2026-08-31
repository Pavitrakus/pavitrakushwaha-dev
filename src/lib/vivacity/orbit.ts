export type Body = {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
};

export type Elements = {
  r: number;
  v: number;
  E: number;
  e: number;
  peri: number;
};

export const MU = 1;
export const DT = 0.0125;
export const R0 = 1.8;
export const HORIZON = 20;
export const STEPS = Math.round(HORIZON / DT);
export const SURFACE = 1;
export const INC = 0.42;

export function circularV(r: number) {
  return Math.sqrt(MU / Math.max(r, 0.2));
}

export function seed(): Body {
  const v = circularV(R0);
  return {
    x: R0,
    y: 0,
    z: 0,
    vx: 0,
    vy: v * Math.cos(INC),
    vz: v * Math.sin(INC),
  };
}

export function hypot3(x: number, y: number, z: number) {
  return Math.hypot(x, y, z);
}

function accel(b: Body, mu = MU) {
  const r = hypot3(b.x, b.y, b.z) || 0.2;
  const k = -mu / (r * r * r);
  return { ax: k * b.x, ay: k * b.y, az: k * b.z };
}

function step(b: Body, dt: number, mu = MU): Body {
  const a0 = accel(b, mu);
  const x = b.x + b.vx * dt + 0.5 * a0.ax * dt * dt;
  const y = b.y + b.vy * dt + 0.5 * a0.ay * dt * dt;
  const z = b.z + b.vz * dt + 0.5 * a0.az * dt * dt;
  const n = { x, y, z, vx: b.vx, vy: b.vy, vz: b.vz };
  const a1 = accel(n, mu);
  return {
    x,
    y,
    z,
    vx: b.vx + 0.5 * (a0.ax + a1.ax) * dt,
    vy: b.vy + 0.5 * (a0.ay + a1.ay) * dt,
    vz: b.vz + 0.5 * (a0.az + a1.az) * dt,
  };
}

export function applyScale(b: Body, scale: number): Body {
  return {
    ...b,
    vx: b.vx * scale,
    vy: b.vy * scale,
    vz: b.vz * scale,
  };
}

function integrateWith(
  start: Body,
  next: (b: Body, i: number) => Body,
): Body[] {
  const out: Body[] = new Array(STEPS + 1);
  out[0] = start;
  let b = start;
  let hit = false;
  for (let i = 0; i < STEPS; i++) {
    if (hit) {
      out[i + 1] = b;
      continue;
    }
    const n = next(b, i);
    if (hypot3(n.x, n.y, n.z) <= SURFACE) {
      hit = true;
      out[i + 1] = b;
      continue;
    }
    b = n;
    out[i + 1] = b;
  }
  return out;
}

export function integrate(start: Body): Body[] {
  return integrateWith(start, (b) => step(b, DT));
}

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function integrateLearned(start: Body, noiseSeed = 7): Body[] {
  const rand = mulberry32(noiseSeed);
  const mu = MU * 0.86;
  return integrateWith(start, (b, i) => {
    let n = step(b, DT, mu);
    if (i % 32 === 0) {
      const j = 0.018 * (rand() - 0.5);
      n = {
        ...n,
        vx: n.vx + j,
        vy: n.vy + 0.018 * (rand() - 0.5),
        vz: n.vz + 0.018 * (rand() - 0.5),
      };
    }
    return n;
  });
}

export function elements(b: Body): Elements {
  const r = hypot3(b.x, b.y, b.z) || 0.2;
  const v2 = b.vx * b.vx + b.vy * b.vy + b.vz * b.vz;
  const E = 0.5 * v2 - MU / r;
  const rv = b.x * b.vx + b.y * b.vy + b.z * b.vz;
  const ex = ((v2 - MU / r) * b.x - rv * b.vx) / MU;
  const ey = ((v2 - MU / r) * b.y - rv * b.vy) / MU;
  const ez = ((v2 - MU / r) * b.z - rv * b.vz) / MU;
  const e = Math.hypot(ex, ey, ez);
  const a = E < -1e-6 ? -MU / (2 * E) : Infinity;
  const peri = Number.isFinite(a)
    ? Math.max(0.15, a * (1 - Math.min(e, 0.98)))
    : r;
  return { r, v: Math.sqrt(v2), E, e, peri };
}

export function residual(path: Body[]) {
  if (path.length === 0) return 0;
  const e0 = elements(path[0]).E;
  let max = 0;
  for (let i = 0; i < path.length; i += 4) {
    const d = Math.abs(elements(path[i]).E - e0);
    if (d > max) max = d;
  }
  const last = path[path.length - 1];
  max = Math.max(max, Math.abs(elements(last).E - e0));
  return max;
}

export function at(path: Body[], t: number): Body {
  const i = Math.max(0, Math.min(path.length - 1, Math.floor(t)));
  return path[i] ?? path[0];
}

export function checks(path: Body[]) {
  const i = Math.min(path.length - 1, Math.floor(path.length / 2));
  const el = elements(path[i] ?? path[0]);
  const drift = residual(path);
  const pass = el.E < 0 && el.peri > SURFACE && drift < 0.001;
  return { pass, drift, peri: el.peri, E: el.E };
}

export function fmt(n: number, d = 3) {
  return n.toFixed(d);
}

export function fmtSci(n: number) {
  if (n === 0) return "0.00e+0";
  return n.toExponential(2).replace("e+", "e+").replace("e-0", "e-");
}
