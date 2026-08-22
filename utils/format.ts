const INR = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function formatINR(n: number | undefined | null): string {
  if (n == null || Number.isNaN(n)) return "Price on Request";
  return INR.format(n);
}

export function formatPossession(
  isoDate: string | undefined | null
): string {
  if (!isoDate) return "TBA";
  const d = new Date(isoDate);
  if (Number.isNaN(d.getTime())) return "TBA";
  return d.toLocaleDateString("en-IN", { month: "short", year: "numeric" });
}

export function formatRating(rating: number | undefined): string {
  if (rating == null) return "";
  return `${rating.toFixed(1)} / 5`;
}