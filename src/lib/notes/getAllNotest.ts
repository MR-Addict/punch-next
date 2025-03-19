import notes from "@/lib/mongodb/notes";
import getArchivedTerms from "./getArchivedTerms";
import getArchivedNotes from "./getArchivedNotes";

import { PublicEnv } from "@/types/env";
import { NoteDatabseType } from "@/types/notes";

export default async function getAllNotes(): Promise<{ term: string; notes: NoteDatabseType[] }[]> {
  const env = PublicEnv.parse(process.env);
  const databaseRes = await notes.query(1, 1000, "");
  if (!databaseRes.success) throw new Error("Failed to get notes from database");

  const archivedTerms = getArchivedTerms();
  const archivedNotes = archivedTerms.map((term) => {
    const res = getArchivedNotes(term.name, 1, 1000, "");
    if (!res.success) throw new Error(`Failed to get notes from ${term.name}`);
    return { term: term.name, notes: res.data.data };
  });

  return [{ term: env.CURRENT_TERM, notes: databaseRes.data.data }, ...archivedNotes];
}
