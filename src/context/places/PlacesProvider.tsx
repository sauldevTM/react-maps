import { ReactNode, useReducer, useEffect } from "react";
import { getUserLocation } from "../../helpers";
import { PlacesContext, placesReducers } from ".";
import { Feature, PlacesResponse } from "../../interfaces";
import { searchApi } from "../../apis";

export interface IPlacesState {
  isLoading: boolean;
  userLocation?: [number, number];
  isLoadingPlaces: boolean;
  places: Feature[];
}

const INITIAL_STATE: IPlacesState = {
  isLoading: true,
  userLocation: undefined,
  isLoadingPlaces: false,
  places: [],
};

interface IPlacesProviderProps {
  children: ReactNode;
}

export function PlacesProvider({ children }: IPlacesProviderProps) {
  const [state, dispatch] = useReducer(placesReducers, INITIAL_STATE);

  useEffect(() => {
    getUserLocation().then((PerLat) =>
      dispatch({ type: "setUserLocation", payload: PerLat })
    );
  }, []);

  const searchPlacesByTerm = async (query: string): Promise<Feature[]> => {
    if (query.trim().length === 0) {
      dispatch({ type: "setClearPlaces" });
      return [];
    }

    if (!state.userLocation) throw new Error("No hay ubicación del usuario");

    dispatch({ type: "setLoadingPlaces" });

    const res = await searchApi.get<PlacesResponse>(`/${query}.json`, {
      params: {
        proximity: `${state.userLocation.join(",")}`,
      },
    });

    dispatch({ type: "setPlaces", payload: res.data.features });

    return res.data.features;
  };

  return (
    <PlacesContext.Provider value={{ ...state, searchPlacesByTerm }}>
      {children}
    </PlacesContext.Provider>
  );
}
