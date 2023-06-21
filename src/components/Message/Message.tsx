import { FcPortraitMode, FcReadingEbook, FcCalendar } from "react-icons/fc";

interface Props {
  message: string;
  icon: "people" | "reading" | "calendar";
}

export default function Message({ message, icon }: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="animate-slideFromTop">
        {icon === "people" && <FcPortraitMode size={100} />}
        {icon === "reading" && <FcReadingEbook size={100} />}
        {icon === "calendar" && <FcCalendar size={100} />}
      </div>
      <p className="text-center max-w-[18ch] animate-slideFromBottom">{message}</p>
    </div>
  );
}
