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