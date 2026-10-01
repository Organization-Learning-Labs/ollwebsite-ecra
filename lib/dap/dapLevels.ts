import { beltBandConfigs, getVerdict } from './beltConfig';
import { BeltId, LevelBand, ResultVerdict } from './types';

/** The five band ranges configured for a given belt. */
export function getBandsForBelt(beltId: BeltId): LevelBand[] {
  const config =
  beltBandConfigs.find((c) => c.beltId === beltId) ?? beltBandConfigs[0];
  return config.bands;
}

/** Which band a score falls into, for that belt's configuration. */
export function resolveBand(score: number, beltId: BeltId): LevelBand {
  const bands = getBandsForBelt(beltId);
  const rounded = Math.round(score);
  return (
    bands.find((b) => rounded >= b.min && rounded <= b.max) ??
    bands[bands.length - 1]);

}

/** The Result verdict for a score, derived from its band. */
export function resolveVerdict(score: number, beltId: BeltId): ResultVerdict {
  return getVerdict(resolveBand(score, beltId).id);
}

/** Printable summary of the band configuration, for the methodology note. */
export function describeBandConfig(beltId: BeltId): string {
  return getBandsForBelt(beltId).
  map((b) => `${b.name} ${b.min}–${b.max}`).
  join('  ·  ');
}

/** Sections ordered weakest band first — drives recommended reading. */
export function orderByWeakestBand<T extends {score: number;}>(
items: T[])
: T[] {
  return [...items].sort((a, b) => a.score - b.score);
}

export const formatScore = (score: number): string =>
Number.isInteger(score) ? `${score}%` : `${score.toFixed(2)}%`;