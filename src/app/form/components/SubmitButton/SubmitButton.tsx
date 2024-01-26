"use client";

import style from "../style.module.css";
import LoadingDots from "@/components/LoadingDots/LoadingDots";

export default function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <button type="submit" className={style["submit-btn"]} disabled={pending}>
      {pending ? <LoadingDots /> : <span>提交</span>}
    </button>
  );
}
