export const dynamic = "force-dynamic";

import { PublicEnv } from "@/types/env";

export async function GET() {
  return Response.json(PublicEnv.parse(process.env));
}
