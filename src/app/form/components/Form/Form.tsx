"use client";

import clsx from "clsx";
import Link from "next/link";
import Confetti from "react-confetti";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { LiaMarkdown } from "react-icons/lia";
import { MdOutlineFullscreen } from "react-icons/md";
import { FaRegUser, FaRegEdit } from "react-icons/fa";

import action from "../../lib/action";
import style from "../style.module.css";
import formatDate from "@/lib/utils/formatDate";
import { usePopupContext } from "@/contexts/Popup/PopupProvider";

import Message from "@/components/Message/Message";
import SubmitButton from "../SubmitButton/SubmitButton";
import MarkdownEditor from "@/components/MarkdownEditor/MarkdownEditor";

const storageName = "punch-username";
const cookieName = "punch-last-submit-date";

export default function Form() {
  const router = useRouter();
  const { popup } = usePopupContext();
  const [formActionState, formAction] = useFormState(action, null);

  const [fullscreen, setFullscreen] = useState(false);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<null | "idle" | "done" | "duplicated">(null);

  // handle submit result
  useEffect(() => {
    if (!formActionState) return;

    const { success, message } = formActionState;
    if (success) {
      localStorage.setItem(storageName, name);
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
    const localUsername = localStorage.getItem(storageName);
    if (localUsername) setName(localUsername);

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
        <MarkdownEditor
          content={content}
          fullscreen={fullscreen}
          setContent={setContent}
          setFullscreen={setFullscreen}
        />

        <header className="w-full space-y-2">
          <h1 className="text-2xl font-semibold border-b-4 border-b-black w-fit">值班笔记</h1>
          <p className="text-gray-500 border-b border-b-gray-300 italic">"在无聊的时间里就从事学习"</p>
        </header>

        <div className="w-full flex flex-col gap-3">
          <section className={style["input-element"]}>
            <label className={style.label} htmlFor="submitFormName">
              <FaRegUser size={13} />
              <span>姓名</span>
            </label>
            <input
              autoFocus={name.length === 0}
              required
              type="text"
              name="name"
              id="submitFormName"
              placeholder="姓名"
              minLength={2}
              maxLength={10}
              value={name}
              className={style.input}
              onChange={(e) => setName(e.target.value)}
            />
          </section>

          <section className={style["input-element"]}>
            <label className={style.label} htmlFor="submitFormContent">
              <FaRegEdit size={15} />
              <span>值班笔记</span>
            </label>

            <div className={style.input}>
              <textarea
                required
                maxLength={1000}
                name="content"
                id="submitFormContent"
                placeholder="写写今天都发生了什么"
                value={content}
                style={{ height: 170 }}
                autoFocus={name.length > 0}
                className="peer w-full h-full resize-none outline-none"
                onChange={(e) => setContent(e.target.value)}
              />

              <div className="flex flex-row items-center justify-between">
                <p className="text-gray-600 text-xs text-right">{`${content.length}/1000`}</p>
                <button
                  type="button"
                  aria-label="fullscreen"
                  onClick={() => setFullscreen(true)}
                  className={clsx(style["fullscreen-btn"], { [style.active]: content.length > 0 })}
                >
                  <MdOutlineFullscreen size={20} />
                </button>
              </div>
            </div>

            <a
              target="_blank"
              href="https://www.markdownguide.org"
              className="w-fit flex flex-row items-center gap-0.5 text-xs text-gray-700 hover:text-black"
            >
              <LiaMarkdown size={17} />
              <span>Markdwn supported.</span>
            </a>
          </section>
        </div>

        <SubmitButton />
      </form>
    );
  }
}
