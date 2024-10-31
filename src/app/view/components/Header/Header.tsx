"use client";

import Searchbar from "./components/Searchbar/Searchbar";
import TermsSelector from "./components/TermsSelector/TermsSelector";

export default function Header() {
  return (
    <header className="flex flex-row items-center gap-4 animate-slideFromTop">
      <Searchbar />
      <TermsSelector />
    </header>
  );
}
