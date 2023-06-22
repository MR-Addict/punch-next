import { revalidatePath } from "next/cache";

import env from "@/types/env/client";
import { Note } from "@/types/notes";
import { notes } from "@/lib/mongodb";

export async function POST(request: Request) {
  const now = new Date();
  if (now < env.START_DATE || now > env.END_DATE) {
    return new Response(JSON.stringify({ success: false, message: "不在值班时间哦，不用提交值班笔记" }), {
      headers: { "Content-Type": "application/json" },
      status: 400
    });
  }

  const body = await request.json();
  const parsedResult = Note.safeParse(body);
  if (!parsedResult.success)
    return new Response(JSON.stringify({ success: false, message: "提交失败，表单存在不合法项目" }), {
      headers: { "Content-Type": "application/json" },
      status: 400
    });

  const result = await notes.insert(parsedResult.data);
  if (result.success) revalidatePath("/view");
  return new Response(JSON.stringify(result), {
    headers: { "Content-Type": "application/json" },
    status: result.success ? 201 : 500
  });
}
