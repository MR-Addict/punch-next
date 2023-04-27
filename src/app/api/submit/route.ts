import { punch } from "@/lib/mongodb";
import { Punch } from "@/types/punch";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = Punch.parse(body);
    const result = await punch.insert(data);

    return new Response(JSON.stringify(result), {
      headers: { "Content-Type": "application/json" },
      status: result.success ? 201 : 500,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false, message: "提交失败" }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    });
  }
}
