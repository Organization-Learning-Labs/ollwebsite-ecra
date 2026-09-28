import type { Metadata } from "next";
import { EcraSubPage } from "@/components/ecra/EcraSubPage";
import { LevelSections } from "@/components/ecra/LevelSections";
import { ecraLevel } from "@/data/ecra";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata("ecraBusinessUnit");

export default function EcraBusinessUnitPage() {
  return (
    <EcraSubPage slug="business-unit" pageKey="ecraBusinessUnit">
      <LevelSections level={ecraLevel("business-unit")} />
    </EcraSubPage>
  );
}
