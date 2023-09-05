import Client from "./Client";
import { ClientContextProvider } from "./contexts/ClientContext";

import notes from "@/lib/mongodb/notes";
import setMetadata from "@/lib/utils/setMetadata";

export const metadata = setMetadata("查看笔记");

export default async function Page() {
  const result = await notes.query();
  if (!result.data) throw new Error(result.message);

  return (
    <ClientContextProvider data={result.data}>
      <Client />
    </ClientContextProvider>
  );
}
