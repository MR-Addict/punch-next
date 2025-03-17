import { chatObject, chatText, chatTool } from "@/lib/ai/chat";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  let formData: FormData = new FormData();

  try {
    formData = await req.formData();
  } catch (err) {}

  const text = formData.get("text") as string;
  if (!text) {
    return new Response("No text provided", { status: 400 });
  }

  const res = await chatObject(text);
  return Response.json(res);
}
