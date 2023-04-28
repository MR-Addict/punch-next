import Client from "./Client";
import { notes } from "@/lib/mongodb";
import { ClientContextProvider } from "./contexts";

export const revalidate = 0;

export default async function Page() {
  const result = await notes.query();
  if (!result.data) throw new Error(result.message);

  return (
    <ClientContextProvider data={result.data}>
      <Client />
    </ClientContextProvider>
  );
}
