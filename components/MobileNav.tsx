"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV } from "@/lib/navigation";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  return (
    <div className="lg:hidden">
      <button
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="p-2 text-ink"
      >
        <Menu size={26} />
      </button>
      {open && (
        <div className="fixed inset-0 z-50 bg-white" role="dialog" aria-modal="true">
          <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4">
            <span className="font-heading text-lg font-bold">Menu</span>
            <button aria-label="Close menu" onClick={() => setOpen(false)} className="p-2">
              <X size={26} />
            </button>
          </div>
          <nav className="flex flex-col gap-1 p-4">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-lg font-medium text-ink hover:bg-surface"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
