export default function formatDate(date: string | Date, offset: number = 8) {
  const newDate = date instanceof Date ? date : new Date(date);
  const localDate = newDate.getTime() + offset * 60 * 60 * 1000;

  return new Date(localDate).toISOString().split("T")[0];
}
