export default function formatDate(date: string | Date, short: boolean = true, timezone: number = 8) {
  const newDate = date instanceof Date ? date : new Date(date);
  const localDate = new Date(newDate.getTime() + timezone * 60 * 60 * 1000).toISOString();

  if (short) return localDate.slice(0, localDate.indexOf("T"));
  else return localDate.replace("T", " ").slice(0, localDate.indexOf("."));
}
