"use client";

import Form from "./components/Form/Form";
import Message from "@/components/Message/Message";
import { useAppContext } from "@/contexts/App/AppProvider";

export default function Client() {
  const { env } = useAppContext();

  if (env === null) return <></>;

  if (new Date() < env.START_DATE) return <Message message="本学期值班还没开始哦，不用写值班笔记" icon="calendar" />;
  if (new Date() > env.END_DATE) return <Message message="本学期值班已经结束咯，不用写值班笔记啦" icon="reading" />;

  return <Form />;
}
