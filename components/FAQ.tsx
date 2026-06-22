"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

export type QA = { q: string; a: string };

// Accessible FAQ accordion. (FAQ JSON-LD is emitted separately by <Schema>.)
export function FAQ({ items }: { items: QA[] }) {
  if (!items?.length) return null;
  return (
    <section className="my-8">
      <h2 className="mb-3 font-heading text-2xl font-bold">Frequently asked questions</h2>
      <Accordion.Root type="single" collapsible className="divide-y divide-gray-200 rounded-xl border border-gray-200">
        {items.map((item, i) => (
          <Accordion.Item key={i} value={`q${i}`}>
            <Accordion.Header>
              <Accordion.Trigger className="group flex w-full items-center justify-between px-4 py-4 text-left font-medium text-ink">
                {item.q}
                <ChevronDown className="transition-transform group-data-[state=open]:rotate-180" size={18} />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="px-4 pb-4 text-sm text-ink/80">{item.a}</Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </section>
  );
}
