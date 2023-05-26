import { useTableContext } from "../../contexts";

export default function Filter() {
  const { totalArchives, archiveIndex, setArchiveIndex } = useTableContext();

  return (
    <select
      value={archiveIndex}
      name="filter type"
      aria-label="archive filter"
      onChange={(e) => setArchiveIndex(Number(e.target.value))}
      className="bg-dark outline-none rounded-sm py-1 px-2 border border-gray-500"
    >
      {totalArchives.map((item) => (
        <option key={item.name} value={item.index}>
          {item.name}
        </option>
      ))}
    </select>
  );
}
