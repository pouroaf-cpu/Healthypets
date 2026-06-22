import type { Metadata } from "next";

export const metadata: Metadata = { title: "About" };

export default function About() {
  return (
    <div className="prose-content mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-heading text-3xl font-bold">About Healthy Pets</h1>
      <p>
        Healthy Pets is an independent New Zealand resource helping cat and dog owners make
        confident, well-informed decisions about their pet&apos;s health — from flea and worming
        treatments to supplements and food.
      </p>
      <p>
        We research the products available in New Zealand, compare them honestly, and point you to
        where to buy them locally. Our health content is written to be practical and vet-informed,
        and we flag clearly when you should talk to your own vet.
      </p>
      <h2>How we make money</h2>
      <p>
        We&apos;re reader-supported. When you buy through some of our links we may earn a small
        commission, at no extra cost to you. It never changes our recommendations — see our{" "}
        <a href="/affiliate-disclosure">affiliate disclosure</a> and{" "}
        <a href="/editorial-policy">editorial policy</a>.
      </p>
      <h2>A note on pet health</h2>
      <p>
        Our content is general information, not veterinary advice. Always consult your vet about
        your individual pet, especially for medications, dosages, or ongoing health concerns.
      </p>
    </div>
  );
}
