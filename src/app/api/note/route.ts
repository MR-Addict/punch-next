import { PublicEnv } from "@/types/env";
import notes from "@/lib/mongodb/notes";
import getISOWeekNumber from "@/lib/utils/getISOWeekNumber";

import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  const env = PublicEnv.parse(process.env);

  // validate submit date
  const now = new Date();
  if (now < env.START_DATE || now > env.END_DATE) {
    return new Response(JSON.stringify({ success: false, message: "不在值班时间哦，不用提交值班笔记" }), {
      headers: { "content-type": "application/json" },
      status: 400
    });
  }

  // get form data
  let formData = new FormData();
  try {
    formData = await request.formData();
  } catch (err) {
    return new Response(JSON.stringify({ success: false, message: "表单数据解析错误" }), {
      headers: { "content-type": "application/json" },
      status: 400
    });
  }
  const name = formData.get("name")?.toString().trim();
  const content = formData.get("content")?.toString().trim();

  // validate form data
  if (!name || name.length < 2 || name.length > 10) {
    return new Response(JSON.stringify({ success: false, message: "姓名长度应该在2-10位之间" }), {
      headers: { "content-type": "application/json" },
      status: 400
    });
  } else if (!content || content.length < 4 || content.length > 1000) {
    return new Response(JSON.stringify({ success: false, message: "值班笔记长度应该在10-1000位之间" }), {
      headers: { "content-type": "application/json" },
      status: 400
    });
  }

  // insert into database
  const week = getISOWeekNumber(now) - getISOWeekNumber(env.FIRST_WEEK) + 1;
  const result = await notes.insert({ week, name, content });

  // revalidate and resonse result
  if (result.success) revalidatePath("/view", "page");

  return Response.json(result);
}
