import { BsGithub } from "react-icons/bs";

export default function Github() {
  return (
    <a
      aria-label="github"
      href="https://github.com/MR-Addict/punch-next"
      className="hover:lg:bg-black/10 p-1.5 rounded-md duration-200 text-gray-800"
    >
      <BsGithub size={22} />
    </a>
  );
}
