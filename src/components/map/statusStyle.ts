import type { CountryRegistryItem } from '../../data/countryRegistry';

export const STATUS_COLORS: Record<CountryRegistryItem['sovereignAiStatus'], string> = {
  'Active Strategy': '#22d3ee',
  'Developing Policy': '#fbbf24',
  'Emerging Hub': '#818cf8',
  Constrained: '#f87171',
  Baseline: '#94a3b8',
};

export function capacityToRadius(mw: number): number {
  // sqrt scaling so marker area (not radius) tracks capacity roughly linearly
  const min = 6;
  const max = 26;
  const scaled = Math.sqrt(mw) / Math.sqrt(18500) * max;
  return Math.max(min, Math.min(max, scaled));
}
