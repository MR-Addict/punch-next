import { FcPortraitMode, FcReading, FcOvertime } from "react-icons/fc";

interface Props {
  message: string;
  icon: "people" | "reading" | "calendar";
}

export default function Message({ message, icon }: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 animate-scaleUp">
      {icon === "people" && <FcPortraitMode size={100} />}
      {icon === "reading" && <FcReading size={100} />}
      {icon === "calendar" && <FcOvertime size={100} />}
      <p className="text-center">{message}</p>
    </div>
  );
}
