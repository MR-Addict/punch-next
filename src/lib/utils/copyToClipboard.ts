export default function copyToClipboard(text: string) {
  if (!navigator.clipboard) return false;
  else navigator.clipboard.writeText(text);
  return true;
}
