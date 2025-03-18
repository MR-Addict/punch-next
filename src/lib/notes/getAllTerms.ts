import { Env } from "@/types/env";
import getArchivedTerms from "@/lib/notes/getArchivedTerms";

export default function getAllTerms() {
  const currentTerm = Env.parse(process.env).CURRENT_TERM;
  const archivedTerms = getArchivedTerms().map((term) => term.name);
  return Array.from(new Set([currentTerm, ...archivedTerms]));
}
