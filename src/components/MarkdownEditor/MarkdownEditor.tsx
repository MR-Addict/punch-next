"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineFullscreenExit } from "react-icons/ai";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { Dispatch, SetStateAction, useState } from "react";

import CodeMirror from "@uiw/react-codemirror";
import { EditorView } from "@codemirror/view";
import { VscOpenPreview } from "react-icons/vsc";
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

const options: BasicSetupOptions = { foldGutter: true, autocompletion: true };

export default function MarkdownEditor({ content, openEditor, setContent, setOpenEditor }: Props) {
  const windowWidth = useWindowSize().width;
  const [showPreview, setShowPreview] = useState(false);

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
          {(windowWidth >= 1024 || !showPreview) && (
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
          )}

          {(windowWidth >= 1024 || showPreview) &&
            (content.length > 0 ? (
              <MarkdownRenderer content={content} className="overflow-auto px-4 lg:px-0" />
            ) : (
              <p className="grid place-content-center text-gray-600 p-4 lg:p-0">没有可以预览的内容</p>
            ))}

          <div className="absolute right-4 lg:right-10 bottom-6 flex flex-col gap-2">
            {windowWidth < 1024 && (
              <button
                type="button"
                aria-label="toggle preview"
                className={style["icon-btn"]}
                onClick={() => setShowPreview(!showPreview)}
              >
                {showPreview ? <MdOutlineModeEditOutline size={23} /> : <VscOpenPreview size={23} />}
              </button>
            )}

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
