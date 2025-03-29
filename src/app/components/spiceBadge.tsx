import { CreateBadgeMap } from './createBadge';

export enum SpiceLevel {
  NoSpice = 'no spice',
  Mild = 'mild',
  Medium = 'medium',
  Hot = 'Hot',
}

// const SpiceLevelLabels: Record<SpiceLevel, string> = {
//   [SpiceLevel.NoSpice]: 'Not Spicy ❄️',
//   [SpiceLevel.Mild]: 'Mild 🌿',
//   [SpiceLevel.Medium]: 'Medium 🌶️',
//   [SpiceLevel.Hot]: 'Hot 🌶️🔥',
// };

// const SpiceLevelMapColor: Record<SpiceLevel, string> = {
//   [SpiceLevel.NoSpice]: 'oklch(0.685 0.169 237.323)',
//   [SpiceLevel.Mild]: 'oklch(0.627 0.194 149.214)',
//   [SpiceLevel.Medium]: 'oklch(0.705 0.213 47.604)',
//   [SpiceLevel.Hot]: 'oklch(0.637 0.237 25.331)',
// };

//combining my spiceLevel records into one
const SpiceLevelBadge = CreateBadgeMap<SpiceLevel>({
  [SpiceLevel.NoSpice]: {
    label: 'Not Spicy ❄️',
    color: 'oklch(0.685 0.169 237.323)',
  },
  [SpiceLevel.Mild]: {
    label: 'Mild 🌿',
    color: 'oklch(0.627 0.194 149.214)',
  },
  [SpiceLevel.Medium]: {
    label: 'Medium 🌶️',
    color: 'oklch(0.705 0.213 47.604)',
  },
  [SpiceLevel.Hot]: {
    label: 'Hot 🌶️🔥',
    color: 'oklch(0.637 0.237 25.331)',
  },
});

export default function SpiceBadge({ spiceLevel }: { spiceLevel: SpiceLevel }) {
  const { label, color } = SpiceLevelBadge[spiceLevel];
  return (
    <>
      <span style={{ color }}>{label}</span>
    </>
  );
}
