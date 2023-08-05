import { PlacesProvider } from "./context/places";
import { MapProvider } from "./context/map";
import { HomeScreen } from "./screens";

export function MapsApp() {
  return (
    <PlacesProvider>
      <MapProvider>
        <HomeScreen />
      </MapProvider>
    </PlacesProvider>
  );
}
