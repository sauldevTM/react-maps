import { useContext, useState } from "react";
import { PlacesContext } from "../context/places";
import { MapContext } from "../context/map";
import { LoadingPlaces } from ".";
import { Feature } from "../interfaces";

export default function SearchResults() {
  const [activeId, setActiveId] = useState("");

  const { places, userLocation, isLoadingPlaces } = useContext(PlacesContext);
  const { map, getRouteBetweenPoints } = useContext(MapContext);

  if (isLoadingPlaces) return <LoadingPlaces />;

  const handleMarkerClick = (place: Feature) => {
    const [lng, lat] = place.center;

    setActiveId(place.id);

    map?.flyTo({
      center: [lng, lat],
      essential: true,
      zoom: 14,
    });
  };

  const handlerRouteBetweenMarkers = (place: Feature) => {
    if (!userLocation) return;

    const [lng, lat] = place.center;

    getRouteBetweenPoints(userLocation, [lng, lat]);
  };

  return (
    places.length !== 0 && (
      <ul className="list-group mt-1">
        {places.map((place) => (
          <li
            key={place.id}
            className={`list-group-item list-group-item-action ${
              place.id === activeId && "bg-primary text-white"
            }`}
            role="button"
            onClick={() => handleMarkerClick(place)}
          >
            <h6>{place.text}</h6>

            <p style={{ fontSize: "12px" }}>{place.place_name}</p>

            <button
              className={`btn btn-sm ${
                place.id === activeId
                  ? "btn-outline-light"
                  : "btn-outline-primary"
              }`}
              onClick={() => handlerRouteBetweenMarkers(place)}
            >
              Direcciones
            </button>
          </li>
        ))}
      </ul>
    )
  );
}
