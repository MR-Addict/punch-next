import { BiEditAlt } from "react-icons/bi";
import { LuHelpingHand } from "react-icons/lu";
import { LuHome, LuBookMinus } from "react-icons/lu";

const links = [
  { name: "首页", link: "/", Icon: LuHome },
  { name: "提交笔记", link: "/form", Icon: BiEditAlt },
  { name: "查看笔记", link: "/view", Icon: LuBookMinus },
  { name: "帮助文档", link: "/help", Icon: LuHelpingHand }
];

export default links;
