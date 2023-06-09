import { IconType } from "react-icons/lib";

interface Props {
  Icon: IconType;
  title: string;
  value: number;
  color: string;
}

export default function Chip({ Icon, title, value, color }: Props) {
  return (
    <div className="duration-300 flex flex-row justify-between items-center py-5 px-10 rounded-xl bg-dark">
      <Icon size={60} fill={color} className="animate-scaleUp" />

      <div className="flex flex-col justify-between items-center">
        <p className="text-4xl font-bold animate-slideFromLeft">{value}</p>
        <p className="text-xs text-gray-500 animate-slideFromRight">{title}</p>
      </div>
    </div>
  );
}
