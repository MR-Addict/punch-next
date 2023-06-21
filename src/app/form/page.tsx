import Client from "./Client";

import { config } from "@/config";
import { setMetadata } from "@/lib/utils";

export const metadata = setMetadata("提交笔记");

export default function Page() {
  return (
    <main className="w-full px-4 md:px-48 flex-1 flex flex-col items-center justify-center">
      <Client start={config.start} end={config.end} />
    </main>
  );
}
