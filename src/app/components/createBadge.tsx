export function CreateBadgeMap<T extends string>(map: {
  [K in T]: { label: string; color: string };
}) {
  return map;
}
