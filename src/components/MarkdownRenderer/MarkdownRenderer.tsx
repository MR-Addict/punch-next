"use client";

import clsx from "clsx";
import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";
import rehypePrism from "rehype-prism-plus";

import "./styles/markdown.css";
import "./styles/prism-atom-dark.css";
import "./styles/prism-line-number.css";

export default function MarkdownRenderer({ content, className }: { content: string; className?: string }) {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[[rehypePrism, { showLineNumbers: true, ignoreMissing: true }]]}
      className={clsx("markdown", className)}
    >
      {content}
    </Markdown>
  );
}
