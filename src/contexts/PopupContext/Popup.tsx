"use client";

import classNames from "classnames";
import { MdCheckCircleOutline, MdErrorOutline } from "react-icons/md";

import style from "./Popup.module.css";

interface Props {
  isPopup: boolean;
  popupData: { success: boolean; message: string };
}

export default function Popup({ popupData, isPopup }: Props) {
  return (
    <section aria-label="popup window" className={classNames(style.popupwindow, isPopup ? style.active : "")}>
      <div className={classNames(style.popupbody, popupData.success ? style.success : "")}>
        {popupData.success ? <MdCheckCircleOutline size={25} /> : <MdErrorOutline size={25} />}
        <p>{popupData.message}</p>
      </div>
    </section>
  );
}
