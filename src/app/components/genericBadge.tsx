type GenericBadgeProps<T extends string> = {
  type: T;
  map: Record<T, { label: string; color: string }>;
};

export function GenericBadge<T extends string>({
  type,
  map,
}: GenericBadgeProps<T>) {
  const { label, color } = map[type];
  return (
    <span
      style={{
        backgroundColor: color,
        padding: '0.25rem 0.5rem',
        borderRadius: '8px',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '0.85rem',
        display: 'inline-block',
      }}
    >
      {label}
    </span>
  );
}
