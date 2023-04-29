import { notes } from "@/lib/mongodb";
import { Chips } from "./components";

export default async function Page() {
  const result = await notes.query();
  if (!result.data) throw new Error(result.message);

  return (
    <main className='w-full px-4 md:px-48 py-10 flex-1 flex flex-col gap-10'>
      <Chips notes={result.data} />
    </main>
  );
}
