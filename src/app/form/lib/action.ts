"use server";

import env from "@/types/env/client";
import notes from "@/lib/mongodb/notes";
import getISOWeekNumber from "@/lib/utils/getISOWeekNumber";

import { revalidatePath } from "next/cache";

export default async function action(prev: any, formData: FormData) {
  // validate submit date
  const now = new Date();
  if (now < env.START_DATE || now > env.END_DATE) {
    return { success: false, message: "不在值班时间哦，不用提交值班笔记" };
  }

  // get form data
  const name = formData.get("name")?.toString().trim();
  const content = formData.get("content")?.toString().replaceAll("\r", "").trim();

  // validate form data
  if (!name || name.length < 2 || name.length > 10) return { success: false, message: "姓名长度应该在2-10位之间" };
  else if (!content || content.length < 4 || content.length > 1000)
    return { success: false, message: "值班笔记长度应该在10-1000位之间" };

  // insert into database
  const week = getISOWeekNumber(now) - getISOWeekNumber(env.FIRST_WEEK) + 1;
  const result = await notes.insert({ week, name, content });

  // revalidate and resonse result
  if (result.success) revalidatePath("/view", "page");
  return result;
}
