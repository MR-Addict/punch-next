import fs from "fs";
import { z } from "zod";

import getArchivedNotesList from "./getArchivedTerms";
import { NoteDatabse, NoteDatabseType } from "@/types/notes";
import { ApiResultType, PaginatedResultType } from "@/types/app";

const keys = ["name", "content"] as const;

export default function getArchivedNotes(
  index: number,
  page: number,
  pageSize: number,
  query: string
): ApiResultType<PaginatedResultType<NoteDatabseType>> {
  const archivedNotesList = getArchivedNotesList();
  if (index >= archivedNotesList.length) return { success: false, code: 404, message: "归档内容不存在" };

  const content = fs.readFileSync(archivedNotesList[index].path, "utf-8").trim();
  const parsedContent = z.array(NoteDatabse).safeParse(JSON.parse(content));
  if (!parsedContent.success) return { success: false, code: 500, message: "归档内容解析失败" };

  const filteredResults = parsedContent.data
    .filter((item) => keys.some((key) => item[key].toLowerCase().includes(query.toLowerCase())))
    .sort(({ date: a }, { date: b }) => new Date(b).getTime() - new Date(a).getTime());
  const paginatedResults = filteredResults.slice((page - 1) * pageSize, page * pageSize);

  const pagination = { page, pageSize, total: filteredResults.length };

  return { success: true, data: { data: paginatedResults, pagination } };
}
