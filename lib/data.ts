import { Listing } from "@/types/listing";

export const DATA: Record<
  string,
  Record<string, Listing[]>
> = {
  Kolathur: {
    hospital: [
      {
        name: "DRJ Hospital",
        comment:
          "Attentive and kind nurses. Reasonable rates and mediclaim facilities available for cashless treatments.",
        sentiment: "positive",
        createdAt: "2026-02-20T10:30:00Z",
      }
    ]
  },

  Padur: {
    salon: [
      {
        name: "Naturals Salon",
        comment:
          "Clean and well-maintained. Prices were higher compared to other local establishments. Good value for the money, particularly when utilizing available combo offers and discounts.",
        sentiment: "neutral",
        createdAt: "2026-02-25T10:15:00Z",
      }
    ],
    restaurant: [
      {
        name: "Sri Krishna Bhavan",
        comment:
          "Authentic and home-made taste of South Indian food like Sambar, Chutney, and Rava Dosai. Ample car parking. Quick and fast service. Highly crowded during weekends. Has separate AC and Non-AC dining area.",
        sentiment: "positive",
        createdAt: "2026-02-24T09:20:00Z",
      }
    ],
    carcare: [
      {
        name: "Munish Car Care",
        comment:
          "Knowledgeable owner and team. Showroom-perfect after washing and detailing. Thorough chassis cleaning. Reasonably priced compared to other car spas in Padur and Kelambakkam. Ph: 090433 79505",
        sentiment: "positive",
        createdAt: "2026-02-23T08:30:00Z",
      },
      {
        name: "AUTO BREWS",
        comment:
          "Tried last week and felt it was good for the cost spent. Ph: 074188 75777",
        sentiment: "positive",
        createdAt: "2026-02-22T11:45:00Z",
      }
    ]
  },

  Korattur: {
    supermarket: [
      {
        name: "Veni Supermarket",
        comment:
          "I've been purchasing for the past 3-4 years. Customer friendly. Has almost all basic necessary items.",
        sentiment: "positive",
        createdAt: "2026-02-21T12:10:00Z",
      }
    ],
    restaurant: [
      {
        name: "Hotel New Saravanas",
        comment: "Family friendly.",
        sentiment: "positive",
        createdAt: "2026-02-20T14:00:00Z",
      }
    ],
    salon: [
      {
        name: "Naturals (Above Ganesh Bhavan)",
        comment:
          "Located in Central Avenue. Staffs are friendly and approachable. They listen and suggest what suits us.",
        sentiment: "positive",
        createdAt: "2026-02-19T16:25:00Z",
      },
      {
        name: "Naturals (Above Ganesh Bhavan)",
        comment:
          "Sometimes overcrowded. Staffs are limited and not able to handle the crowd with proper appointment.",
        sentiment: "negative",
        createdAt: "2026-02-28T16:25:00Z",
      },
      {
        name: "Naturals (Above Ganesh Bhavan)",
        comment:
          "Appointments are not honoured. Random Walk-in is enough",
        sentiment: "negative",
        createdAt: "2026-02-02T16:25:00Z",
      }
    ]
  },

  Ramapuram: {
    salon: [
      {
        name: "Naturals",
        comment: "Reliable chain.",
        sentiment: "positive",
        createdAt: "2026-02-18T10:40:00Z",
      }
    ],
    restaurant: [
      {
        name: "Dindigul Thalappakatti",
        comment: "Biryani spot.",
        sentiment: "positive",
        createdAt: "2026-02-17T13:15:00Z",
      }
    ]
  }
};