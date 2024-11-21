export const formatNumberToTriads = (num: number | string, decimalScale = 2, trimZeroes = true): string => {
  const formatted = Number(num)
    .toFixed(decimalScale)
    .toString()
    .replace(/^-/, '\u2013')
    .replace(/\./, ',')
    .replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1\u00A0');

  return trimZeroes
    ? formatted
      .replace(/(,[1-9])0+$/g, '$1')
      .replace(/(,0*$)/g, '')
    : formatted;
};
