export const clearNumber = (str: string | number) =>
  typeof str === 'number' ? str : Number(str.replace(/\s+/g, ''));
