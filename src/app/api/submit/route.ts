import { punch } from "@/lib/mongodb";
import { PunchPost } from "@/types/punch";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = PunchPost.parse(body);
    const success = await punch.insert(data);

    return new Response(JSON.stringify({ success }), {
      headers: { "Content-Type": "application/json" },
      status: success ? 201 : 500,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    });
  }
}
