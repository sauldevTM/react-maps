import { useContext, useEffect, useReducer } from "react";
import { AnySourceData, LngLatBounds, Map, Marker, Popup } from "mapbox-gl";
import { directionsApi } from "../../apis";
import { DirectionsResponse } from "../../interfaces";
import { MapContext, mapReducer } from ".";
import { PlacesContext } from "../places/PlacesContext";

export interface IMapState {
  isMapReady: boolean;
  map?: mapboxgl.Map;
  markers: Marker[];
}

interface IMapProviderProps {
  children: React.ReactNode;
}

const INITIAL_STATE: IMapState = {
  isMapReady: false,
  map: undefined,
  markers: [],
};

export function MapProvider({ children }: IMapProviderProps) {
  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);
  const { places } = useContext(PlacesContext);

  useEffect(() => {
    state.markers.forEach((marker) => marker.remove());

    const newMarkers: Marker[] = [];

    for (const place of places) {
      const [lng, lat] = place.center;

      const popup = new Popup().setHTML(`
        <h4>${place.text}</h4>
        <p>${place.place_name}</p>
      `);

      const newMarker = new Marker()
        .setPopup(popup)
        .setLngLat([lng, lat])
        .addTo(state.map!);

      newMarkers.push(newMarker);
    }

    dispatch({ type: "setMarkers", payload: newMarkers });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [places]);

  useEffect(() => {
    if (state.map?.getLayer("routeString") && !places.length) {
      state.map?.removeLayer("routeString");
      state.map?.removeSource("routeString");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [places]);

  const setMap = (map: Map) => {
    const myLocationPopup = new Popup().setHTML(`
        <h4>Aquí estoy</h4>
        <p>En algún lugar del mundo</p>
      `);

    new Marker({
      color: "#61DAFB",
    })
      .setLngLat(map.getCenter())
      .setPopup(myLocationPopup)
      .addTo(map);
    dispatch({ type: "setMap", payload: map });
  };

  const getRouteBetweenPoints = async (
    start: [number, number],
    end: [number, number]
  ) => {
    const { data } = await directionsApi.get<DirectionsResponse>(
      `/${start.join(",")};${end.join(",")}`
    );

    const { coordinates: coords } = data.routes[0].geometry;

    const bounds = new LngLatBounds(start, start);

    for (const coord of coords) {
      const newCoord: [number, number] = [coord[0], coord[1]];
      bounds.extend(newCoord);
    }

    state.map?.fitBounds(bounds, {
      padding: 200,
    });

    // Polyline
    const sourceData: AnySourceData = {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: coords,
            },
          },
        ],
      },
    };

    if (state.map?.getLayer("routeString")) {
      state.map?.removeLayer("routeString");
      state.map?.removeSource("routeString");
    }

    state.map?.addSource("routeString", sourceData);

    state.map?.addLayer({
      id: "routeString",
      type: "line",
      source: "routeString",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#61DAFB",
        "line-width": 8,
      },
    });
  };

  return (
    <MapContext.Provider value={{ ...state, setMap, getRouteBetweenPoints }}>
      {children}
    </MapContext.Provider>
  );
}
