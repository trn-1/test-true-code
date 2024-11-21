export const pluralNumbers = (number: number, suffix: string[]): string => {
  const cases = [2, 0, 1, 1, 1, 2];

  return suffix[
    (number % 100 > 4 && number % 100 < 20)
      ? 2
      : cases[Math.min(number % 10, 5)]
  ];
};
