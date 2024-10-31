import Client from "./Client";

import setMetadata from "@/lib/utils/setMetadata";

export const metadata = setMetadata("查看笔记");

export default async function Page() {
  return <Client />;
}
