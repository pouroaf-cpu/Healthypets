// @ts-nocheck
"use client";

import { useEffect } from "react";

// Progressive-enhancement motion controller for the homepage pets. Renders nothing; on mount
// it wires two behaviours onto the server-rendered pet markup (classes defined in the page's
// <style> block). Everything degrades to a fully-visible, statically-styled page:
//   1. Pop-in on scroll — adds `.hp-in` to `.hp-reveal` pets when they enter the viewport
//      (once). The pop keyframe only runs while `.hp-in` is present, so with JS off / reduced
//      motion the pets simply sit at their normal size.
//   2. Run-on-swipe — while a carousel (`.hp-terr-grid` / `.hp-guide-grid`) is being scrolled,
//      adds `.hp-walking` + a `--dir` sign so the pets break into a run and lean the way you
//      swipe. Removed shortly after scrolling stops.
// Honors prefers-reduced-motion: reduce (bails out entirely).
export function PetMotion() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // 1. Pop-in on scroll
    let io;
    const reveals = document.querySelectorAll(".hp-reveal");
    if ("IntersectionObserver" in window && reveals.length) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("hp-in");
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.25, rootMargin: "0px 0px -8% 0px" }
      );
      reveals.forEach((el, i) => {
        el.style.setProperty("--pd", `${(i % 6) * 55}ms`);
        io.observe(el);
      });
    }

    // 2. Run-on-swipe for the mobile carousels
    const cleanups = [];
    document.querySelectorAll(".hp-terr-grid, .hp-guide-grid").forEach((grid) => {
      let last = grid.scrollLeft;
      let timer;
      const onScroll = () => {
        const delta = grid.scrollLeft - last;
        last = grid.scrollLeft;
        if (Math.abs(delta) < 1) return;
        grid.style.setProperty("--dir", delta > 0 ? "1" : "-1");
        grid.classList.add("hp-walking");
        clearTimeout(timer);
        timer = setTimeout(() => grid.classList.remove("hp-walking"), 240);
      };
      grid.addEventListener("scroll", onScroll, { passive: true });
      cleanups.push(() => {
        grid.removeEventListener("scroll", onScroll);
        clearTimeout(timer);
      });
    });

    return () => {
      if (io) io.disconnect();
      cleanups.forEach((c) => c());
    };
  }, []);

  return null;
}
