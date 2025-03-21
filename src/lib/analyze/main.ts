import "dotenv/config";

import { getTermNotesPNs } from "./pnr";
import { writeJSONToFile } from "./utils/fs";

import getAllNotes from "../notes/getAllNotest";

(async () => {
  const allTermNotes = await getAllNotes();
  for (const { term, notes } of allTermNotes) {
    const pns = await getTermNotesPNs(term, notes);
    writeJSONToFile({ pns }, `${term}.json`);
    console.log(`[SUCCESS]: ${term}已完成识别\n`);
  }
  process.exit(0);
})();
