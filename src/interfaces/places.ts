export interface PlacesResponse {
  type: string;
  query: string[];
  features: Feature[];
  attribution: string;
}

export interface Feature {
  id: string;
  type: string;
  place_type: string[];
  relevance: number;
  properties: Properties;
  text: string;
  place_name: string;
  bbox?: number[];
  center: number[];
  geometry: GeometryPlaces;
  context: Context[];
}

export interface GeometryPlaces {
  type: string;
  coordinates: number[];
}

export interface Context {
  id: string;
  mapbox_id: string;
  wikidata?: string;
  text: string;
  short_code?: string;
}

export interface Properties {
  mapbox_id?: string;
  foursquare?: string;
  wikidata?: string;
  landmark?: boolean;
  address?: string;
  category?: string;
}
