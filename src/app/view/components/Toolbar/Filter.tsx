"use client";

import { useClientContext } from "../../contexts";

export default function Filter() {
  const { filter, setFilter } = useClientContext();

  return (
    <select
      value={filter}
      name="filter type"
      aria-label="group filter"
      // @ts-expect-error
      onChange={(e) => setFilter(e.target.value)}
      className="bg-dark outline-none rounded-xl py-0.5 px-1.5 border-b border-b-gray-500"
    >
      <option value="技术部">所有</option>
      <option value="航模组">航模组</option>
      <option value="编程组">编程组</option>
      <option value="电子组">电子组</option>
      <option value="静模组">静模组</option>
    </select>
  );
}
