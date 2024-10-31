import { z } from "zod";

import { NoteDatabse, NoteDatabseType } from "@/types/notes";
import { ApiResultType, Pagination, PaginationType } from "@/types/app";

type ReturnDataType = { data: NoteDatabseType[]; pagination: PaginationType };

export default async function getNotesApi(
  page: number,
  pageSize: number,
  termIndex: number,
  query: string
): Promise<ApiResultType<ReturnDataType>> {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  params.append("pageSize", pageSize.toString());
  params.append("termIndex", termIndex.toString());
  params.append("query", query);

  const url = `/api/notes?${params.toString()}`;
  const fallbackMessage = "获取失败";

  try {
    const res = await fetch(url).then((res) => res.json());
    const parsed = z.object({ data: z.array(NoteDatabse), pagination: Pagination }).safeParse(res.data);
    if (!parsed.success) return { success: false, message: res.message || fallbackMessage, code: res.code || 500 };
    return { success: true, data: parsed.data };
  } catch (err) {
    console.error(err);
    return { success: false, code: 500, message: fallbackMessage };
  }
}
