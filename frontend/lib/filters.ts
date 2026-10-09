export type Option = { value: string; label: string };

export const IDEAL: Option[] = [
  { value: "men", label: "Men" },
  { value: "women", label: "Women" },
  { value: "unisex", label: "Unisex" },
  { value: "kids", label: "Kids" },
];

export const OCCASION: Option[] = [
  { value: "traditional", label: "Traditional" },
  { value: "casual", label: "Casual" },
  { value: "summer", label: "Summer" },
  { value: "winter", label: "Winter" },
  { value: "formal", label: "Formal" },
];

export const PRICE: Option[] = [
  { value: "under-500", label: "Under ₹500" },
  { value: "500-1000", label: "₹500 to ₹1000" },
  { value: "1000-2000", label: "₹1000 to ₹2000" },
  { value: "above-2000", label: "Above ₹2000" },
];


export const DECORATIVE = [
  { key: "work", label: "WORK", options: ["Office", "Daily Wear", "Travel"] },
  { key: "fabric", label: "FABRIC", options: ["Cotton", "Polyester", "Silk"] },
  { key: "segment", label: "SEGMENT", options: ["Cotton", "Polyester", "Silk"] },
  { key: "suitable", label: "SUITABLE", options: ["Formal", "Traditional", "Party Wear"] },
  { key: "material", label: "RAW MATERIAL", options: ["Cotton", "Polyester", "Silk"] },
  { key: "pattern", label: "PATTERN", options: ["Floral", "Printed", "Solid"] },
];