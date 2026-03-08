import { GoogleGenerativeAI } from "@google/generative-ai";

// 1. Initialize with the STABLE v1 API version explicitly
const genAI = new GoogleGenerativeAI(process.env.API_KEY!);

export async function analyzeReview(text: string) {
  // 2. Specify the apiVersion in the request options
  const model = genAI.getGenerativeModel(
    { model: "gemini-2.5-flash" }
    // { apiVersion: "v1" } // <--- THIS FORCES THE CORRECT URL
  );

  const prompt = `
    Analyze the following customer review.
    Return ONLY valid JSON.
    {
      "sentiment": "positive | negative | mixed",
      "themes": ["keyword1","keyword2"],
      "summary": "short summary"
    }
    Review: "${text}"
  `;

  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const responseText = result.response.text();
    return JSON.parse(responseText);
  } catch (error: any) {
    // If v1 still fails, it means the model was renamed to gemini-2.0-flash
    console.error("Critical API Error:", error.message);
    return {
      sentiment: "error",
      themes: [],
      summary: "Could not reach AI service."
    };
  }
}