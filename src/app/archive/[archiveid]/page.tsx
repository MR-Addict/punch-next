import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";

import data from "../config";
import { View, ViewContextProvider, TableContextProvider } from "@/components/View";

export default function Page({ params: { archiveid } }: { params: { archiveid: string } }) {
  const decodedArchiveId = decodeURIComponent(archiveid);
  const result = data.find((item) => item.name === decodedArchiveId);
  if (!result) notFound();

  const filePath = path.join(process.cwd(), `src/assets/${result.name}.json`);
  const fileContent = fs.readFileSync(filePath, "utf8");
  const parsedData = JSON.parse(fileContent).map((item: any) => ({ ...item, date: new Date(item.date) }));

  return (
    <main className='w-full flex-1 py-10 px-4 md:px-48'>
      <ViewContextProvider data={parsedData} firstWeek={new Date("2023-02-06 12:30")}>
        <TableContextProvider>
          <View />
        </TableContextProvider>
      </ViewContextProvider>
    </main>
  );
}

export function generateStaticParams() {
  return data.map((item) => ({ archiveid: item.name }));
}
