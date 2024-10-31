import { z } from "zod";

import { ApiResultType } from "@/types/app";

export default async function addNoteApi(formData: FormData): Promise<ApiResultType> {
  const fallbackMessage = "提交失败";

  try {
    const res = await fetch("/api/notes", { method: "POST", body: formData }).then((res) => res.json());
    const parsed = z.object({ success: z.boolean() }).safeParse(res);

    if (!parsed.success) return { success: false, code: 400, message: res.message || fallbackMessage };
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, code: 500, message: fallbackMessage };
  }
}