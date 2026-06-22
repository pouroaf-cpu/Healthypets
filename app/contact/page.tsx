import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contact" };

export default function Contact() {
  return (
    <div className="prose-content mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-heading text-3xl font-bold">Contact</h1>
      <p>
        Questions, feedback, or a product we should review? We&apos;d love to hear from you.
      </p>
      <p>
        Email: <a href="mailto:hello@healthypets.co.nz">hello@healthypets.co.nz</a>
      </p>
      <p className="text-sm text-ink/60">
        We&apos;re a content site, not a vet — for medical concerns about your pet, please contact
        your veterinarian.
      </p>
    </div>
  );
}
