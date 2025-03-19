import { z } from "zod";
import { generateObject } from "ai";
import { ollama } from "ollama-ai-provider";
import "dotenv/config";

import { PN, PNData } from "./type";
import { writeJSONToFile } from "./utils/fs";

import getPositions from "./utils/getPositions";
import getArchivedNotes from "@/lib/notes/getArchivedNotes";
import getArchivedTerms from "@/lib/notes/getArchivedTerms";

const model = ollama("gemma3");
const terms = getArchivedTerms();

async function LLMPNR(text: string) {
  try {
    const { object } = await generateObject({
      model: model,
      output: "array",
      schema: z.string().describe("The recognized proper noun"),
      prompt: `You are an AI assistant specialized in extracting proper nouns from given text. Given an input text, identify and list all proper nouns, including names of people, places, organizations, products, and other specific entities. Ensure accuracy by distinguishing between common nouns and proper nouns. Avoid including generic words or ambiguous terms that are not clearly proper nouns.

      Input text:

      ${text}
      `
    });
    return object;
  } catch (err) {
    return null;
  }
}

(async () => {
  const term = terms[1].name;
  const res = getArchivedNotes(term, 1, 1000, "");
  if (!res.success) return;

  const pns = await new Promise<Record<string, PN[]>>((resolve) => {
    let finished = 0;
    const pns: Record<string, PN[]> = {};

    res.data.data.forEach(async (note) => {
      const data = await LLMPNR(note.content);
      if (data !== null) {
        data.forEach((pn) => {
          const positions = getPositions(pn, note.content);
          if (positions.length === 0) return;

          const d: PNData = { _id: note._id, term, positions };
          if (pns[pn] === undefined) pns[pn] = [{ alias: [pn], data: [d] }];
          else pns[pn].push({ alias: [pn], data: [d] });

          console.log(`PN[${pn}]: ${JSON.stringify(d)}`);
        });
      }

      // Resolve when all notes are processed
      finished++;
      if (finished === res.data.pagination.total) resolve(pns);
    });
  });

  writeJSONToFile(pns, `${term}.json`);

  console.log(Object.keys(pns));
})();
