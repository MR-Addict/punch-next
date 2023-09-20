export default function setMetadata(title?: string) {
  return {
    generator: "Next.js",
    applicationName: "值班笔记",
    icons: { icon: "/favicon.ico" },
    title: `值班笔记` + (title ? " • " + title : ""),
    description: "南京工业大学校大学生科协技术开发部值班笔记",
    keywords: ["南京工业大学", "校大学生科协", "技术开发部", "值班笔记"]
  };
}
