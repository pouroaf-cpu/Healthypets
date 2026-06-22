import { MDXRemote } from "next-mdx-remote/rsc";
import { CTAButton } from "./CTAButton";
import { ComparisonTable } from "./ComparisonTable";
import { EmailCapture } from "./EmailCapture";

// Components available inside MDX content (write <CTAButton linkKey="..."/> etc. in articles).
const components = {
  CTAButton,
  ComparisonTable,
  EmailCapture,
};

export function Mdx({ source }: { source: string }) {
  return (
    <div className="prose-content max-w-none">
      <MDXRemote source={source} components={components} />
    </div>
  );
}
