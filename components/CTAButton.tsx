import { cn } from "@/lib/utils";

// Coral affiliate CTA. Routes through /go/<linkKey> (cloaked + click-logged).
export function CTAButton({
  linkKey,
  children = "Check price at Pet Direct →",
  className,
}: {
  linkKey: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={`/go/${linkKey}`}
      target="_blank"
      rel="sponsored nofollow noopener"
      className={cn(
        "inline-flex items-center justify-center rounded-lg bg-cta px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-cta-dark",
        className
      )}
    >
      {children}
    </a>
  );
}
