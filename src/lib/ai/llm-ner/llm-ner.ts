import { z } from "zod";
import { generateObject } from "ai";
import { ollama } from "ollama-ai-provider";
import "dotenv/config";

import { prompt } from "./consts";
import getArchivedNotes from "@/lib/notes/getArchivedNotes";
import getArchivedTerms from "@/lib/notes/getArchivedTerms";

const model = ollama("gemma3");
const terms = getArchivedTerms();

async function LLMNER(text: string) {
  try {
    const { object } = await generateObject({
      model: model,
      output: "array",
      schema: z.string(),
      prompt: prompt.ner(text)
    });
    return object;
  } catch (err) {
    return [];
  }
}

async function LLMRemoveDuplicates(text: string) {
  try {
    const { object } = await generateObject({
      model: model,
      output: "array",
      schema: z.string(),
      prompt: prompt.removeDuplicates(text)
    });
    return object;
  } catch (err) {
    return [];
  }
}

async function LLMNormalize(text: string) {
  try {
    const { object } = await generateObject({
      model: model,
      output: "array",
      schema: z.string(),
      prompt: prompt.normalize(text)
    });
    return object;
  } catch (err) {
    return [];
  }
}

(async () => {
  const res = getArchivedNotes(terms[4].name, 1, 1000, "");
  if (!res.success) return;

  const ners = await new Promise<string[]>((resolve) => {
    let finished = 0;
    const ners: string[] = [];
    res.data.data.forEach(async (note, index) => {
      const data = await LLMNER(note.content);
      console.log(`Note[${note._id}]: ${data.join(", ")}`);
      ners.push(...data);
      finished++;
      if (finished === res.data.data.length) resolve(ners);
    });
  });

  const nersArray = Array.from(new Set(ners));
  const uniqueNers = await LLMRemoveDuplicates(nersArray.join(", "));

  const normalizedNers = await LLMNormalize(uniqueNers.join(", "));
  console.log(normalizedNers);
})();
