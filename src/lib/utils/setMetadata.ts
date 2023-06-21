export default function setMetadata(title?: string) {
  return {
    title: `值班笔记` + (title ? " • " + title : ""),
    description: "南京工业大学技术开发部值班笔记",
    icons: { icon: "/favicon.ico" }
  };
}
