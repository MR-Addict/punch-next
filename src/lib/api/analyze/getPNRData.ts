import { z } from "zod";

import { ApiResultType } from "@/types/app";

export default async function getPNRData(term?: string): Promise<ApiResultType<Record<string, string[]>>> {
  const fallbackMessage = "获取失败";

  try {
    let path = "/api/analyze";
    if (term) path += `?term=${term}`;
    const res = await fetch(path).then((res) => res.json());

    const parsed = z.record(z.string(), z.array(z.string())).safeParse(res.data?.pns);
    if (!parsed.success) return { success: false, message: res.message || fallbackMessage, code: res.code || 500 };
    return { success: true, data: parsed.data };
  } catch (err) {
    console.error(err);
    return { success: false, code: 500, message: fallbackMessage };
  }
}
