import { generateText } from "ai";

import { ollama } from "ollama-ai-provider";

const model = ollama("phi3");

export async function chat() {
  const { text } = await generateText({
    model: model,
    prompt: "What is love?"
  });
  console.log(text);
}
