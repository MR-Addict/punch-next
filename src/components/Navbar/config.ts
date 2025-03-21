import { BiHome } from "react-icons/bi";
import { BiEditAlt } from "react-icons/bi";
import { LuBookMinus } from "react-icons/lu";
import { RiRobot2Line } from "react-icons/ri";

const links = [
  { name: "首页", link: "/", Icon: BiHome },
  { name: "提交笔记", link: "/form", Icon: BiEditAlt },
  { name: "查看笔记", link: "/view", Icon: LuBookMinus },
  { name: "笔记分析", link: "/analyze", Icon: RiRobot2Line }
];

export default links;
