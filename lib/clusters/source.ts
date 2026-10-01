import { clusterExplorerRoles } from "@/data/cluster-explorer";
import type { ExplorerData } from "./types";

/** Loads the explorer data on the server; swap the body for platform API calls when they are ready. */
export async function getExplorerData(): Promise<ExplorerData> {
  return { roles: clusterExplorerRoles };
}
