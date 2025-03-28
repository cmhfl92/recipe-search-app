export enum RecipeDifficulty {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard',
}

const RecipeDifficultyMap: Record<RecipeDifficulty, string> = {
  [RecipeDifficulty.Easy]: 'Easy Peasy 🍋',
  [RecipeDifficulty.Medium]: 'Intermediate 🧑‍🍳',
  [RecipeDifficulty.Hard]: 'Expert Only 🔥',
};

const RecipeDifficultyColor: Record<RecipeDifficulty, string> = {
  [RecipeDifficulty.Easy]: 'green',
  [RecipeDifficulty.Medium]: 'orange',
  [RecipeDifficulty.Hard]: 'red',
};

export default function RecipeDifficultyBadge({
  difficulty,
}: {
  difficulty: RecipeDifficulty;
}) {
  return (
    <>
      <span style={{ backgroundColor: RecipeDifficultyColor[difficulty] }}>
        {RecipeDifficultyMap[difficulty]}
      </span>
    </>
  );
}
