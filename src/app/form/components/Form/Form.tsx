"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FaRegUser, FaRegEdit, FaRegLightbulb } from "react-icons/fa";

import style from "./Form.module.css";
import { formatDate } from "@/lib/utils";
import { LoadingDots, Message } from "@/components";
import { useGlobalContext, usePopupContext } from "@/contexts";

const storageName = "user-submit-info";
const defaultFormData = { name: "", group: "", content: "" };

export default function Form() {
  const router = useRouter();
  const { popup } = usePopupContext();
  const { status, setStatus } = useGlobalContext();

  const [pending, setPending] = useState(false);
  const [formData, setFormData] = useState(defaultFormData);

  const handleChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);

    fetch("/api", {
      method: "POST",
      body: JSON.stringify({ ...formData, content: formData.content.trim() }),
      headers: { "Content-Type": "application/json" }
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          router.refresh();
          setStatus("done");
          document.cookie = `last_submit=${new Date()};max-age=86400;path=/;`;
          localStorage.setItem(storageName, JSON.stringify({ name: formData.name, group: formData.group }));
        } else console.error(result.message);
      })
      .catch((error) => {
        console.error(error);
        popup({ success: false, message: "提交失败，未知错误" });
      })
      .finally(() => setPending(false));
  }

  useEffect(() => {
    // parse user submit info
    const localUserInfo = localStorage.getItem(storageName);
    if (localUserInfo) setFormData({ ...formData, ...JSON.parse(localUserInfo) });

    // get last submit time
    const lastSubmit = document.cookie.match(/\blast_submit\b=([^;]*)/)?.at(1);
    if (lastSubmit && formatDate(new Date()) === formatDate(lastSubmit)) setStatus("duplicated");
  }, []);

  if (status !== "idle") {
    return (
      <div className="flex flex-col items-center gap-3">
        {status === "done" && <Message message="恭喜，笔记提交成功" icon="success" />}
        {status === "duplicated" && <Message message="你今天已经提交过啦" icon="forbidden" />}
        <Link href="/view" className={style.link}>
          去看笔记
        </Link>
      </div>
    );
  }

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <h1 className="text-2xl font-semibold">值班笔记</h1>

      <div className="w-full flex flex-col gap-3">
        <section className={style["input-element"]}>
          <label className={style.label} htmlFor="submitFormGroup">
            <FaRegLightbulb size={13} />
            <span>组别</span>
          </label>
          <select
            required
            name="group"
            id="submitFormGroup"
            value={formData.group}
            onChange={handleChange}
            className={style.input}
          >
            <option disabled value="">
              -- 请选择组别 --
            </option>
            <option value="航模组">航模组</option>
            <option value="编程组">编程组</option>
            <option value="电子组">电子组</option>
            <option value="静模组">静模组</option>
          </select>
        </section>

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
            placeholder="今天的值班笔记内容"
          />
        </section>
      </div>

      <button
        type="submit"
        className={style.button}
        disabled={!formData.group || !formData.name || !formData.content || pending}
      >
        {pending ? <LoadingDots /> : <span>提交</span>}
      </button>
    </form>
  );
}
