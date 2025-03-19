import { z } from "zod";
import { generateObject } from "ai";
import { ollama } from "ollama-ai-provider";

import { PNDataType } from "./type";
import { NoteDatabseType } from "@/types/notes";

import getPositions from "./utils/getPositions";

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

async function getTextPNs(text: string) {
  const data = await LLMPNR(text);
  if (!data) return null;

  return data
    .map((pn) => {
      const positions = getPositions(pn, text);
      if (positions.length === 0) return;
      return { pn, positions };
    })
    .filter((pn) => pn !== undefined);
}

export async function getTermNotesPNs(term: string, notes: NoteDatabseType[]): Promise<Record<string, PNDataType[]>> {
  return await new Promise<Record<string, PNDataType[]>>((resolve) => {
    let finished = 0;
    const pns: Record<string, PNDataType[]> = {};

    notes.forEach(async (note) => {
      const data = await getTextPNs(note.content);
      if (data !== null) {
        data.forEach((pn) => {
          const d: PNDataType = { _id: note._id, term, positions: pn.positions };
          if (pns[pn.pn] === undefined) pns[pn.pn] = [d];
          else pns[pn.pn].push(d);
          console.log(`[INFO]: ${JSON.stringify(d)}`);
        });
      }

      // Resolve when all notes are processed
      finished++;
      if (finished === notes.length) resolve(pns);
    });
  });
}
