"use client";

import { useEffect, useState } from "react";
import { FallbackView } from "./FallbackView";
import type { OrbitViewProps } from "./types";
import { WebGLCanvas } from "./WebGLCanvas";

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export function OrbitView(props: OrbitViewProps) {
  const [ok, setOk] = useState<boolean | null>(null);
  useEffect(() => {
    setOk(hasWebGL());
  }, []);
  if (ok === false) return <FallbackView {...props} />;
  if (ok === null) return <div className="viva-sim-gl" aria-hidden />;
  return <WebGLCanvas {...props} />;
}
