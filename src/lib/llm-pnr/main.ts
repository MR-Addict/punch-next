import "dotenv/config";

import { getTermNotesPNs } from "./llm-pnr";
import { writeJSONToFile } from "./utils/fs";

import getAllNotes from "../notes/getAllNotest";

(async () => {
  const allTermNotes = await getAllNotes();
  allTermNotes.forEach(async ({ term, notes }) => {
    const pns = await getTermNotesPNs(term, notes);
    writeJSONToFile(pns, `${term}.json`);
  });
})();
