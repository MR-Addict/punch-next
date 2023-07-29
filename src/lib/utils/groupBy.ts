export default function groupBy<T>(array: T[], predicate: (value: T, index: number, array: T[]) => string) {
  const groups = array.reduce(
    (acc, value, index, array) => {
      (acc[predicate(value, index, array)] ||= []).push(value);
      return acc;
    },
    {} as { [key: string]: T[] }
  );

  return Object.keys(groups).map((category) => ({
    category,
    count: groups[category].length,
    data: groups[category]
  }));
}
