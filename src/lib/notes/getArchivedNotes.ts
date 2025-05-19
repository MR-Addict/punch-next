import fs from "fs";
import { z } from "zod";

import getArchivedTerms from "./getArchivedTerms";
import { NoteDatabse, NoteDatabseType } from "@/types/notes";
import { ApiResultType, PaginatedResultType } from "@/types/app";

const keys = ["name", "content"] as const;

/**
 *
 * @param term 需要获取的归档内容的学期名称
 * @param page 归档第几页
 * @param pageSize 每页显示多少条归档内容
 * @param query 查询关键字
 * @returns 数据库类型的归档内容
 */
export default function getArchivedNotes(
  term: string,
  page: number,
  pageSize: number,
  query: string
): ApiResultType<PaginatedResultType<NoteDatabseType>> {
  const archivedNotesList = getArchivedTerms();
  const found = archivedNotesList.find((list) => list.name === term);
  if (!found) return { success: false, code: 404, message: "归档内容不存在" };

  const content = fs.readFileSync(found.path, "utf-8").trim();
  const parsedContent = z.array(NoteDatabse).safeParse(JSON.parse(content));
  if (!parsedContent.success) return { success: false, code: 500, message: "归档内容解析失败" };

  const filteredResults = parsedContent.data
    .filter((item) => keys.some((key) => item[key].toLowerCase().includes(query.toLowerCase())))
    .sort(({ date: a }, { date: b }) => new Date(b).getTime() - new Date(a).getTime());
  const paginatedResults = filteredResults.slice((page - 1) * pageSize, page * pageSize);

  const pagination = { page, pageSize, total: filteredResults.length };

  return { success: true, data: { data: paginatedResults, pagination } };
}
