import React from "react";


const GoogleMap = ({ data }) => {

  const mapRef = React.useRef(null);

  React.useEffect(() => {
    let google = window.google;
    if (data.length) {
      let map = mapRef.current;
      let mapOptions = {
        // center: new google.maps.LatLng(polygon.center[1], polygon.center[0]),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      map = new google.maps.Map(map, mapOptions);

      for (let i=0; i < data.length; i++) {
        map.data.addGeoJson(data[i]);
      }

      var bounds  = new  google.maps.LatLngBounds();
      map.data.forEach(function(feature) {

        var geo = feature.getGeometry();
        geo.forEachLatLng(function(LatLng) {
          bounds.extend(LatLng);
        });
      });

    map.fitBounds(bounds);
    }
  }, [data]);

  return <div ref={mapRef} style={{width: "100%", height: "100%"}} />;
};

export default GoogleMap