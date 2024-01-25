"use client";

import CodeMirror from "@uiw/react-codemirror";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { languages } from "@codemirror/language-data";
import { BasicSetupOptions } from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { AiOutlineFullscreenExit } from "react-icons/ai";
import { VscOpenPreview } from "react-icons/vsc";
import { MdOutlineModeEditOutline } from "react-icons/md";

import style from "./FullscreenEditor.module.css";

import RenderMarkdown from "@/components/RenderMarkdown/RenderMarkdown";

interface Props {
  content: string;
  fullscreen: boolean;
  setContent: Function;
  setFullscreen: Function;
}

export default function FullscreenEditor({ content, fullscreen, setContent, setFullscreen }: Props) {
  const options: BasicSetupOptions = { foldGutter: false };

  const [showPreview, setShowPreview] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <AnimatePresence>
      {fullscreen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-10 gradient-100 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {(windowWidth >= 768 || !showPreview) && (
            <CodeMirror
              theme="dark"
              width="100%"
              height="100%"
              value={content}
              basicSetup={options}
              placeholder="写写今天都发生了什么"
              className="overflow-auto text-base h-full"
              onChange={(value) => setContent(value)}
              extensions={[markdown({ base: markdownLanguage, codeLanguages: languages })]}
            />
          )}

          {(windowWidth >= 768 || showPreview) && (
            <RenderMarkdown content={content} className="overflow-auto px-4 md:px-0" />
          )}

          <div className="absolute right-4 md:right-10 bottom-10 flex flex-col gap-2">
            {windowWidth < 768 && content.length > 0 && (
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
              onClick={() => setFullscreen(false)}
            >
              <AiOutlineFullscreenExit size={25} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
