import Image from "next/image";
import { getImage } from "@/lib/images";
import { PetImage } from "./Icons";

// In-article / hero image. Reference a manifest id; falls back to an on-brand gradient
// placeholder when the image hasn't been fetched yet, so the layout is never broken.
//
//   <Figure id="cat-flea-hero" alt="A ginger cat being checked for fleas" caption="..." />
//
// `aspect` controls the frame ratio (default 16/10). `priority` for above-the-fold heroes.
export function Figure({
  id,
  alt,
  caption,
  aspect = "16 / 10",
  priority = false,
  rounded = true,
  tone = "green",
  icon = "smile",
}: {
  id: string;
  alt?: string;
  caption?: string;
  aspect?: string;
  priority?: boolean;
  rounded?: boolean;
  tone?: string;
  icon?: string;
}) {
  const img = getImage(id);
  const radius = rounded ? "var(--radius-lg)" : "0";
  const altText = alt || img?.alt || "";

  const frame: React.CSSProperties = {
    position: "relative",
    width: "100%",
    aspectRatio: aspect,
    borderRadius: radius,
    overflow: "hidden",
    background: "var(--green-light)",
  };

  const credit = img?.credit;
  const creditNode =
    credit && (credit.author || credit.license) ? (
      <>
        {" "}
        <span style={{ color: "var(--ink-muted)" }}>
          Photo:{" "}
          {credit.sourceUrl ? (
            <a href={credit.sourceUrl} target="_blank" rel="noopener nofollow" style={{ color: "var(--ink-muted)", textDecoration: "underline" }}>
              {credit.author || "source"}
            </a>
          ) : (
            credit.author || "source"
          )}
          {credit.license ? (
            <>
              {" / "}
              {credit.licenseUrl ? (
                <a href={credit.licenseUrl} target="_blank" rel="noopener nofollow" style={{ color: "var(--ink-muted)", textDecoration: "underline" }}>
                  {credit.license}
                </a>
              ) : (
                credit.license
              )}
            </>
          ) : null}
        </span>
      </>
    ) : null;

  return (
    <figure style={{ margin: "28px 0", padding: 0 }}>
      <div style={frame}>
        {img ? (
          <Image
            src={img.src}
            alt={altText}
            fill
            sizes="(max-width: 760px) 100vw, 760px"
            style={{ objectFit: "cover" }}
            priority={priority}
          />
        ) : (
          <PetImage label={altText ? "" : "Photo coming soon"} tone={tone} icon={icon} radius="0" />
        )}
      </div>
      {(caption || creditNode) && (
        <figcaption style={{ marginTop: 8, fontSize: 13, lineHeight: 1.5, color: "var(--ink-soft)" }}>
          {caption}
          {creditNode}
        </figcaption>
      )}
    </figure>
  );
}
