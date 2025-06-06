import { FcReading, FcCalendar, FcApproval, FcCancel } from "react-icons/fc";

interface Props {
  message: string;
  icon: "reading" | "calendar" | "success" | "forbidden";
}

export default function Message({ message, icon }: Props) {
  return (
    <section className="flex flex-col items-center justify-center gap-2">
      <div className="animate-slideFromTop">
        {icon === "reading" && <FcReading size={100} />}
        {icon === "calendar" && <FcCalendar size={100} />}
        {icon === "success" && <FcApproval size={100} />}
        {icon === "forbidden" && <FcCancel size={100} />}
      </div>

      <p className="text-balance text-center animate-slideFromBottom whitespace-pre-wrap">{message}</p>
    </section>
  );
}
