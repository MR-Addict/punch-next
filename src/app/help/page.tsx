import fs from "fs";
import path from "path";

import MarkdownRenderer from "@/components/MarkdownRenderer/MarkdownRenderer";

import setMetadata from "@/lib/utils/setMetadata";

export const metadata = setMetadata("帮助文档");

export default function Page() {
  const content = fs.readFileSync(path.join(process.cwd(), "docs/help.md"), "utf-8");

  return (
    <main className="animate-slideFromBottom">
      <MarkdownRenderer content={content} />
    </main>
  );
}
