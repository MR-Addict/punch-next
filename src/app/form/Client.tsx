"use client";

import { Form } from "./components";
import { Message } from "@/components";

export default function Client({ start, end }: { start: Date; end: Date }) {
  const now = new Date();

  if (now < start) return <Message message="本学期值班还没开始哦，不用写值班笔记" icon="calendar" />;
  if (now > end) return <Message message="本学期值班已经结束咯，不用写值班笔记啦" icon="reading" />;

  return <Form />;
}
