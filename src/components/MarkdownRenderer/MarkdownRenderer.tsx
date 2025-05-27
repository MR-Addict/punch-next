"use client";

import clsx from "clsx";
import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";
import rehypePrism from "rehype-prism-plus";

import { useMemo } from "react";

import "./styles/markdown.css";
import "./styles/prism-atom-dark.css";
import "./styles/prism-line-number.css";

import Img from "./components/Img/Img";
import Pre from "./components/Preview/Preview";
import Anchor from "./components/Anchor/Anchor";

type CustomComponentKeys = "a" | "img" | "pre";

interface MarkdownRendererProps {
  /**
   * The Markdown content to render.
   */
  content: string;
  /**
   * Additional CSS class names to apply to the Markdown container.
   */
  className?: string;

  /**
   * Options for the Markdown renderer.
   */
  options?: {
    /**
     * Whether to ignore missing language definitions in Prism.
     *
     * If set to `true`, it will not throw an error when a language definition is missing.
     *
     * If set to `false`, it will throw an error when a language definition is missing.
     *
     * @default true
     */
    ignoreMissing?: boolean;
    /**
     * When custom components are provided, they will override the default components.
     *
     * If a component is set to `null`, it will be removed from the rendering.
     *
     * If a component is not provided, the default component will be used.
     */
    components?: Partial<Record<CustomComponentKeys, React.JSX.Element | null>>;
  };
}

export default function MarkdownRenderer({ content, className, options }: MarkdownRendererProps) {
  const components = useMemo(() => {
    const userProvidedComponents = options?.components;
    let components = { a: Anchor, img: Img, pre: Pre };
    if (userProvidedComponents) {
      Object.keys(userProvidedComponents).forEach((key) => {
        const componentKey = key as CustomComponentKeys;
        const userProvidedComponent = userProvidedComponents[componentKey];
        if (userProvidedComponent === null) {
          delete components[componentKey];
        } else if (userProvidedComponent !== undefined) {
          components = { ...components, [componentKey]: userProvidedComponent };
        }
      });
    }
    return components;
  }, [options?.components]);

  return (
    <div className={clsx("markdown", className)}>
      <Markdown
        components={components}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[[rehypePrism, { ignoreMissing: options?.ignoreMissing ?? true }]]}
      >
        {content}
      </Markdown>
    </div>
  );
}
