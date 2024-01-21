"use client";

import Link from "next/link";
import Confetti from "react-confetti";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FaRegUser, FaRegEdit } from "react-icons/fa";

import style from "../style.module.css";
import action from "../../lib/action";
import formatDate from "@/lib/utils/formatDate";
import { usePopupContext } from "@/contexts/Popup/PopupProvider";

import Message from "@/components/Message/Message";
import SubmitButton from "../SubmitButton/SubmitButton";

const storageName = "user";
const cookieName = "last_submit";

export default function Form() {
  const router = useRouter();
  const { popup } = usePopupContext();
  const [formActionState, formAction] = useFormState(action, null);

  const [formData, setFormData] = useState({ name: "", content: "" });
  const [status, setStatus] = useState<null | "idle" | "done" | "duplicated">(null);

  const handleChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // handle submit result
  useEffect(() => {
    if (!formActionState) return;

    const { success, message } = formActionState;
    if (success) {
      localStorage.setItem(storageName, JSON.stringify({ name: formData.name }));
      document.cookie = `${cookieName}=${new Date().toISOString()};max-age=${60 * 60 * 24};path=/;`;
      setStatus("done");
      router.refresh();
    } else {
      console.error(message);
      popup({ success: false, message: message });
    }
  }, [formActionState]);

  useEffect(() => {
    // parse user submit info
    const localUserInfo = localStorage.getItem(storageName);
    if (localUserInfo) setFormData({ ...formData, ...JSON.parse(localUserInfo) });

    // get last submit time
    const lastSubmit = document.cookie.match(new RegExp("\\b" + cookieName + "\\b=([^;]*)"))?.at(1);
    if (lastSubmit && formatDate(new Date()) === formatDate(lastSubmit)) setStatus("duplicated");
    else setStatus("idle");
  }, []);

  if (!status) return <></>;
  else if (status !== "idle") {
    return (
      <div className="flex flex-col items-center gap-3">
        {status === "done" && (
          <>
            <Confetti recycle={false} />
            <Message message="恭喜，笔记提交成功" icon="success" />
          </>
        )}
        {status === "duplicated" && <Message message="你今天已经提交过啦" icon="forbidden" />}
        <Link href="/view" className={style.link}>
          去看笔记 👉
        </Link>
      </div>
    );
  } else {
    return (
      <form className={style.form} action={formAction}>
        <header className="w-full space-y-2">
          <h1 className="text-2xl font-semibold border-b-4 border-b-black w-fit">值班笔记</h1>
          <p className="text-gray-500 border-b border-b-gray-300 italic">在无聊的时间里就从事学习</p>
        </header>

        <div className="w-full flex flex-col gap-3">
          <section className={style["input-element"]}>
            <label className={style.label} htmlFor="submitFormName">
              <FaRegUser size={13} />
              <span>姓名</span>
            </label>
            <input
              required
              type="text"
              name="name"
              id="submitFormName"
              placeholder="姓名"
              maxLength={10}
              value={formData.name}
              onChange={handleChange}
              className={style.input}
            />
          </section>

          <section className={style["input-element"]}>
            <label className={style.label} htmlFor="submitFormContent">
              <FaRegEdit size={15} />
              <span>值班笔记</span>
            </label>
            <textarea
              required
              name="content"
              id="submitFormContent"
              minLength={4}
              maxLength={500}
              value={formData.content}
              onChange={handleChange}
              style={{ height: 170 }}
              className={style.input}
              placeholder="写写今天都发生了什么"
            />
          </section>
        </div>

        <SubmitButton />
      </form>
    );
  }
}
