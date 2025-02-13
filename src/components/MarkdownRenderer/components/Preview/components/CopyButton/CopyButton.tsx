"use client";

import clsx from "clsx";
import { BiCheck } from "react-icons/bi";
import { VscCopy } from "react-icons/vsc";
import { useEffect, useState } from "react";

import style from "../../Preview.module.css";
import copyToClipboard from "@/lib/utils/copyToClipboard";

type Props = { text: string } & React.ComponentProps<"button">;

export default function CopyButton({ text, ...rest }: Props) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setCopied(false), 1000);
    return () => clearTimeout(timer);
  }, [copied]);

  function handleClick() {
    const success = copyToClipboard(text);
    if (success) setCopied(true);
  }

  return (
    <button
      {...rest}
      title="复制"
      type="button"
      disabled={copied}
      onClick={handleClick}
      className={clsx(style.btn, rest.className)}
    >
      {copied ? <BiCheck size={16} /> : <VscCopy size={16} />}
    </button>
  );
}
