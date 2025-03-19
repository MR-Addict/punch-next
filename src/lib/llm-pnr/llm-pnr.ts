import { z } from "zod";
import { generateObject } from "ai";
import { ollama } from "ollama-ai-provider";

import { NoteDatabseType } from "@/types/notes";

const model = ollama("gemma3");

async function LLMPNR(text: string) {
  try {
    const { object } = await generateObject({
      model,
      output: "array",
      schema: z.string().describe("The recognized proper noun"),
      prompt: `You are an AI assistant specialized in extracting proper nouns from a given text. Your goal is to accurately identify and list all proper nouns, including names of people, places, organizations, products, programming languages, and other specific entities.

      Guidelines:

      - Only extract proper nouns —— Do not include common nouns, generic terms, or ambiguous words that are not clearly proper nouns.
      - Maintain accuracy —— Distinguish between proper nouns and regular nouns to avoid misclassification.

      Input text:

      ${text}
      `
    });
    return object;
  } catch (err) {
    return null;
  }
}

export async function getTermNotesPNs(term: string, notes: NoteDatabseType[]): Promise<Record<string, string[]>> {
  let finished = 0;
  const pns: Record<string, string[]> = {};

  for (const note of notes) {
    const data = await LLMPNR(note.content);
    finished++;
    if (data !== null) {
      data.forEach((pn) => {
        if (pns[pn] === undefined) pns[pn] = [note._id];
        else pns[pn].push(note._id);
        console.log(`[INFO](${((finished / notes.length) * 100).toFixed(0)}%): ${term} ${pn}`);
      });
    }
  }

  return pns;
}
