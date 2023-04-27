import Client from "./Client";
import { notes } from "@/lib/mongodb";
import { ClientContextProvider } from "./contexts";

export default async function Page() {
  const result = await notes.query();
  if (!result.data) throw new Error(result.message);

  return (
    <ClientContextProvider data={result.data}>
      <Client />
    </ClientContextProvider>
  );
}
