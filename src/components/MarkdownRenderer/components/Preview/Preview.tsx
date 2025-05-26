import { useMemo, useRef } from "react";

import style from "./Preview.module.css";

import CopyButton from "./components/CopyButton/CopyButton";

export default function Pre(props: React.ComponentProps<"pre">) {
  const preRef = useRef<HTMLPreElement>(null);

  const { text } = useMemo(() => {
    const text = preRef.current?.innerText.replaceAll("\n\n", "\n") || "";
    return { text };
  }, [preRef.current]);

  return (
    <div className={style.wrapper}>
      <div className={style.btns}>
        <CopyButton text={text} />
      </div>

      <pre {...props} ref={preRef}>
        {props.children}
      </pre>
    </div>
  );
}
