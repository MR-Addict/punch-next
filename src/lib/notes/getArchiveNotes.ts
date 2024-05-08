import z from "zod";
import fs from "fs";
import path from "path";

import { NoteDatabse } from "@/types/notes";

export default function getArchiveNotes() {
  const archivePath = path.join(process.cwd(), "archive");
  const fileNames = fs.readdirSync(archivePath);
  fileNames.sort((a, b) => b.localeCompare(a));

  return fileNames.map((fileName) => {
    const name = fileName.replace(".json", "");
    const filePath = path.join(archivePath, fileName);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const notes = z.array(NoteDatabse).parse(JSON.parse(fileContent));
    notes.sort(({ date: a }, { date: b }) => new Date(b).getTime() - new Date(a).getTime());
    return { name, notes };
  });
}
