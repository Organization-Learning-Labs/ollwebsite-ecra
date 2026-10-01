/** Splits a role description into its summary and the trailing "KPIs:" list. */
export function splitKpis(description: string): { summary: string; kpis: string[] } {
  const match = description.match(/^([\s\S]*?)\s*KPIs?:\s*([\s\S]+)$/i);
  if (!match) return { summary: description.trim(), kpis: [] };
  const kpis = match[2]
    .replace(/\.\s*$/, "")
    .split(/\s*,\s*/)
    .map((k) => k.trim())
    .filter(Boolean)
    .map((k) => k.charAt(0).toUpperCase() + k.slice(1));
  return { summary: match[1].trim(), kpis };
}
