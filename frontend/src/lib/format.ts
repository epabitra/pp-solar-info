/** All number formatting goes through here (RULES.md §3.5). Indian grouping: 1,00,000. */
const rupeeFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

const integerFormatter = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 });
const decimalFormatter = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 1 });

export function formatRupees(value: number): string {
  return rupeeFormatter.format(value);
}

export function formatInteger(value: number): string {
  return integerFormatter.format(value);
}

export function formatDecimal(value: number): string {
  return decimalFormatter.format(value);
}
