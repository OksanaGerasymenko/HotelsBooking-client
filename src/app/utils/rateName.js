export function getRateName(rate) {
   if (rate >= 9) return "Excellent";
   if (rate >= 8) return "Very good";
   if (rate >= 7) return " Good ";
   if (rate >= 5) return " Normal";
   if (rate >= 3) return " Bad ";
   return "Very bad";
}