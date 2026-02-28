export type Listing = {
  name: string;        // place name
  comment: string;
  sentiment: "positive" | "negative" | "neutral";
  createdAt: string;
};