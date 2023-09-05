import z from "zod";
import fs from "fs";
import path from "path";

import Client from "./Client";

import notes from "@/lib/mongodb/notes";
import setMetadata from "@/lib/utils/setMetadata";
import { NoteDatabse } from "@/types/notes";
import { ClientContextProvider } from "./contexts/ClientContext";

export const metadata = setMetadata("查看笔记");

function getArchiveNotes() {
  const archivePath = path.join(process.cwd(), "/src/assets");
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

export default async function Page() {
  const result = await notes.query();
  if (!result.data) throw new Error(result.message);
  const data = [{ name: "2023-2024年第一学期", notes: result.data }].concat(getArchiveNotes());

  return (
    <ClientContextProvider data={data}>
      <Client />
    </ClientContextProvider>
  );
}
