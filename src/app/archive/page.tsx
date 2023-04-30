import fs from "fs";
import path from "path";

import data from "./config";
import Client from "./Client";
import { TableContextProvider } from "./contexts";
import { NoteDatabseType } from "@/types/notes";

function getNotes(name: string) {
  const filePath = path.join(process.cwd(), `src/assets/${name}.json`);
  const fileContent = fs.readFileSync(filePath, "utf8");
  const notes: NoteDatabseType[] = JSON.parse(fileContent);
  return { name, notes };
}

export default function Page() {
  const result = data.map((item) => getNotes(item.name));

  return (
    <TableContextProvider data={result}>
      <Client />
    </TableContextProvider>
  );
}
