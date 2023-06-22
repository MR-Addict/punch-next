import Client from "./Client";
import { ClientContextProvider, TableContextProvider } from "./contexts";

import env from "@/types/env/client";
import { notes } from "@/lib/mongodb";
import { setMetadata } from "@/lib/utils";

export const metadata = setMetadata("查看笔记");

export default async function Page() {
  const result = await notes.query();
  if (!result.data) throw new Error(result.message);

  return (
    <ClientContextProvider data={result.data} start={env.START_DATE}>
      <TableContextProvider>
        <Client />
      </TableContextProvider>
    </ClientContextProvider>
  );
}
