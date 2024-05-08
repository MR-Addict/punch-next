import fs from "fs";
import path from "path";

import { NoteDatabseType } from "@/types/notes";

export default function exportNotesToArchive(term: string, notes: NoteDatabseType[]) {
  const archivePath = path.join(process.cwd(), "archive", `${term}.json`);
  fs.writeFileSync(archivePath, JSON.stringify(notes, null, 2));
}
