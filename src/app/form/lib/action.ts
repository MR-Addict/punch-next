"use server";

import env from "@/types/env/client";
import notes from "@/lib/mongodb/notes";
import getISOWeekNumber from "@/lib/utils/getISOWeekNumber";

import { revalidatePath } from "next/cache";
import { NoteWithoutWeek } from "@/types/notes";

export default async function action(prev: any, formData: FormData) {
  // validate submit date
  const now = new Date();
  if (now < env.START_DATE || now > env.END_DATE) {
    return { success: false, message: "不在值班时间哦，不用提交值班笔记" };
  }

  // get form data
  const name = formData.get("name")?.toString();
  const content = formData.get("content")?.toString();

  // validate form data
  const parsedResult = NoteWithoutWeek.safeParse({ name, content });
  if (!parsedResult.success) {
    return { success: false, message: "提交失败，表单内容不合法" };
  }

  // insert into database
  const week = getISOWeekNumber(now) - getISOWeekNumber(env.FIRST_WEEK) + 1;
  const result = await notes.insert({ week, ...parsedResult.data });

  // revalidate and resonse result
  if (result.success) revalidatePath("/view", "page");
  return result;
}
