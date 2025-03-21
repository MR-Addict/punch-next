import { fileExists, readJSONFromFile } from "@/lib/analyze/utils/fs";

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const term = searchParams.get("term");

  if (!term) {
    return Response.json({ success: false, message: "请求的学期名称不能为空" }, { status: 400 });
  }

  if (!fileExists(`${term}.json`)) {
    return Response.json({ success: false, message: `没有${term}的笔记分析` }, { status: 404 });
  }

  const data = await readJSONFromFile(`${term}.json`);
  return Response.json({ success: true, data }, { status: 200 });
}
