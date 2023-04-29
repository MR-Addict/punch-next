"use client";

import { useClientContext } from "../../contexts";

export default function Filter() {
  const { filter, setFilter } = useClientContext();

  return (
    <select
      value={filter}
      name='filter type'
      aria-label='group filter'
      // @ts-expect-error
      onChange={(e) => setFilter(e.target.value)}
      className='border bg-dark border-gray-500 py-1 px-2 outline-none rounded-sm focus:border-blue-600'
    >
      <option value='所有'>所有</option>
      <option value='航模组'>航模组</option>
      <option value='编程组'>编程组</option>
      <option value='电子组'>电子组</option>
      <option value='静模组'>静模组</option>
    </select>
  );
}
