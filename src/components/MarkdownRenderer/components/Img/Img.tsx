import clsx from "clsx";
import { useState } from "react";
import { GrView } from "react-icons/gr";

import style from "./Img.module.css";

export default function Img(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" className={style.wrapper}>
        <div>
          <GrView size={20} />
        </div>
        <img {...props} onClick={() => setOpen(true)} />
      </button>

      <button type="button" className={clsx(style.preview, { [style.active]: open })} onClick={() => setOpen(false)}>
        <img {...props} />
      </button>
    </>
  );
}
