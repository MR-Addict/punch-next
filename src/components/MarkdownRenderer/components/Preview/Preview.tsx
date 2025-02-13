import { useEffect, useMemo, useRef, useState } from "react";

import style from "./Preview.module.css";

import CopyButton from "./components/CopyButton/CopyButton";

export default function Pre(props: React.ComponentProps<"pre">) {
  const preRef = useRef<HTMLPreElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [copied, setCopied] = useState(false);

  const content = useMemo(() => preRef.current?.innerText.replaceAll("\n\n", "\n") || "", [preRef.current]);

  useEffect(() => {
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <div ref={wrapperRef} className={style.wrapper}>
      <div className={style.btns}>
        <CopyButton text={content} />
      </div>

      <pre {...props} ref={preRef}>
        {props.children}
      </pre>
    </div>
  );
}
