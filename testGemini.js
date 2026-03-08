const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyCfCoubV6MZI5n7l845y0SICUo9PIw6s4Y");

async function run() {

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
  });

  const prompt = `
Area: Velachery
Category: Restaurant
Place: A2B
Review: Food was good but service was slow

Return JSON:
{
  "sentiment": "",
  "themes": [],
  "summary": ""
}
`;

  const result = await model.generateContent(prompt);

  console.log(result.response.text());
}

run();