import { BiHide, BiCheck } from "react-icons/bi";
import { TbArrowBigDownLines } from "react-icons/tb";
import { VscOpenPreview, VscCopy } from "react-icons/vsc";

import { useEffect, useRef, useState } from "react";

import style from "./Preview.module.css";
import copyToClipboard from "@/lib/utils/copyToClipboard";

import MarkdownRenderer from "@/components/MarkdownRenderer/MarkdownRenderer";

export default function Pre(props: React.ComponentProps<"pre">) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [copied, setCopied] = useState(false);
  const [codeblock, setCodeblock] = useState("");

  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean | null>(null);

  function handleTogglePreview() {
    setIsPreviewOpen((prev) => !prev);
  }

  function handleCopy() {
    const success = copyToClipboard(codeblock);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  useEffect(() => {
    const pre = wrapperRef.current?.querySelector("pre");
    const codeblock = pre?.textContent?.trim() ?? "";
    setCodeblock(codeblock);

    const markdownClasses = ["language-md", "language-markdown"];
    const isMarkdown = markdownClasses.some((cls) => pre?.classList.contains(cls));
    setIsPreviewOpen(isMarkdown ? false : null);
  }, [wrapperRef.current]);

  return (
    <div ref={wrapperRef} className={style.wrapper}>
      <div className={style.btns}>
        {isPreviewOpen !== null && (
          <button title="预览" type="button" className={style.btn} onClick={handleTogglePreview}>
            {isPreviewOpen ? <BiHide /> : <VscOpenPreview />}
          </button>
        )}

        <button title="复制" type="button" disabled={copied} onClick={handleCopy} className={style.btn}>
          {copied ? <BiCheck /> : <VscCopy />}
        </button>
      </div>

      <div className={style["code-wrapper"]}>
        <pre {...props}>{props.children}</pre>

        {isPreviewOpen && (
          <MarkdownRenderer content={codeblock} className={style.preview} options={{ components: { pre: null } }} />
        )}
      </div>
    </div>
  );
}
