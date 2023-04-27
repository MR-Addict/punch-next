"use client";

import classNames from "classnames";
import { BsCheckCircle } from "react-icons/bs";
import { MdErrorOutline } from "react-icons/md";

import style from "./Popup.module.css";

interface Props {
  isPopup: boolean;
  popupData: { success: boolean; message: string };
}

export default function Popup({ popupData, isPopup }: Props) {
  return (
    <section aria-label='popup window' className={classNames(style.popupwindow, isPopup ? style.active : "")}>
      <div className={classNames(style.popupbody, popupData.success ? style.active : "")}>
        <div>{popupData.success ? <BsCheckCircle size={30} /> : <MdErrorOutline size={30} />}</div>
        <p>{popupData.message}</p>
      </div>
    </section>
  );
}
