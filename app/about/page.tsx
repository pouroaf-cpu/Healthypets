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
      <h2>How we work</h2>
      <p>
        We research the products available in New Zealand and point you to where to buy them
        locally. Our recommendations are based on suitability and value — see our{" "}
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
