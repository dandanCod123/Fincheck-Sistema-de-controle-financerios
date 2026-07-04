export function currencyStringToNumber(value: string | number) {
  if (typeof value === "number") {
    return value;
  }

  const sanitizedString = value
    .replace(/\./g, "") // remove separadores de milhar
    .replace(",", "."); // vírgula decimal → ponto

  return Number(sanitizedString);
}
