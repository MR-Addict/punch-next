"use client";

import { useFormStatus } from "react-dom";

import style from "../style.module.css";
import LoadingDots from "@/components/LoadingDots/LoadingDots";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className={style.btn} disabled={pending}>
      {pending ? <LoadingDots /> : <span>提交</span>}
    </button>
  );
}
