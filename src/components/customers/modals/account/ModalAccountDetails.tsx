import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonModal,
  IonButtons,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonCard,
  IonCardContent,
  IonTextarea,
  IonText,
} from "@ionic/react";
import React, { useContext, useEffect, useState } from "react";
import {
  arrowBackOutline,
  phonePortraitOutline,
  person,
  mail,
  home,
  camera,
} from "ionicons/icons";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { usePhotoGallery } from "../../../../hooks/usePhotoGallery";
import AtModalMaps from "../../../common/AtModalMaps";
import axios from "axios";
import { PlatformContext } from "../../../../contexts/PlatformContext";

const ModalAccountDetails: React.FC<any> = ({
  isOpen,
  onClose,
  data,
  updateData,
}) => {
  const [result, setResult] = useState<any>([]);
  const [isOpenMaps, setIsOpenMaps] = useState<boolean>(false);
  const { photos, takePhoto, deletePhotos, uploadPhoto } = usePhotoGallery();
  const { platform } = useContext(PlatformContext);

  const [stateData, setStateData] = useState<any>(data);
  const getPlaceName = (coords: any) => {
    const lat = coords[0],
      lon = coords[1];
    const baseURL = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=jsonv2&addressdetails=1`;
    axios.get(baseURL).then((res: any) => {
      // console.log("res.data.address >>>>", res.data);
      setStateData({ ...stateData, location: res.data.display_name });
    });
  };

  useEffect(() => {
    if (isOpen) {
      window.localStorage.setItem("isProfileShown", "true");
      let { longitude, latitude } = data;
      setStateData({ ...stateData, longitude, latitude });

      getPlaceName([latitude, longitude]);
      /* Ibayo Street, Don Pablo Subdivision, Malinta, 1st District, Valenzuela, Northern Manila District, Metro Manila, 1478, Philippines */

      deletePhotos();
    }
    // eslint-disable-next-line
  }, [isOpen]);

  useEffect(() => {
    if (result) {
      // console.log("result >>>>", result);
      let addressData: any = { ...result?.address, municipality: "", city: "" };

      // console.log(">>>>", addressData?.state, addressData?.state_district);
      if (!addressData?.state && addressData?.state_district) {
        addressData = { ...addressData, state: addressData?.state_district };
      }
      if (!addressData?.municipality && addressData?.quarter) {
        addressData = { ...addressData, municipality: addressData?.quarter };
      }
      if (!addressData?.city && addressData?.town) {
        addressData = { ...addressData, city: addressData?.town };
      }
      if (
        !addressData?.neighbourhood &&
        (addressData?.residential || addressData?.amenity)
      ) {
        addressData = {
          ...addressData,
          neighbourhood: addressData?.residential || addressData?.amenity,
        };
      }
      const { name: location, lat: latitude, lon: longitude } = result;
      setStateData({
        ...stateData,
        ...addressData,
        location,
        latitude,
        longitude,
      });
    }
    // eslint-disable-next-line
  }, [result]);

  /*****
  const savePhoto = async (photo: any) => {
    const files: any = await uploadPhoto(photo);
    // console.log("filename>>>>", files[0]?.filename);
    setStateData({
      ...stateData,
      photo: files[0]?.path || files[0]?.webviewPath,
    });
    // setStateData({ ...stateData, photo: files[0]?.filename });
  };

  useEffect(() => {
    if (photos?.length > 0) {
      alert("photos >>>>"+JSON.stringify(photos));
      setStateData({ ...stateData, photo: photos[0]?.webviewPath });
      savePhoto(photos[0]);
    }
    // eslint-disable-next-line
  }, [photos]);
   */
  const savePhoto = async (photo: any) => {
    await uploadPhoto(photo);
  };

  useEffect(() => {
    if (photos?.length > 0) {
      // alert(photos[0]?.filepath);
      const filename = photos[0]?.filepath?.substring(
        photos[0]?.filepath?.lastIndexOf("/") + 1
      );
      setStateData({
        ...stateData,
        photo: photos[0]?.webviewPath,
        photo_profile: `${platform.uploadsPath}/${filename}`,
      });
      savePhoto(photos[0]);
    }
    // eslint-disable-next-line
  }, [photos]);

  const onDismiss = () => {
    deletePhotos();
    onClose(1);
  };

  const saveInfo = () => {
    // const categories = stateData?.categories?.join(",");
    // const newData = { ...stateData, categories };
    // updateData(newData);
    // alert("stateData?.photo>>>>" + stateData?.photo);
    // alert("stateData?.photo_profile>>>>" + stateData?.photo_profile);

    // const data = { ...stateData, photo: stateData?.photo_profile };
    // updateData(data);

    updateData(stateData);
    onClose(1);
  };
  const onClick_Photo = () => {
    takePhoto("user_profile_");
    // takePhoto();
  };
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onDismiss} at-default>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={onDismiss}>
              <IonIcon icon={arrowBackOutline} />
            </IonButton>
          </IonButtons>
          <IonTitle>My Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding pad-60-bottom">
        <IonCard color="none">
          <IonCardContent>
            <IonItem
              className="at-photo at-pad-20-bottom"
              color="none"
              lines="none"
            >
              <div className="at-photo-container">
                <img
                  alt=""
                  className="task-image-circle"
                  // slot="start"
                  src={
                    stateData?.photo
                      ? stateData?.photo
                      : "/assets/images/person-gold.png"
                  }
                  width="120"
                  height="120"
                ></img>
                <IonIcon
                  className="camera cursor-pointer"
                  icon={camera}
                  color="tertiary"
                  onClick={onClick_Photo}
                ></IonIcon>
              </div>
            </IonItem>
            <IonItem color="none" className="at-phone-number">
              <IonLabel
                position="floating"
                aria-label={`${stateData?.mobile_number + ""}`}
              >
                Mobile Number
              </IonLabel>
              <IonIcon
                color="primary"
                icon={phonePortraitOutline}
                size="small"
                slot="start"
              />
              <PhoneInput
                defaultCountry="PH"
                country="PH"
                value={stateData?.mobile_number}
                onChange={(value: any) =>
                  setStateData({ ...stateData, mobile_number: value! })
                }
                rules={{ required: true }}
              />
              <IonInput
                value={stateData?.mobile_number}
                onIonChange={(e) =>
                  setStateData({ ...stateData, mobile_number: e.detail.value! })
                }
                style={{ display: "none" }}
              />
            </IonItem>
            <IonItem color="none">
              <IonLabel position="floating">Full Name</IonLabel>
              <IonIcon
                color="primary"
                icon={person}
                size="small"
                slot="start"
              />
              <IonInput
                value={stateData?.name}
                onIonChange={(e) =>
                  setStateData({ ...stateData, name: e.detail.value! })
                }
              />
            </IonItem>{" "}
            <IonItem color="none">
              <IonLabel position="floating">Email Address</IonLabel>
              <IonIcon color="primary" icon={mail} size="small" slot="start" />
              <IonInput
                value={stateData?.email}
                onIonChange={(e) =>
                  setStateData({ ...stateData, email: e.detail.value! })
                }
                readonly={true}
                disabled={true}
              />
            </IonItem>
            <IonItem color="none">
              <IonLabel position="floating">Address</IonLabel>
              <IonIcon color="primary" icon={home} size="small" slot="start" />
              <IonTextarea
                value={stateData?.address}
                onIonChange={(e) =>
                  setStateData({ ...stateData, address: e.detail.value! })
                }
                rows={3}
              />
            </IonItem>
            <IonItem color="none" className="at-pad-10-right">
              <IonLabel slot="start" style={{ maxWidth: "80px" }}>
                Location
              </IonLabel>
              <IonText>{stateData?.location}</IonText>
              <IonButton
                slot="end"
                className="at-pad-10"
                onClick={() => setIsOpenMaps(true)}
              >
                Set Location Map
              </IonButton>
            </IonItem>
          </IonCardContent>
        </IonCard>
      </IonContent>
      <div className="at-menu-bottom">
        <IonButton expand="block" onClick={saveInfo}>
          Update Info
        </IonButton>
      </div>
      <AtModalMaps
        isOpen={isOpenMaps}
        onClose={() => {
          setIsOpenMaps(false);
        }}
        setResult={setResult}
        latLong={[data?.latitude, data?.longitude]}
      />
    </IonModal>
  );
};

export default ModalAccountDetails;
