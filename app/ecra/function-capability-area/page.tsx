import type { Metadata } from "next";
import { EcraSubPage } from "@/components/ecra/EcraSubPage";
import { LevelSections } from "@/components/ecra/LevelSections";
import { ecraLevel } from "@/data/ecra";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata("ecraFunction");

export default function EcraFunctionPage() {
  return (
    <EcraSubPage slug="function-capability-area" pageKey="ecraFunction">
      <LevelSections level={ecraLevel("function-capability-area")} />
    </EcraSubPage>
  );
}
