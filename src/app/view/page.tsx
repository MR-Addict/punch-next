import Client from "./Client";
import { ClientContextProvider, TableContextProvider } from "./contexts";

import { notes } from "@/lib/mongodb";
import { setMetadata } from "@/lib/utils";

export const metadata = setMetadata("查看笔记");

export default async function Page() {
  const result = await notes.query();
  if (!result.data) throw new Error(result.message);

  return (
    <ClientContextProvider data={result.data}>
      <TableContextProvider>
        <Client />
      </TableContextProvider>
    </ClientContextProvider>
  );
}
