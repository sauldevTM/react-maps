import ReactDOM from "react-dom/client";
import mapboxgl from "mapbox-gl";
import { MapsApp } from "./MapsApp";

mapboxgl.accessToken =
  "pk.eyJ1Ijoic2ViYXN0bSIsImEiOiJjbGt3a2ExdWcwNHQxM2ZxaTd0czh5MGtyIn0.9t9uoTFrDQCE7PsFtN8h3g";

if (!navigator.geolocation) {
  alert("Geolocation is not supported by your browser");
  throw new Error("Geolocation is not supported by your browser");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <MapsApp />
  // </React.StrictMode>
);
