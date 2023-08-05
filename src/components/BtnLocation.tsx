import { useContext } from "react";
import { MapContext } from "../context/map";
import { PlacesContext } from "../context/places";

export default function BtnLocation() {
  const { map, isMapReady } = useContext(MapContext);
  const { userLocation } = useContext(PlacesContext);

  const handlerClick = () => {
    if (!isMapReady) throw new Error("Mapa no está listo");
    if (!userLocation) throw new Error("No hay ubicación del usuario");

    map?.flyTo({
      zoom: 14,
      center: userLocation,
    });
  };
  return (
    <div
      className="btn btn-primary"
      style={{ position: "fixed", top: "20px", right: "20px", zIndex: 999 }}
      onClick={handlerClick}
    >
      Mi Ubicación
    </div>
  );
}
