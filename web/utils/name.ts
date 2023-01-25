export const capitalize = (str: string) => {
  if (str.length === 0) return "";
  const firstChar = str[0];
  const restChars = str.slice(1);
  return firstChar.toUpperCase() + restChars.toLowerCase();
};
