import Filter from "./Filter";
import Searchbar from "./Searchbar";

export default function Toolbar() {
  return (
    <div className="flex flex-row gap-3 animate-slideFromTop">
      <Searchbar />
      <Filter />
    </div>
  );
}
