"use client";

import clsx from "clsx";
import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";
import rehypePrism from "rehype-prism-plus";

import "./styles/markdown.css";
import "./styles/prism-atom-dark.css";
import "./styles/prism-line-number.css";

import Pre from "./components/Preview/Preview";
import Anchor from "./components/Anchor/Anchor";

export default function MarkdownRenderer({ content, className }: { content: string; className?: string }) {
  const components = content.startsWith("STOP_PRE") ? { a: Anchor } : { a: Anchor, pre: Pre };

  return (
    <Markdown
      components={components}
      remarkPlugins={[remarkGfm]}
      className={clsx("markdown", className)}
      rehypePlugins={[[rehypePrism, { ignoreMissing: true }]]}
    >
      {content.replace(/^STOP_PRE/, "")}
    </Markdown>
  );
}
