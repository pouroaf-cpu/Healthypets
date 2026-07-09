// @ts-nocheck
"use client";

import { useEffect, useRef } from "react";

// Renders a walking-pet Lottie animation from /public/lottie/*.json. lottie-web is loaded via
// dynamic import so it's code-split out of the initial JS bundle (only fetched on the homepage,
// where this is used). Decorative → aria-hidden.
export function WalkingPet({ src, size = 130, loop = true, className = "", style = {} }) {
  const ref = useRef(null);
  useEffect(() => {
    let anim;
    let io;
    let cancelled = false;
    import("lottie-web").then((mod) => {
      const lottie = mod.default || mod;
      if (cancelled || !ref.current) return;
      anim = lottie.loadAnimation({ container: ref.current, renderer: "svg", loop, autoplay: true, path: src });
      // Pause when scrolled out of view, so we never run more animations than are on screen.
      if ("IntersectionObserver" in window) {
        io = new IntersectionObserver(
          ([e]) => { if (anim) (e.isIntersecting ? anim.play() : anim.pause()); },
          { rootMargin: "80px" }
        );
        io.observe(ref.current);
      }
    });
    return () => {
      cancelled = true;
      if (io) io.disconnect();
      if (anim) anim.destroy();
    };
  }, [src, loop]);
  return <div ref={ref} aria-hidden="true" className={className} style={{ width: size, height: size, ...style }} />;
}
