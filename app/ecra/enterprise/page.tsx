import type { Metadata } from "next";
import { EcraSubPage } from "@/components/ecra/EcraSubPage";
import { LevelSections } from "@/components/ecra/LevelSections";
import { ecraLevel } from "@/data/ecra";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata("ecraEnterprise");

export default function EcraEnterprisePage() {
  return (
    <EcraSubPage slug="enterprise" pageKey="ecraEnterprise">
      <LevelSections level={ecraLevel("enterprise")} />
    </EcraSubPage>
  );
}
