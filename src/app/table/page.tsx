import { notes } from "@/lib/mongodb";

export default async function Page() {
  // const result = await notes.query();
  // if (!result.data) throw new Error(result.message);

  return (
    <main className='w-full px-4 md:px-48 flex-1 flex flex-col items-center justify-center'>
      <h1>hello world</h1>
    </main>
  );
}
