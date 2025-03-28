export enum SpiceLevelBadge {
  NoSpice = 'no spice',
  Mild = 'mild',
  Medium = 'medium',
  Hot = 'Hot',
}

const SpiceLevelLabels: Record<SpiceLevelBadge, string> = {
  [SpiceLevelBadge.NoSpice]: 'Not Spicy ❄️',
  [SpiceLevelBadge.Mild]: 'Mild 🌿',
  [SpiceLevelBadge.Medium]: 'Medium 🌶️',
  [SpiceLevelBadge.Hot]: 'Hot 🌶️🔥',
};

const SpiceLevelMapColor: Record<SpiceLevelBadge, string> = {
  [SpiceLevelBadge.NoSpice]: 'oklch(0.685 0.169 237.323)',
  [SpiceLevelBadge.Mild]: 'oklch(0.627 0.194 149.214)',
  [SpiceLevelBadge.Medium]: 'oklch(0.705 0.213 47.604)',
  [SpiceLevelBadge.Hot]: 'oklch(0.637 0.237 25.331)',
};
export default function SpiceBadge({
  spiceLevel,
}: {
  spiceLevel: SpiceLevelBadge;
}) {
  return (
    <>
      <span style={{ color: SpiceLevelMapColor[spiceLevel] }}>
        {SpiceLevelLabels[spiceLevel]}
      </span>
    </>
  );
}
