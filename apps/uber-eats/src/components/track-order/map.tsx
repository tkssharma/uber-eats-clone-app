import * as React from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css"; 
// import the mapbox-gl styles so that the map is displayed correctly

function MapboxMap({lat, lon}: any) {
    // this is where the map instance will be stored after initialization
  const [map, setMap] = React.useState<mapboxgl.Map>();

    // React ref to store a reference to the DOM node that will be used
  // as a required parameter `container` when initializing the mapbox-gl
  // will contain `null` by default
    const mapNode = React.useRef(null);

  React.useEffect(() => {
    const node = mapNode.current;
        // if the window object is not found, that means
        // the component is rendered on the server
        // or the dom node is not initialized, then return early
    if (typeof window === "undefined" || node === null) return;

        // otherwise, create a map instance
    const mapboxMap = new mapboxgl.Map({
      container: node,
      center: [75.82, 26.90], // starting position
      accessToken: process.env.REACT_APP_MAPGL_TOKEN,
      style: 'mapbox://styles/mapbox/streets-v12',
      zoom: 9,
    });
    // mapboxMap.setCenter([26.9124, 75.7873]);
    //mapboxMap.seset
    // 26.9124° N, 75.7873°
        // save the map object to React.useState
    setMap(mapboxMap);

        return () => {
      mapboxMap.remove();
    };
  }, []);

    return <div className="rounded-md p-4 m-4" ref={mapNode} style={{ width: "100%", height: "100%" }} />;
}

export default MapboxMap