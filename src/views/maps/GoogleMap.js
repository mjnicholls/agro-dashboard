import React from "react";

const GoogleMap = ({ polygon }) => {

  const mapRef = React.useRef(null);
  React.useEffect(() => {
    let google = window.google;
    if (polygon) {
      let map = mapRef.current;
      let mapOptions = {
        // center: new google.maps.LatLng(polygon.center[1], polygon.center[0]),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      console.log("**", polygon)
      map = new google.maps.Map(map, mapOptions);
      let polygonData = {
        type: polygon.geo_json.type,
        geometry: polygon.geo_json.geometry
      }
      map.data.addGeoJson(polygonData);

      var bounds  = new  google.maps.LatLngBounds();
      map.data.forEach(function(feature) {

      var geo = feature.getGeometry();

      geo.forEachLatLng(function(LatLng) {
        bounds.extend(LatLng);
      });
    });

    map.fitBounds(bounds);
    }
  }, [polygon]);
  return <div ref={mapRef} style={{width: "100%", height: "100%", minHeight: "250px"}} />;
};

export default GoogleMap