import Client from "./Client";

import setMetadata from "@/lib/utils/setMetadata";

export const metadata = setMetadata("提交笔记");

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-center">
      <Client />
    </main>
  );
}
