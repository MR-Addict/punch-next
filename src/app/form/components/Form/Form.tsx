"use client";

import { useState, useEffect } from "react";
import { FaRegUser, FaRegEdit, FaRegLightbulb } from "react-icons/fa";

import style from "./Form.module.css";
import { LoadingDots } from "@/components";
import { usePopupContext } from "@/contexts";

const storageName = "user-submit-info";
const defaultFormData = { group: "", name: "", content: "" };

export default function Form() {
  const { popup } = usePopupContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(defaultFormData);

  const handleChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    fetch("/api", {
      method: "POST",
      body: JSON.stringify({ ...formData, content: formData.content.trim() }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((result) => {
        popup(result);
        if (result.success) {
          setFormData({ ...formData, content: "" });
          localStorage.setItem(storageName, JSON.stringify({ name: formData.name, group: formData.group }));
        } else console.error(result.message);
      })
      .catch((error) => {
        console.error(error);
        popup({ success: false, message: "提交失败" });
      })
      .finally(() => setIsSubmitting(false));
  }

  useEffect(() => {
    const localUserInfo = localStorage.getItem(storageName);
    if (localUserInfo) {
      const parsedUserInfo = JSON.parse(localUserInfo);
      setFormData({ ...formData, ...parsedUserInfo });
    }
  }, []);

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
            style={{ height: 200 }}
            className={style.input}
            placeholder="今天的值班笔记内容"
          />
        </section>
      </div>

      <button
        type="submit"
        className={style.button}
        disabled={!formData.group || !formData.name || !formData.content || isSubmitting}
      >
        {isSubmitting ? <LoadingDots /> : <span>提交</span>}
      </button>
    </form>
  );
}
