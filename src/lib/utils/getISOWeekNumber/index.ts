export default function getISOWeekNumber(date: string | Date) {
  const newDate = date instanceof Date ? date : new Date(date);

  const oneDay = 24 * 60 * 60 * 1000;
  const daysPast = newDate.getTime() / oneDay - 4;

  return Math.max(0, Math.ceil(daysPast / 7)) + 1;
}
