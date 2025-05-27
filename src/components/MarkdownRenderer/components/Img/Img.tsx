import clsx from "clsx";
import { useState } from "react";
import { createPortal } from "react-dom";
import { GrView } from "react-icons/gr";

import style from "./Img.module.css";
import useLoaded from "@/hooks/useLoaded";

export default function Img(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [open, setOpen] = useState(false);

  const loaded = useLoaded();

  return (
    <>
      <div className={style.wrapper}>
        <div>
          <GrView size={20} />
        </div>
        <img {...props} onClick={() => setOpen(true)} />
      </div>

      {loaded &&
        createPortal(
          <button
            type="button"
            className={clsx(style.preview, { [style.active]: open })}
            onClick={() => setOpen(false)}
          >
            <img {...props} />
          </button>,
          document.body
        )}
    </>
  );
}
