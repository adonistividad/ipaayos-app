import React, { useEffect, useState } from "react";
import { IonItem, IonLabel, IonSelect, IonSelectOption } from "@ionic/react";
import {
  regions,
  provinces,
  cities,
  barangays,
} from "select-philippines-address";

const AtAddressPhilippines = () => {
  const [allRegions, setAllRegions] = useState([]);
  const [allProvinces, setAllProvinces] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const [allBarangays, setAllBarangays] = useState([]);
  const [state, setState] = useState({
    region: "",
    province: "",
    city: "",
    barangay: "",
  });

  const getRegions = () => {
    regions().then((region) => {
      setAllRegions(region);
      setState({ ...state, province: "", city: "", barangay: "" });
    });
  };
  const getProvinces = (code) => {
    provinces(code).then((province) => setAllProvinces(province));
    // setState({ ...state, city: "", barangay: "" });
  };
  const getCities = (code) => {
    cities(code).then((city) => setAllCities(city));
    // setState({ ...state, barangay: "" });
  };
  const getBarangays = (code) => {
    barangays(code).then((barangay) => setAllBarangays(barangay));
  };

  useEffect(() => {
    getRegions();
  }, []);

  return (
    <div>
      <>
        <IonItem color="none">
          <IonLabel
            position="floating"
            className={`${
              state?.categories?.length > 0 ? "ion-select-label" : ""
            }`}
          >
            Select region
          </IonLabel>
          <IonSelect
            value={state?.region}
            onIonChange={(e) => {
              setState({ ...state, region: e.detail.value });
              getProvinces(e.detail.value);
            }}
          >
            {allRegions?.length > 0 &&
              allRegions?.map((option, i) => (
                <IonSelectOption value={option?.region_code} key={i}>
                  {option?.region_name}
                </IonSelectOption>
              ))}
          </IonSelect>
        </IonItem>
        <IonItem color="none">
          <IonLabel
            position="floating"
            className={`${
              state?.categories?.length > 0 ? "ion-select-label" : ""
            }`}
          >
            Select province
          </IonLabel>
          <IonSelect
            value={state?.province}
            onIonChange={(e) => {
              setState({ ...state, province: e.detail.value });
              getCities(e.detail.value);
            }}
          >
            {allProvinces?.length > 0 &&
              allProvinces?.map((option, i) => (
                <IonSelectOption value={option?.province_code} key={i}>
                  {option?.province_name}
                </IonSelectOption>
              ))}
          </IonSelect>
        </IonItem>
        <IonItem color="none">
          <IonLabel
            position="floating"
            className={`${
              state?.categories?.length > 0 ? "ion-select-label" : ""
            }`}
          >
            Select city / town
          </IonLabel>
          <IonSelect
            value={state?.city}
            onIonChange={(e) => {
              setState({ ...state, city: e.detail.value });
              getBarangays(e.detail.value);
            }}
          >
            {allCities?.length > 0 &&
              allCities?.map((option, i) => (
                <IonSelectOption value={option?.city_code} key={i}>
                  {option?.city_name}
                </IonSelectOption>
              ))}
          </IonSelect>
        </IonItem>
        <IonItem color="none">
          <IonLabel
            position="floating"
            className={`${
              state?.categories?.length > 0 ? "ion-select-label" : ""
            }`}
          >
            Select barangay
          </IonLabel>
          <IonSelect
            value={state?.barangay}
            onIonChange={(e) => {
              setState({ ...state, barangay: e.detail.value });
            }}
          >
            {allBarangays?.length > 0 &&
              allBarangays?.map((option, i) => (
                <IonSelectOption value={option?.brgy_code} key={i}>
                  {option?.brgy_name}
                </IonSelectOption>
              ))}
          </IonSelect>
        </IonItem>
      </>
    </div>
  );
};

export default AtAddressPhilippines;
