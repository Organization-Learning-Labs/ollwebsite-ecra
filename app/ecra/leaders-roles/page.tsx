import type { Metadata } from "next";
import { EcraSubPage } from "@/components/ecra/EcraSubPage";
import { LevelSections } from "@/components/ecra/LevelSections";
import { ecraLevel } from "@/data/ecra";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata("ecraRoles");

export default function EcraRolesPage() {
  return (
    <EcraSubPage slug="leaders-roles" pageKey="ecraRoles">
      <LevelSections level={ecraLevel("leaders-roles")} />
    </EcraSubPage>
  );
}
