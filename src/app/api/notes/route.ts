import { PublicEnv } from "@/types/env";
import notes from "@/lib/mongodb/notes";
import getISOWeekNumber from "@/lib/utils/getISOWeekNumber";
import getArchivedNotes from "@/lib/notes/getArchivedNotes";

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const query = searchParams.get("query") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "20");
  const termIndex = parseInt(searchParams.get("termIndex") || "0");

  if (termIndex > 0) {
    const res = getArchivedNotes(termIndex - 1, page, pageSize, query);
    return new Response(JSON.stringify(res), { headers: { "content-type": "application/json" }, status: res.code });
  }

  const result = await notes.query(page, pageSize, query);
  return new Response(JSON.stringify(result), { headers: { "content-type": "application/json" }, status: result.code });
}

export async function POST(request: Request) {
  const env = PublicEnv.parse(process.env);

  // validate submit date
  const now = new Date();
  if (now < env.START_DATE || now > env.END_DATE) {
    return new Response(JSON.stringify({ success: false, message: "不在值班时间，不用提交值班笔记" }), {
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
  const useMarkdown = formData.get("useMarkdown")?.toString().trim() === "true";

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
  const result = await notes.insert({ week, name, useMarkdown, content });

  return Response.json(result);
}
