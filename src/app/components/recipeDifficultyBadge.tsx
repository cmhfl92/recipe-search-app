import { CreateBadgeMap } from './createBadge';

export enum RecipeDifficulty {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard',
}

// const RecipeDifficultyMap: Record<RecipeDifficulty, string> = {
//   [RecipeDifficulty.Easy]: 'Easy Peasy 🍋',
//   [RecipeDifficulty.Medium]: 'Intermediate 🧑‍🍳',
//   [RecipeDifficulty.Hard]: 'Expert Only 🔥',
// };

// const RecipeDifficultyColor: Record<RecipeDifficulty, string> = {
//   [RecipeDifficulty.Easy]: 'oklch(0.627 0.194 149.214)',
//   [RecipeDifficulty.Medium]: 'oklch(0.705 0.213 47.604)',
//   [RecipeDifficulty.Hard]: 'oklch(0.637 0.237 25.331)',
// };

//refactored/combined badge component record types for recipes
const RecipeBadge = CreateBadgeMap<RecipeDifficulty>({
  [RecipeDifficulty.Easy]: {
    label: 'Easy Peasy 🍋',
    color: 'oklch(0.627 0.194 149.214)',
  },
  [RecipeDifficulty.Medium]: {
    label: 'Intermediate 🧑‍🍳',
    color: 'oklch(0.705 0.213 47.604)',
  },
  [RecipeDifficulty.Hard]: {
    label: 'Expert Only 🔥',
    color: 'oklch(0.637 0.237 25.331)',
  },
});

export default function RecipeDifficultyBadge({
  difficulty,
}: {
  difficulty: RecipeDifficulty;
}) {
  const { label, color } = RecipeBadge[difficulty];
  return (
    <>
      <span style={{ color }}>{label}</span>
    </>
  );
}
