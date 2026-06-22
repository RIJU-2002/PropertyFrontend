export function fmtINR(n: number): string {
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

export function calcEmi(
  principal: number,
  ratePa: number,
  years: number
) {
  const r = ratePa / 12 / 100;
  const n = years * 12;

  const emi = Math.round(
    (principal * r * Math.pow(1 + r, n)) /
      (Math.pow(1 + r, n) - 1)
  );

  const total = emi * n;
  const interest = total - principal;

  return {
    emi,
    interest,
    total,
  };
}