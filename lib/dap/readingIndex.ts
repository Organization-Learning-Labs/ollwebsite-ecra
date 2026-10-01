/** The reading dossiers referenced by the sample DAP report. */
export interface ReadingIndexEntry {
  id: string;
  competenceId: string;
  competenceName: string;
  readMinutes: number;
}

export const readingIndex: ReadingIndexEntry[] = [
  { id: 'rm-core-soft-skills', competenceId: 'core-soft-skills', competenceName: 'Core Soft Skills', readMinutes: 16 },
  { id: 'rm-data-sensitivity', competenceId: 'data-sensitivity', competenceName: 'Data Sensitivity & Communication', readMinutes: 14 },
  { id: 'rm-mental-health', competenceId: 'mental-health', competenceName: 'Mental Health at Work', readMinutes: 13 },
];

export function findReadingMaterialByCompetence(competenceId: string): ReadingIndexEntry | undefined {
  return readingIndex.find((m) => m.competenceId === competenceId);
}
