import Client from "./Client";

import env from "@/types/env/client";
import { setMetadata } from "@/lib/utils";

export const metadata = setMetadata("提交笔记");

export default function Page() {
  return (
    <main className="w-full px-4 md:px-48 flex-1 flex flex-col items-center justify-center">
      <Client start={env.START_DATE} end={env.END_DATE} />
    </main>
  );
}
