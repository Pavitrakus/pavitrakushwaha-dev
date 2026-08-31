import type { Runtime } from "@/lib/vivacity/runtime";

export type OrbitViewProps = {
  runtimeRef: { current: Runtime };
  gen: number;
  autoRotate: boolean;
  onSelect: (id: string | null) => void;
  onInteract: () => void;
  onFrame: () => void;
};
