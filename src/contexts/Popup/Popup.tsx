"use client";

import clsx from "clsx";
import { MdCheckCircleOutline, MdErrorOutline } from "react-icons/md";

import style from "./Popup.module.css";

interface Props {
  active: boolean;
  data: { success: boolean; message: string };
}

export default function Popup({ data, active }: Props) {
  return (
    <section aria-label="popup window" className={clsx(style.popupwindow, { [style.active]: active })}>
      <div className={clsx(style.popupbody, { [style.success]: data.success })}>
        {data.success ? <MdCheckCircleOutline size={25} /> : <MdErrorOutline size={25} />}
        <p>{data.message}</p>
      </div>
    </section>
  );
}
