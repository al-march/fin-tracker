export const Required = (message = 'Required field') =>
  (v: unknown) => v ? null : message;

export const OnlyNumber = (message = 'Should be number') => (v: unknown) => {
  const isNumber = !isNaN(Number(v));
  return isNumber ? null : message;
};
