"use client";

import Body from "./components/Body/Body";
import Header from "./components/Header/Header";

export default function Client() {
  return (
    <main className="py-5 lg:py-10 flex flex-col gap-6">
      <Header />
      <Body />
    </main>
  );
}
