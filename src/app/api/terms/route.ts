import getAllTerms from "@/lib/notes/getAllTerms";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(getAllTerms());
}
