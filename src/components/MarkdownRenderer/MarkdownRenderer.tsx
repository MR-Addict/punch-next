"use client";

import clsx from "clsx";
import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";
import rehypePrism from "rehype-prism-plus";

import "./styles/markdown.css";
import "./styles/prism-atom-dark.css";
import "./styles/prism-line-number.css";

import Img from "./components/Img/Img";
import Pre from "./components/Preview/Preview";
import Anchor from "./components/Anchor/Anchor";

export default function MarkdownRenderer({ content, className }: { content: string; className?: string }) {
  return (
    <div className={clsx("markdown", className)}>
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{ a: Anchor, img: Img, pre: Pre }}
        rehypePlugins={[[rehypePrism, { ignoreMissing: true }]]}
      >
        {content}
      </Markdown>
    </div>
  );
}
