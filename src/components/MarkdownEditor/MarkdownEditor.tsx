import { Splitter } from "antd";
import { Dispatch, SetStateAction } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineFullscreenExit } from "react-icons/ai";

import CodeMirror from "@uiw/react-codemirror";
import { EditorView } from "@codemirror/view";
import { languages } from "@codemirror/language-data";
import { BasicSetupOptions } from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";

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
              <MarkdownRenderer content={content} className="overflow-auto px-4 pb-4" />
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
