"use client";

import { useEffect } from "react";
import { useSidebar } from "@iroy/ui/components/sidebar";

export default function ClientSidebarHydrator() {
  const { setOpen } = useSidebar();

  useEffect(() => {
    try {
      const raw = document.cookie
        .split("; ")
        .find(c => c.startsWith("sidebar_state="));
      if (!raw) return;
      const val = raw.split("=")[1];
      setOpen(val === "true");
    } catch (e) {
      // ignore
    }
  }, [setOpen]);

  return null;
}
