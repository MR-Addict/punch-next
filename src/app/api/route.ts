import env from "@/types/env/client";
import notes from "@/lib/mongodb/notes";
import getISOWeekNumber from "@/lib/utils/getISOWeekNumber";
import { revalidatePath } from "next/cache";
import { NoteWithoutWeek } from "@/types/notes";

export async function POST(request: Request) {
  const now = new Date();
  if (now < env.START_DATE || now > env.END_DATE) {
    return new Response(JSON.stringify({ success: false, message: "不在值班时间哦，不用提交值班笔记" }), {
      headers: { "Content-Type": "application/json" },
      status: 400
    });
  }

  const body = await request.json();
  const parsedResult = NoteWithoutWeek.safeParse(body);
  if (!parsedResult.success) {
    return new Response(JSON.stringify({ success: false, message: "提交失败，表单内容不合法" }), {
      headers: { "Content-Type": "application/json" },
      status: 400
    });
  }

  const week = getISOWeekNumber(now) - getISOWeekNumber(env.FIRST_WEEK) + 1;
  const result = await notes.insert({ week, ...parsedResult.data });
  if (result.success) revalidatePath("/", "layout");
  return new Response(JSON.stringify(result), {
    headers: { "Content-Type": "application/json" },
    status: result.success ? 201 : 500
  });
}
