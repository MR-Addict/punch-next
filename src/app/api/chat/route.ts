import { chat } from "@/lib/ai/chat";

export const dynamic = "force-dynamic";

export async function GET() {
  await chat();
  return Response.json({ message: "Chatting with AI" });
}
