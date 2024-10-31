import { PublicEnv } from "@/types/env";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(PublicEnv.parse(process.env));
}
