import { Env } from "@/types/env";
import getArchivedTerms from "@/lib/notes/getArchivedTerms";

export const dynamic = "force-dynamic";

export async function GET() {
  const currentTerm = Env.parse(process.env).CURRENT_TERM;
  const archivedTerms = getArchivedTerms().map((term) => term.name);
  return Response.json(Array.from(new Set([currentTerm, ...archivedTerms])));
}
