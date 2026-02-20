import { Listing } from "@/types/listing";

export const DATA: Record<
  string,
  Record<string, Listing[]>
> = {
  Kolathur: {
    salons: [
      { name: "Green Trends", note: "Budget friendly" }
    ],
    restaurants: [
      { name: "Sangeetha", note: "Family friendly" }
    ]
  },

  Korattur: {
    supermarket: [
      { name: "Veni Supermarket", note: "I've been purchasing for the past 3-4 years. Customer Friendly. Has almost all basic necessary items." }
    ],
    restaurants: [
      { name: "Hotel New Saravanas", note: "Family friendly" }
    ],
    salons: [
      { name: "Naturals (Above Ganesh Bhavan)", note: "Located in Central Avenue. Staffs are friendly and approachable. They listen and suggests what suits us." }
    ]
  },

  Ramapuram: {
    salons: [
      { name: "Naturals", note: "Reliable chain" }
    ],
    restaurants: [
      { name: "Dindigul Thalappakatti", note: "Biryani spot" }
    ]
  }
};