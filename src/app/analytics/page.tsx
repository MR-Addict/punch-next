import { notes } from "@/lib/mongodb";
import { Chips, AreaChart } from "./components";

export const revalidate = 0;

export default async function Page() {
  const result = await notes.query();
  if (!result.data) throw new Error(result.message);

  return (
    <main className='w-full px-4 md:px-48 py-10 flex-1 flex flex-col gap-7'>
      <Chips notes={result.data} />
      <AreaChart notes={result.data.reverse()} />
    </main>
  );
}
