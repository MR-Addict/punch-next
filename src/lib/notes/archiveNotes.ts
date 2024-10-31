import fs from "fs";
import path from "path";
import "dotenv/config";

import notes from "@/lib/mongodb/notes";
import clientPromise from "../mongodb/clientPromise";

import { PublicEnv } from "@/types/env";
import { NoteDatabseType } from "@/types/notes";

function archiveNotes(term: string, notes: NoteDatabseType[]) {
  const archivePath = path.join(process.cwd(), "archive", `${term}.json`);
  fs.writeFileSync(archivePath, JSON.stringify(notes, null, 2));
}

async function main() {
  const term = PublicEnv.parse(process.env).CURRENT_TERM;
  const res = await notes.query(1, 1000, "");

  if (res.success) archiveNotes(term, res.data.data);
  else console.error(res.message);

  await clientPromise.then((client) => client.close());
}

main();
