import { IconType } from "react-icons/lib";

import style from "./Chip.module.css";

interface Props {
  Icon: IconType;
  title: string;
  value: number;
  color: string;
}

export default function Chip({ Icon, title, value, color }: Props) {
  return (
    <div className={style.chip}>
      <div className='flex flex-col justify-between items-center gap-3'>
        <Icon size={45} fill={color} />
        <h1 className='text-sm text-gray-500'>{title}</h1>
      </div>

      <p className='text-5xl font-bold'>{value}</p>
    </div>
  );
}
