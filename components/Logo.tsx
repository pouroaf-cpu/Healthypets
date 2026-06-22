import Link from "next/link";

// "Healthy Pets" wordmark + simple paw-in-leaf mark.
export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 font-heading text-xl font-bold text-ink">
      <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true">
        <path d="M16 3C9 8 6 13 6 19a10 10 0 0 0 20 0c0-6-3-11-10-16z" fill="#E8F5EF" stroke="#2E9E6B" strokeWidth="2" />
        <circle cx="12" cy="17" r="1.7" fill="#2E9E6B" />
        <circle cx="20" cy="17" r="1.7" fill="#2E9E6B" />
        <circle cx="14.5" cy="13.5" r="1.4" fill="#2E9E6B" />
        <circle cx="17.5" cy="13.5" r="1.4" fill="#2E9E6B" />
        <path d="M16 19c-2.2 0-3.5 1.6-3.5 3 0 1.3 1.3 2 3.5 2s3.5-.7 3.5-2c0-1.4-1.3-3-3.5-3z" fill="#2E9E6B" />
      </svg>
      <span>Healthy<span className="text-brand">Pets</span></span>
    </Link>
  );
}
