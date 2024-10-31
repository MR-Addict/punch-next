import fs from "fs";
import path from "path";

export default function getArchivedTerms() {
  const archivePath = path.join(process.cwd(), "archive");
  return fs
    .readdirSync(archivePath)
    .sort((a, b) => b.localeCompare(a))
    .map((fileName) => ({ path: path.join(archivePath, fileName), name: fileName.replace(".json", "") }));
}
