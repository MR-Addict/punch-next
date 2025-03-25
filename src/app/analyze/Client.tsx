"use client";

import { useEffect, useState } from "react";

import style from "./Client.module.css";
import getPNRData from "@/lib/api/analyze/getPNRData";
import { useAppContext } from "@/contexts/App/AppProvider";
import TermsSelector from "../view/components/Header/components/TermsSelector/TermsSelector";

export default function Client() {
  const { term } = useAppContext();
  const [pns, setPNs] = useState<Record<string, string[]> | null | undefined>(undefined);

  useEffect(() => {
    if (!term) return;
    getPNRData(term).then((res) => {
      if (res.success) setPNs(res.data);
      else setPNs(null);
    });
  }, [term]);

  return (
    <main className={style.wrapper}>
      <header className={style.title}>
        <h1>值班笔记分析</h1>
        <TermsSelector />
      </header>

      <div className={style.content}>
        {pns && (
          <ul>
            {Object.entries(pns).map(([key, value]) => (
              <li key={key}>
                <button type="button" className={style.item}>
                  <h2>{key}</h2>
                  {value.length > 1 && <p>{`(${value.length})`}</p>}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
