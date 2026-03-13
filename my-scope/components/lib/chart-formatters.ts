export function formatNumber(value: number | string | undefined): string {
  if (value === undefined || value === null || value === '') return '-';
  const num = typeof value === 'number' ? value : Number(value);
  if (Number.isNaN(num)) return String(value);
  return new Intl.NumberFormat().format(num);
}

export function formatCurrency(value: number | string | undefined, currency = 'USD'): string {
  if (value === undefined || value === null || value === '') return '-';
  const num = typeof value === 'number' ? value : Number(value);
  if (Number.isNaN(num)) return String(value);
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(num);
}
