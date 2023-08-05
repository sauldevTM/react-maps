import { BtnLocation, MapView, SearchBar } from "../components";
import ReactLogo from "../components/ReactLogo";

export default function HomeScreen() {
  return (
    <div>
      <MapView />
      <BtnLocation />
      <ReactLogo />
      <SearchBar />
    </div>
  );
}
