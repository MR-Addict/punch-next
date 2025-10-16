import { BiHome } from "react-icons/bi";
import { BiEditAlt } from "react-icons/bi";
import { LuBookMinus, LuHandHelping } from "react-icons/lu";

const links = [
  { name: "首页", link: "/", Icon: BiHome },
  { name: "提交笔记", link: "/form", Icon: BiEditAlt },
  { name: "查看笔记", link: "/view", Icon: LuBookMinus },
  { name: "帮助文档", link: "/help", Icon: LuHandHelping }
];

export default links;
