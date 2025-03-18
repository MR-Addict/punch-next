import { z } from "zod";
import { generateObject } from "ai";
import { ollama } from "ollama-ai-provider";
import "dotenv/config";

import getArchivedNotes from "@/lib/notes/getArchivedNotes";
import getArchivedTerms from "@/lib/notes/getArchivedTerms";

const model = ollama("gemma3:7b");
const terms = getArchivedTerms();

async function LLMNER(text: string) {
  const { object } = await generateObject({
    model: model,
    output: "array",
    schema: z.string().describe("The named entity recognized by the model"),
    prompt: `You are the expert in recognizing meaningful and useful named entities from given text.

    Please read the following text and recognize the named entities:

    ${text}
    `
  });
  return object;
}

(async () => {
  const term = terms[4].name;
  const res = getArchivedNotes(term, 1, 1000, "");
  if (!res.success) return;

  await new Promise<string[]>((resolve) => {
    let finished = 0;
    const ners: string[] = [];
    res.data.data.forEach(async (note) => {
      const data = await LLMNER(note.content);
      console.log(`Note[${note._id}](${finished + 1}/${res.data.pagination.total}): ${data.join(", ")}`);
      ners.push(...data);
      finished++;
      if (finished === res.data.pagination.total) resolve(ners);
    });
  });
})();
