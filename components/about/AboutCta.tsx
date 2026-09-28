import { StoryCta } from "@/components/story/StoryCta";
import { aboutContent as c } from "@/data/about";

export function AboutCta() {
  return (
    <StoryCta
      heading={c.close.ctaHeading}
      body={c.close.ctaBody}
      actions={[
        { label: c.close.primaryLabel, href: c.close.primaryHref, primary: true },
        { label: c.close.secondaryLabel, href: c.close.secondaryHref },
        { label: "Competence Blueprint", href: "/competence-blueprint" },
      ]}
    />
  );
}
