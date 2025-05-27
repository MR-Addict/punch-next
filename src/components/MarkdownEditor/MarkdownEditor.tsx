import { Splitter } from "antd";
import { Dispatch, SetStateAction } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineFullscreenExit } from "react-icons/ai";

import { EditorView } from "@codemirror/view";
import { languages } from "@codemirror/language-data";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";

import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { BasicSetupOptions } from "@uiw/react-codemirror";

import style from "./MarkdownEditor.module.css";
import useWindowSize from "@/hooks/useWindowSize";

import MarkdownRenderer from "@/components/MarkdownRenderer/MarkdownRenderer";

interface Props {
  content: string;
  openEditor: boolean;
  setContent: Dispatch<SetStateAction<string>>;
  setOpenEditor: Dispatch<SetStateAction<boolean>>;
}

const options: BasicSetupOptions = { foldGutter: false, autocompletion: false };

export default function MarkdownEditor({ content, openEditor, setContent, setOpenEditor }: Props) {
  const { width } = useWindowSize();

  return (
    <AnimatePresence>
      {openEditor && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3 }}
          className={style.wrapper}
        >
          <Splitter layout={width >= 1024 ? "horizontal" : "vertical"}>
            <Splitter.Panel min="20%" max="70%">
              <CodeMirror
                width="100%"
                height="100%"
                value={content}
                theme={vscodeDark}
                basicSetup={options}
                className={style.editor}
                placeholder="写写今天都发生了什么"
                onChange={(value) => setContent(value)}
                extensions={[markdown({ base: markdownLanguage, codeLanguages: languages }), EditorView.lineWrapping]}
              />
            </Splitter.Panel>

            <Splitter.Panel>
              {content.length === 0 && <p className="w-full h-full grid place-content-center">在此预览 Markdown</p>}
              {content.length > 0 && <MarkdownRenderer content={content} className="px-4 pb-4" />}
            </Splitter.Panel>
          </Splitter>

          <div className="absolute right-4 lg:right-10 bottom-6 flex flex-col gap-2">
            <button
              type="button"
              aria-label="exit full screen"
              className={style["icon-btn"]}
              onClick={() => setOpenEditor(false)}
            >
              <AiOutlineFullscreenExit size={25} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
