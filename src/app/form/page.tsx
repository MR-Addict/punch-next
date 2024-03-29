import Client from "./Client";

import setMetadata from "@/lib/utils/setMetadata";

export const metadata = setMetadata("提交笔记");

export default function Page() {
  return (
    <main className="w-full px-4 md:px-28 flex-1 flex flex-col items-center justify-center">
      <Client />
    </main>
  );
}
