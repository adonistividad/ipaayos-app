import React, { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import { IonButton } from "@ionic/react";

const MapRouting: React.FC<any> = ({ destination }) => {
  const map = useMap();
  const [currentPosition, setCurrentPosition] = useState<any>(null); //-- al ghurair center
  // const [currentPosition, setCurrentPosition] = useState(
  //   L.latLng(25.2674125, 55.3130874)
  // ); //-- al ghurair center

  /************** */
  // const [location, setLocation] = useState<any>({
  //   loaded: false,
  //   coordinates: { lat: "", lng: "" },
  // });
  // const onSuccess = (location: any) => {
  //   console.log("location<<<<", location)
  //   // alert("bbbb");
  //   setLocation({
  //     ...location,
  //     loaded: true,
  //     coordinates: {
  //       lat: location.coords.latitude,
  //       lng: location.coords.longitude,
  //     },
  //   });
  //   setCurrentPosition({
  //     lat: location.coords.latitude,
  //     lng: location.coords.longitude,
  //   });
  // };
  // const onError = (error: any) => {
  //   setLocation({
  //     ...location,
  //     loaded: true,
  //     error: { code: 0, message: "Geolocation not supported" },
  //   });
  // };
  // useEffect(() => {
  //   if (!("geolocation" in navigator)) {
  //     onError({ code: 0, message: "Geolocation not supported" });
  //   }
  //   // alert('aaaa')
  //   navigator.geolocation.getCurrentPosition(onSuccess, onError);
  //   // alert('ccccc')
  // }, []);

  /************** */
  // lat: 25.2772352, lng: 55.312384

  useEffect(() => {
    // alert("in");
    map.locate().on("locationfound", function (e: any) {
      console.log("e.latlng>>>>", e.latlng);
      // alert("latlng: "+ JSON.stringify(e.latlng))
      setCurrentPosition(e.latlng);
      // setOrigin(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
      // const radius = e.accuracy;
      // const circle = L.circle(e.latlng, radius);
      // circle.addTo(map);
      // setBbox(e.bounds.toBBoxString().split(","));
    });
    // eslint-disable-next-line
  }, [map]);

  useEffect(() => {
    if (currentPosition) {
      const waypoints = [
        currentPosition,
        destination,
        // L.latLng(25.2519707,55.330614), //-- Deira city Center Dubai
        // L.latLng(25.2737825, 55.322225), //-- Al Ghurair 1084

        // L.latLng(14.68993, 120.95988), //-- Ibayo street Malinta Valenzuela
        // L.latLng(14.68565,120.97651), //-- SM Valenzuela
        // L.latLng(14.6543,120.983),  //-- monumento
        // L.latLng(14.6566,121.0274), //-- SM north edsa
        // L.latLng(14.587, 121.1759), //-- Antipolo
      ];
      L.Routing.control({
        waypoints,
        lineOptions: {
          styles: [{ color: "#6FA1EC", weight: 4 }],
          extendToWaypoints: true,
          missingRouteTolerance: 1,
        },
        show: false,
        addWaypoints: false,
        routeWhileDragging: true,
        fitSelectedRoutes: true,
        showAlternatives: false,
      }).addTo(map);

      //-- disable draggable marker
      waypoints.map((wp: any, index: number) => {
        return L.marker(wp, {
          draggable: false,
        }).addTo(map);
      });
    }

    // console.log("currentPosition >>>", currentPosition);
    // eslint-disable-next-line
  }, [currentPosition]);
  return (
    <>
      <IonButton
        className="at-size-12"
        style={{
          position: "absolute",
          bottom: "8px",
          right: "8px",
          zIndex: "9999",
        }}
        onClick={() => {
          window.open(
            `https://www.google.com/maps?saddr=${currentPosition.lat},${currentPosition.lng}&daddr=${destination.lat},${destination.lng}&dirflg=d`
            // `https://www.google.com/maps/dir/${currentPosition.lat},${currentPosition.lng}/${destination.lat},${destination.lng}/`
          );
        }}
      >
        Open Google Maps
      </IonButton>
      {console.log("currentPosition>>>>", currentPosition)}
      {/* {console.log("location>>>>", location)} */}
    </>
  );
};

export default MapRouting;
// https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&route=14.6924%2C120.9646%3B14.8438%2C120.8114#map=12/14.7709/120.9025

// https://www.google.com/maps?saddr=25.2737825,+55.322225&daddr=25.2519707,55.330614&dirflg=d     //-- driving
// https://www.google.com/maps?saddr=25.2737825,+55.322225&daddr=25.2519707,55.330614&dirflg=w     //-- walking
// https://www.google.com/maps?saddr=25.2737825,+55.322225&daddr=25.2519707,55.330614&dirflg=b     //-- bicycle
// https://www.google.com/maps?saddr=25.2737825,+55.322225&daddr=25.2519707,55.330614&dirflg=r     //-- transit
