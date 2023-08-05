import { IPlacesState } from ".";
import { Feature } from "../../interfaces";

type PlacesActions =
  | { type: "setUserLocation"; payload: [number, number] }
  | { type: "setLoadingPlaces" }
  | { type: "setPlaces"; payload: Feature[] }
  | { type: "setClearPlaces" };

export const placesReducers = (
  state: IPlacesState,
  action: PlacesActions
): IPlacesState => {
  switch (action.type) {
    case "setUserLocation":
      return {
        ...state,
        isLoading: false,
        userLocation: action.payload,
      };

    case "setLoadingPlaces":
      return {
        ...state,
        isLoadingPlaces: true,
        places: [],
      };

    case "setPlaces":
      return {
        ...state,
        isLoadingPlaces: false,
        places: action.payload,
      };

    case "setClearPlaces":
      return {
        ...state,
        isLoadingPlaces: false,
        places: [],
      };

    default:
      return state;
  }
};
