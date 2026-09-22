export function formatPrice(value) {
  const num = Number(value);
  if (Number.isNaN(num)) return "-";
  return `$${num.toLocaleString("en-US")}`;
}