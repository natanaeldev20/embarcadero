"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface AutoRefreshProps {
  interval?: number; // tiempo en ms
  children?: React.ReactNode;
  enabled?: boolean; // para activar/desactivar
}

export function AutoRefresh({
  interval = 5000,
  children,
  enabled = true,
}: AutoRefreshProps) {
  const router = useRouter();

  useEffect(() => {
    if (!enabled) return;

    const id = setInterval(() => {
      if (document.visibilityState === "visible") {
        router.refresh();
      }
    }, interval);

    return () => clearInterval(id);
  }, [interval, enabled, router]);

  return <>{children}</>;
}
