import fs from "fs";
import path from "path";

const pnFolder = path.join(process.cwd(), ".pnr");

function mkdirIfNotExists(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

export function writeJSONToFile(data: any, fileName: string) {
  mkdirIfNotExists(pnFolder);
  fs.writeFileSync(path.join(pnFolder, fileName), JSON.stringify(data, null, 2));
}

export function readJSONFromFile(fileName: string) {
  return JSON.parse(fs.readFileSync(path.join(pnFolder, fileName), "utf-8"));
}

export function removeFile(fileName: string) {
  fs.rmSync(path.join(pnFolder, fileName));
}

export function removeAllFiles() {
  fs.rmSync(pnFolder, { recursive: true });
}

export function listFiles() {
  return fs.readdirSync(pnFolder);
}

export function fileExists(fileName: string) {
  return fs.existsSync(path.join(pnFolder, fileName));
}
