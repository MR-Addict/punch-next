import fs from "fs";
import { z } from "zod";

import getArchivedNotesList from "./getArchivedTerms";
import { ApiResultType, PaginationType } from "@/types/app";
import { NoteDatabse, NoteDatabseType } from "@/types/notes";

type ReturnDataType = { data: NoteDatabseType[]; pagination: PaginationType };

const keys = ["name", "content"] as const;

export default function getArchivedNotes(
  index: number,
  page: number,
  pageSize: number,
  query: string
): ApiResultType<ReturnDataType> {
  const archivedNotesList = getArchivedNotesList();
  if (index >= archivedNotesList.length) return { success: false, code: 404, message: "归档内容不存在" };

  const content = fs.readFileSync(archivedNotesList[index].path, "utf-8").trim();
  const parsedContent = z.array(NoteDatabse).safeParse(JSON.parse(content));
  if (!parsedContent.success) return { success: false, code: 500, message: "归档内容解析失败" };

  const pagination = { page, pageSize, total: parsedContent.data.length };
  const data = parsedContent.data
    .filter((item) => keys.some((key) => item[key].toLowerCase().includes(query.toLowerCase())))
    .sort(({ date: a }, { date: b }) => new Date(b).getTime() - new Date(a).getTime())
    .slice((page - 1) * pageSize, page * pageSize);
  return { success: true, code: 200, message: "获取成功", data: { data, pagination } };
}
