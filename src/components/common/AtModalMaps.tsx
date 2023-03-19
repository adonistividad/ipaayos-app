// https://enappd.com/blog/ionic-5-complete-guide-on-geolocation/141/

// https://nominatim.org/release-docs/latest/api/Search/
// https://nominatim.openstreetmap.org/search.php?q=philippines+malinta+valenzuela&format=jsonv2

import React, { useEffect, useState } from "react";
import { Map, Marker } from "pigeon-maps";
import { osm } from "pigeon-maps/providers";

import { AndroidPermissions } from "@ionic-native/android-permissions";
import { LocationAccuracy } from "@ionic-native/location-accuracy/";
import {
  IonButton,
  IonContent,
  IonItem,
  IonList,
  IonModal,
  IonSearchbar,
} from "@ionic/react";
import axios from "axios";
import "../../assets/styles/atmodalmaps.css";
 
const defaultZoom = 17;
const AtModalMaps: React.FC<any> = ({
  isOpen,
  onClose,
  setResult,
  latLong,
  // setCoords,
  // setPlaceName,
}) => {
  // const [center, setCenter] = useState<any>([14.6908, 120.9631]);
  const [center, setCenter] = useState<any>(latLong);
  const [zoom, setZoom] = useState(defaultZoom);
  // const [hue, setHue] = useState(0);
  // const color = `hsl(${hue % 360}deg 39% 70%)`;
  const [searchText, setSearchText] = useState<string>("");
  const [searchResult, setSearchResult] = useState<any>([]);
  const [itemClicked, setItemClicked] = useState<boolean>(false);
  const [placeName, setPlaceName] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const onDismiss = () => {
    setResult({ lat: center[0], lon: center[1], name: placeName, address });
    onClose(1);
  };

  useEffect(() => {
    const getPosition = (position: any) => {
      let coords = [position.coords.latitude, position.coords.longitude];
      // alert(latLong)
      if (latLong?.length  && latLong[0] && latLong[1]) {
        coords = latLong;
      }
      setCenter(coords);
      getPlaceName(coords);
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
          // alert('on LocationAccuracy')
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
                "requestPermission Error requesting location permissions >>" +
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
        (result) => {
          if (result.hasPermission) {
            //If having permission show 'Turn On GPS' dialogue
            askToTurnOnGPS();
          } else {
            //If not having permission ask for permission
            requestGPSPermission();
          }
        },
        (err) => {
          // alert("err>>>" + err);
        }
      );
    };

    checkGPSPermission();
    getLocationCoordinates();
    setZoom(defaultZoom);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const baseURL = `https://nominatim.openstreetmap.org/search.php?q=${searchText.replaceAll(
      " ",
      "+"
    )}&format=jsonv2&addressdetails=1`;

    axios.get(baseURL).then((res: any) => {
      setSearchResult(res.data);

      // console.log("res.data >>>", res.data);
    });
  }, [searchText]);

  const getPlaceName = (coords: any) => {
    const lat = coords[0],
      lon = coords[1];
    const baseURL = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=jsonv2&addressdetails=1`;
    axios.get(baseURL).then((res: any) => {
      setAddress(res.data.address);
      setPlaceName(res.data.display_name);
      // console.log("getPlaceName res.data >>>", res.data);
    });
  };
  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={onDismiss}
      className="ios modal-card hydrated show-modal modal-interactive modal-page"
    >
      <IonContent
        className="map-search"
        style={{
          maxHeight: `${
            70 + 64 * (searchResult.length >= 2 ? 2 : searchResult.length)
          }px`,
        }}
      >
        <IonSearchbar
          value={searchText}
          // onIonChange={(e: any) => setSearchText(e.detail.value!)}
          onKeyUp={(e: any) =>
            e.keyCode === 13 &&
            e.currentTarget.value!.length > 3 &&
            setSearchText(e.currentTarget.value!)
          }
        ></IonSearchbar>

        {searchResult && (
          <IonList>
            {searchResult.map((result: any, key: number) => {
              return (
                <IonItem
                  key={key}
                  onClick={() => {
                    setItemClicked(true);
                    setCenter([result.lat, result.lon]);
                    getPlaceName([result.lat, result.lon]);
                  }}
                >
                  {result.display_name}
                </IonItem>
              );
            })}
          </IonList>
        )}
      </IonContent>

      <Map
        provider={osm}
        // height={window.innerHeight}
        defaultCenter={center}
        defaultZoom={zoom}
        center={center}
        // zoom={zoom}
        onClick={(e: any) => {
          setCenter(e.latLng);
          getPlaceName(center);
        }}
        onBoundsChanged={({ center, zoom }) => {
          if (itemClicked) {
            setCenter(center);
            setZoom(zoom);
          }
          setItemClicked(false);
        }}
      >
        <Marker
          width={50}
          anchor={center}
          color="orange"
          // color={color}
          // onClick={() => setHue(hue + 20)}
        />
      </Map>
      <div className="button-container">
        <IonButton
          className="map-submit"
          onClick={() => {
            onDismiss();
          }}
        >
          Submit
        </IonButton>
      </div>
    </IonModal>
  );
};

export default AtModalMaps;
// https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&route=14.6924%2C120.9646%3B14.8438%2C120.8114#map=12/14.7709/120.9025
