"use client";

import { useRouter } from "next/navigation";

export function NotesLockButton() {
  const router = useRouter();

  const lock = async () => {
    await fetch("/api/notes/logout", { method: "POST" });
    router.refresh();
  };

  return (
    <button type="button" className="admin-text-btn" onClick={lock}>
      lock
    </button>
  );
}
