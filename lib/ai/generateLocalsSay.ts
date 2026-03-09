import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.API_KEY!)

export async function generateLocalsSay(reviews: string) {

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
  })

  const prompt = `
You are summarizing customer feedback for a local discovery app.

Your goal is to produce a short INSIGHT about the place.

Rules:
- Maximum 18 words
- Explain what customers commonly EXPERIENCE
- Mention positives or problems clearly
- Avoid vague phrases like "reviews mention"
- Write like advice to someone considering the place

Examples:

Good:
"Friendly staff and good haircut but waiting times can be long."

Bad:
"Reviews mention staff behavior and crowd levels."

Reviews:
${reviews}
`

  const result = await model.generateContent(prompt)

  return result.response.text().trim()
}