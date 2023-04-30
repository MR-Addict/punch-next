import { notes } from "@/lib/mongodb";
import { View, ViewContextProvider, TableContextProvider } from "@/components/View";

export const revalidate = 0;

export default async function Page() {
  const result = await notes.query();
  if (!result.data) throw new Error(result.message);

  return (
    <main className='w-full flex-1 py-10 px-4 md:px-48'>
      <ViewContextProvider data={result.data} firstWeek={new Date("2023-02-06 12:30")}>
        <TableContextProvider>
          <View />
        </TableContextProvider>
      </ViewContextProvider>
    </main>
  );
}
