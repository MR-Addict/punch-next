"use client";

import { useEffect, useState } from "react";

import getPNRData from "@/lib/api/analyze/getPNRData";
import { useAppContext } from "@/contexts/App/AppProvider";

export default function Client() {
  const { terms } = useAppContext();
  const [pns, setPNs] = useState<Record<string, string[]> | null | undefined>(undefined);

  useEffect(() => {
    if (!terms) return;
    getPNRData(terms[1]).then((res) => {
      if (res.success) setPNs(res.data);
      else setPNs(null);
    });
  }, [terms]);

  return (
    <main className="py-5 lg:py-10 flex flex-col gap-6">
      <h1>Analyze</h1>

      <div>
        {pns && (
          <ul>
            {Object.entries(pns).map(([key, value]) => (
              <li key={key}>
                <h2>{key}</h2>
                {/* <ul>
                  {value.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul> */}
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
