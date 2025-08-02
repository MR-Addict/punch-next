import { PublicEnv } from "@/types/env";

import notes from "@/lib/mongodb/notes";
import getAllTerms from "@/lib/notes/getAllTerms";
import getISOWeekNumber from "@/lib/utils/getISOWeekNumber";
import getArchivedNotes from "@/lib/notes/getArchivedNotes";

export async function GET(request: Request) {
  const termsLists = getAllTerms();
  const env = PublicEnv.parse(process.env);

  const searchParams = new URL(request.url).searchParams;
  const term = searchParams.get("term") || env.CURRENT_TERM;
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = Math.min(Math.max(parseInt(searchParams.get("pageSize") || "20"), 1), 100);
  const query = searchParams.get("query") || "";

  const termFound = termsLists.find((t) => t === term);
  if (!termFound) return Response.json({ success: false, message: "请求的学期不存在" }, { status: 404 });

  // Qury from archived notes
  let res = getArchivedNotes(term, page, pageSize, query);
  // If the term is current term, query from the database
  if (term === env.CURRENT_TERM) res = await notes.query(page, pageSize, query);

  return Response.json(res, { status: res.success ? 200 : res.code });
}

export async function POST(request: Request) {
  const env = PublicEnv.parse(process.env);

  // validate submit date
  const now = new Date();
  if (now < env.START_DATE || now > env.END_DATE) {
    return Response.json({ success: false, message: "不在值班时间，不用提交值班笔记" }, { status: 400 });
  }

  // get form data
  let formData = new FormData();
  try {
    formData = await request.formData();
  } catch (err) {
    return Response.json({ success: false, message: "表单数据解析错误" }, { status: 400 });
  }

  const name = formData.get("name")?.toString().trim();
  const content = formData.get("content")?.toString().trim();
  const useMarkdown = formData.get("useMarkdown")?.toString().trim() === "on";

  // validate form data
  if (!name || name.length < 2 || name.length > 10) {
    return Response.json({ success: false, message: "姓名长度应该在2-10位之间" }, { status: 400 });
  } else if (!content || content.length < 4 || content.length > 1000) {
    return Response.json({ success: false, message: "值班笔记长度应该在10-1000位之间" }, { status: 400 });
  }

  // insert into database
  const week = getISOWeekNumber(now) - getISOWeekNumber(env.FIRST_WEEK) + 1;
  const result = await notes.insert({ week, name, useMarkdown, content });

  return Response.json(result);
}
