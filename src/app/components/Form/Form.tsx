"use client";

import { useState } from "react";
import { FaRegUser, FaRegEdit, FaRegLightbulb } from "react-icons/fa";

import style from "./Form.module.css";
import { LoadingDots } from "@/components";
import { usePopupContext } from "@/contexts";

const defaultFormData = { group: "航模组", name: "", content: "" };

export default function Form() {
  const { popup } = usePopupContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(defaultFormData);

  const handleChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    fetch("/api/submit", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((result) => popup(result))
      .catch((error) => console.error(error))
      .finally(() => setIsSubmitting(false));
  }

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <h1 className='text-2xl font-semibold'>值班笔记</h1>

      <section className='w-full flex flex-col gap-3'>
        <div className={style["input-element"]}>
          <label className={style.label} htmlFor='submitFormGroup'>
            <FaRegLightbulb size={13} />
            <span>组别</span>
          </label>
          <select
            required
            name='group'
            id='submitFormGroup'
            value={formData.group}
            onChange={handleChange}
            className={style.input}
          >
            <option>航模组</option>
            <option>电子组</option>
            <option>编程组</option>
            <option>静模组</option>
          </select>
        </div>

        <div className={style["input-element"]}>
          <label className={style.label} htmlFor='submitFormName'>
            <FaRegUser size={13} />
            <span>姓名</span>
          </label>
          <input
            required
            type='text'
            name='name'
            id='submitFormName'
            placeholder='姓名'
            maxLength={10}
            value={formData.name}
            onChange={handleChange}
            className={style.input}
          />
        </div>

        <div className={style["input-element"]}>
          <label className={style.label} htmlFor='submitFormContent'>
            <FaRegEdit size={15} />
            <span>值班笔记</span>
          </label>
          <textarea
            required
            name='content'
            id='submitFormContent'
            minLength={4}
            maxLength={500}
            value={formData.content}
            onChange={handleChange}
            style={{ height: 200 }}
            className={style.input}
            placeholder='今天的值班笔记内容'
          />
        </div>
      </section>

      <button disabled={!formData.name || !formData.content || isSubmitting} type='submit' className={style.button}>
        {isSubmitting ? <LoadingDots /> : <span>提交</span>}
      </button>
    </form>
  );
}
