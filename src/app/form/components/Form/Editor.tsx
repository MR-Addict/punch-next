"use client";

import CodeMirror from "@uiw/react-codemirror";
import { languages } from "@codemirror/language-data";
import { BasicSetupOptions } from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";

interface Props {
  value: string;
  setValue: (value: string) => void;
}

export default function MarkdownEditor({ value, setValue }: Props) {
  const options: BasicSetupOptions = { lineNumbers: false, foldGutter: false, highlightActiveLine: false };

  return (
    <CodeMirror
      value={value}
      minHeight="170px"
      maxHeight="170px"
      basicSetup={options}
      placeholder="写写今天都发生了什么"
      onChange={(value) => setValue(value)}
      className="w-full rounded-md overflow-auto text-base bg-white border border-gray-400"
      extensions={[markdown({ base: markdownLanguage, codeLanguages: languages })]}
    />
  );
}
