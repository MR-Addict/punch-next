import "dotenv/config";

import { getTermNotesPNs } from "./llm-pnr";
import { writeJSONToFile } from "./utils/fs";

import getAllNotes from "../notes/getAllNotest";

(async () => {
  const allTermNotes = await getAllNotes();
  for (const { term, notes } of allTermNotes) {
    const pns = await getTermNotesPNs(term, notes);
    writeJSONToFile(pns, `${term}.json`);
  }
})();
