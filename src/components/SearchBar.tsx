import { ChangeEvent, useContext, useRef } from "react";
import { SearchResults } from ".";
import { PlacesContext } from "../context/places";
import "./styles/SearchBar.css";

export default function SearchBar() {
  const { searchPlacesByTerm } = useContext(PlacesContext);
  const debounceRef = useRef<NodeJS.Timeout>();

  const handlerQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      searchPlacesByTerm(query);
    }, 500);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        className="form-control"
        placeholder="Buscar lugar..."
        onChange={handlerQueryChange}
      />

      <SearchResults />
    </div>
  );
}
