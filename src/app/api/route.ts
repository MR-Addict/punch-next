import { revalidatePath } from "next/cache";

import { Note } from "@/types/notes";
import { notes } from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsedResult = Note.safeParse(body);
    if (!parsedResult.success)
      return new Response(JSON.stringify({ success: false, message: "提交失败" }), {
        headers: { "Content-Type": "application/json" },
        status: 400
      });

    const result = await notes.insert(parsedResult.data);
    if (result.success) revalidatePath("/view");
    return new Response(JSON.stringify(result), {
      headers: { "Content-Type": "application/json" },
      status: result.success ? 201 : 500
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false, message: "提交失败" }), {
      headers: { "Content-Type": "application/json" },
      status: 400
    });
  }
}
