import { IonButton, IonModal } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet-routing-machine";
import MapRouting from "./MapRouting";
import { AndroidPermissions } from "@ionic-native/android-permissions";
import { LocationAccuracy } from "@ionic-native/location-accuracy"; 

const AtModalMap: React.FC<any> = (
  // props,
  {
    isOpen,
    onClose,
    isSearchMode = false,
    setResult,
    destination,
    // latLong = [14.6908, 120.9631],
    // center,

    // setCoords,
    // setPlaceName,
  }
) => {
  const [origin, setOrigin] = useState<any>(null);

  const onDismiss = () => {
    // setResult({ lat: center[0], lon: center[1], name: placeName });
    onClose(1);
  };
 
  useEffect(() => { 

    const getPosition = (position: any) => {
      const coords = [position.coords.latitude, position.coords.longitude];
      console.log("coords >>>>", coords);
      // setCenter(coords);
      // getPlaceName(coords);
    };

    const getLocationCoordinates = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getPosition);
      }
    };

    const askToTurnOnGPS = () => {
      LocationAccuracy.request(
        LocationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY
      ).then(
        () => {
          // alert("on LocationAccuracy");
          // When GPS Turned ON call method to get Accurate location coordinates
          getLocationCoordinates();
        },
        (error) =>
          console.log(
            "Error requesting location permissions >>" , JSON.stringify(error)
          )
      );
    };
    const requestGPSPermission = () => {
      LocationAccuracy.canRequest().then((canRequest: boolean) => {
        if (canRequest) {
          // alert("canRequest");
          // console.log("4");
        } else {
          //Show 'GPS Permission Request' dialogue
          AndroidPermissions.requestPermission(
            AndroidPermissions.PERMISSION.ACCESS_COARSE_LOCATION
          ).then(
            () => {
              // call method to turn on GPS
              askToTurnOnGPS();
            },
            (error) => {
              //Show alert if user click on 'No Thanks'
              console.log(
                "requestPermission Error requesting location permissions >>" ,
                  error
              );
            }
          );
        }
      });
    };
    const checkGPSPermission = () => {
      AndroidPermissions.checkPermission(
        AndroidPermissions.PERMISSION.ACCESS_COARSE_LOCATION
      ).then(
        (result: any) => {
          if (result.hasPermission) {
            //If having permission show 'Turn On GPS' dialogue
            askToTurnOnGPS();
          } else {
            //If not having permission ask for permission
            requestGPSPermission();
          }
        },
        (err: any) => {
          // alert("err>>>" + err);
        }
      );
    };
    checkGPSPermission();
    getLocationCoordinates();
    ////// setZoom(defaultZoom);
    // eslint-disable-next-line
  }, []);

  /*********** */
  const MyComponent = () => {
    const map: any = useMapEvents({
      click: () => {
        map.locate();
      },
      locationfound: (location: any) => {
        // console.log("location found:", location);
        // alert(JSON.stringify({ lat: location.latitude, lng: location.longitude }))
        setOrigin({ lat: location.latitude, lng: location.longitude });
      },
    });
    return null;
  };
  /*********** */
  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={onDismiss}
      className="ios modal-card hydrated show-modal modal-interactive modal-page"
    >
      <MapContainer
        id="map"
        maxZoom={18}
        zoom={11}
        scrollWheelZoom={true}
        doubleClickZoom={true}
        style={{ height: "100vh" }}
        center={origin}
      >
        <TileLayer
          // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          // url="https://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png"
          // url="	http://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png"

          className="map-tiles"
        />
        {/* <MapRouting destination={{lat:25.2519707, lng:55.330614}}/> */}
        {/* Clock tower Deira dubai */}
        {/* <MapRouting destination={{lat:25.2586704, lng:55.3253428}}/>  */}
        <MyComponent />
        <MapRouting origin={origin} destination={destination} />
      </MapContainer>
      <div className="button-container at-pad-10">
        <IonButton
          expand="block"
          className="map-submit"
          onClick={() => {
            onDismiss();
          }}
        >
          Close
        </IonButton>
        {/* {origin && (
          <IonButton
            expand="block"
            className="map-submit"
            onClick={() => {
              window.open(
                `https://www.google.com/maps/dir/${origin.lat},${origin.lng}/${destination.lat},${destination.lng}/`
                // `https://www.google.com/maps/dir/${origin.lat},${origin.lng}/25.2586728,55.3242431/`
              );
            }}
          >
            Google Maps
          </IonButton>
        )}
      */}
        <> {console.log("origin >>>", origin)}</>
      </div>
    </IonModal>
  );
};

export default AtModalMap;
// https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&route=14.6924%2C120.9646%3B14.8438%2C120.8114#map=12/14.7709/120.9025

// https://www.google.com/maps?saddr=25.2737825,+55.322225&daddr=25.2519707,55.330614&dirflg=d     //-- driving
// https://www.google.com/maps?saddr=25.2737825,+55.322225&daddr=25.2519707,55.330614&dirflg=w     //-- walking
// https://www.google.com/maps?saddr=25.2737825,+55.322225&daddr=25.2519707,55.330614&dirflg=b     //-- bicycle
// https://www.google.com/maps?saddr=25.2737825,+55.322225&daddr=25.2519707,55.330614&dirflg=r     //-- transit
