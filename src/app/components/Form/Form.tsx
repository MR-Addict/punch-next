"use client";

import { useState } from "react";
import { FaUserAlt, FaEdit, FaFire } from "react-icons/fa";

import style from "./Form.module.css";
import { LoadingDots } from "@/components";

const defaultFormData = { group: "航模组", name: "", notes: "" };

export default function Form() {
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
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.error(error))
      .finally(() => setIsSubmitting(false));
  }

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <h1 className='text-2xl font-semibold'>值班笔记</h1>

      <section className='w-full flex flex-col gap-3'>
        <div className={style["input-element"]}>
          <label className={style.label}>
            <FaFire size={13} />
            <span>组别</span>
          </label>
          <select className={style.input} name='group' required value={formData.group} onChange={handleChange}>
            <option>航模组</option>
            <option>电子组</option>
            <option>编程组</option>
            <option>静模组</option>
          </select>
        </div>

        <div className={style["input-element"]}>
          <label className={style.label}>
            <FaUserAlt size={13} />
            <span>姓名</span>
          </label>
          <input
            type='text'
            required
            placeholder='姓名'
            name='name'
            maxLength={10}
            value={formData.name}
            onChange={handleChange}
            className={style.input}
          />
        </div>

        <div className={style["input-element"]}>
          <label className={style.label}>
            <FaEdit size={15} />
            <span>值班笔记</span>
          </label>
          <textarea
            required
            name='notes'
            minLength={4}
            maxLength={500}
            value={formData.notes}
            onChange={handleChange}
            style={{ height: 200 }}
            className={style.input}
            placeholder='今天的值班笔记内容'
          />
        </div>
      </section>

      <button disabled={!formData.name || !formData.notes || isSubmitting} type='submit' className={style.button}>
        {isSubmitting ? <LoadingDots /> : <span>提交</span>}
      </button>
    </form>
  );
}
