"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    umami?: { track: (event: string, data?: Record<string, string>) => void };
  }
}

export function TrackSection({ id }: { id: string }) {
  const tracked = useRef(false);

  useEffect(() => {
    const el = document.getElementById(id);
    if (!el) {
      if (process.env.NODE_ENV === "development") {
        console.warn(`TrackSection: no element found with id="${id}"`);
      }
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !tracked.current) {
          tracked.current = true;
          window.umami?.track(`section-viewed-${id}`);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [id]);

  return null;
}
