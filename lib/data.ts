import { Listing } from "@/types/listing";

export const DATA: Record<
  string,
  Record<string, Listing[]>
> = {
  Kolathur: {
    hospital: [
      { name: "DRJ Hospital", note: "Attentive and kind Nurses, Reasonable rates and Mediclaim facilities are available for cashless treatments" }
    ]
  },

   Padur: {
    salon: [
      { name: "Naturals Salon", note: " Clean and well-maintained. Prices were higher compared to other local establishments. Good value for the money, particularly when utilizing available combo offers and discounts" }
    ],
    restaurant: [
      { name: "Sri Krishna Bhavan", note: "Authentic and home-made taste of South Indian staples like Sambar, Chutney, and Rava Dosai. Ample Car Parking. Quick and Fast Service. Highly crowded during weekends. Has separate AC and Non-AC dining area." }
    ],
    carcare: [
      { name: "Munish Car Care", note: "Knowledgeable Owner and his team. Showroom-perfect after washing and detailing. Thorough chassis cleaning.  Reasonably priced compared to other car spas in Padur and Kelambakkam. Ph: 090433 79505" },
      { name: "AUTO BREWS", note: "Tried last week and felt was good for the cost spent.. Ph: 074188 75777" }
    ]
  },

  Korattur: {
    supermarket: [
      { name: "Veni Supermarket", note: "I've been purchasing for the past 3-4 years. Customer Friendly. Has almost all basic necessary items." }
    ],
    restaurant: [
      { name: "Hotel New Saravanas", note: "Family friendly" }
    ],
    salon: [
      { name: "Naturals (Above Ganesh Bhavan)", note: "Located in Central Avenue. Staffs are friendly and approachable. They listen and suggests what suits us." }
    ]
  },

  Ramapuram: {
    salon: [
      { name: "Naturals", note: "Reliable chain" }
    ],
    restaurant: [
      { name: "Dindigul Thalappakatti", note: "Biryani spot" }
    ]
  }
};