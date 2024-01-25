"use client";

import clsx from "clsx";
import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";
import rehypePrism from "rehype-prism-plus";

import "./markdown.css";
import "./prism-atom-dark.css";

export default function RenderMarkdown({ content, className }: { content: string; className?: string }) {
  return (
    <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypePrism]} className={clsx("markdown", className)}>
      {content}
    </Markdown>
  );
}
