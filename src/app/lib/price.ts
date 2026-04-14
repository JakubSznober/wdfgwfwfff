/** Format a numeric price as Dutch currency: 9.95 → "€9,95" */
export function formatPrice(price: number): string {
  return '€' + price.toFixed(2).replace('.', ',')
}
