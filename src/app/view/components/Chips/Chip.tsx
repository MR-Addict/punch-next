import { IconType } from "react-icons/lib";

interface Props {
  Icon: IconType;
  title: string;
  value: number;
  color: string;
}

export default function Chip({ Icon, title, value, color }: Props) {
  return (
    <div className='duration-300 flex flex-row justify-between items-center py-5 px-10 rounded-xl bg-dark'>
      <div className='flex flex-col justify-between items-center gap-3 animate-slideFromLeft'>
        <Icon size={45} fill={color} />
        <h1 className='text-sm text-gray-500'>{title}</h1>
      </div>

      <p className='text-5xl font-bold animate-slideFromRight'>{value}</p>
    </div>
  );
}
