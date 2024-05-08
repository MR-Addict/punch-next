import Client from "./Client";

import notes from "@/lib/mongodb/notes";
import setMetadata from "@/lib/utils/setMetadata";
import getArchiveNotes from "@/lib/notes/getArchiveNotes";
import exportNotesToArchive from "@/lib/notes/exportNotesToArchive";
import { PublicEnv } from "@/types/env";
import { ViewContextProvider } from "@/contexts/View/ViewProvider";

export const metadata = setMetadata("查看笔记");

export default async function Page() {
  const result = await notes.query();
  if (!result.data) throw new Error(result.message);

  const env = PublicEnv.parse(process.env);

  let data = [{ name: env.CURRENT_TERM, notes: result.data }];
  data = data.concat(getArchiveNotes()).filter((item) => item.notes.length > 0);

  // exportNotesToArchive(env.CURRENT_TERM, result.data);

  return (
    <ViewContextProvider data={data}>
      <Client />
    </ViewContextProvider>
  );
}
