import z from "zod";
import fs from "fs";
import path from "path";

import Client from "./Client";

import notes from "@/lib/mongodb/notes";
import setMetadata from "@/lib/utils/setMetadata";
import { PublicEnv } from "@/types/env";
import { NoteDatabse } from "@/types/notes";
import { ViewContextProvider } from "@/contexts/View/ViewProvider";

export const metadata = setMetadata("查看笔记");

function getArchiveNotes() {
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

export default async function Page() {
  const result = await notes.query();
  if (!result.data) throw new Error(result.message);

  const env = PublicEnv.parse(process.env);

  let data = [{ name: env.CURRENT_TERM, notes: result.data }];
  data = data.concat(getArchiveNotes()).filter((item) => item.notes.length > 0);

  return (
    <ViewContextProvider data={data}>
      <Client />
    </ViewContextProvider>
  );
}
