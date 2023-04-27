export default function formatDate(date: string | Date) {
  const newDate = date instanceof Date ? date : new Date(date);
  const localDate = newDate.toLocaleString("zh-cn", { timeZone: "Asia/Shanghai" });

  return localDate
    .split(" ")[0]
    .split("/")
    .map((item) => (Number(item) < 10 ? "0" + Number(item) : item))
    .join("-");
}
