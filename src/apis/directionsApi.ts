import axios from "axios";

export const directionsApi = axios.create({
  baseURL: "https://api.mapbox.com/directions/v5/mapbox/driving",
  params: {
    alternatives: false,
    geometries: "geojson",
    overview: "simplified",
    steps: false,
    language: "es",
    access_token: import.meta.env.VITE_REACT_APP_MAPBOX_KEY,
  },
});
