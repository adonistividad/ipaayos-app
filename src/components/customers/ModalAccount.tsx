import React, { useEffect, useState } from "react";
import {
  IonLabel,
  IonContent,
  IonItem,
  IonButton,
  IonIcon,
  useIonAlert,
  IonModal,
  IonButtons,
  IonHeader,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  mail,
  documentLock,
  helpCircle,
  power,
  arrowBackOutline,
} from "ionicons/icons";
import Modals from "./modals/Modals";
import { MODALS } from "./modals";
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import useAuth from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../../hooks/redux/store";
import { fetchUser, updateUser } from "../../hooks/redux/actions/userAction";
const ModalAccount: React.FC<any> = ({ isOpen, onClose }) => {
  const dispatch: any = useDispatch();
  const user = useSelector((state: RootStore) => state.user);
  const [fallback, setFallback] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentModal, setCurrentModal] = useState<any>("");
  const [userPhoto, setUserPhoto] = useState<any>("");
  const [presentAlert] = useIonAlert();

  const { auth } = useAuth();

  const onDismiss = () => { 
    onClose(1);
  };

  const dispatchData: any = () => {
    dispatch(fetchUser(auth?.id));
  };

  useEffect(() => {
    if (auth?.id) {
      dispatchData();
    }
  }, [dispatch, auth]);

  const showModal = (modalName: any) => {
    setCurrentModal(MODALS[modalName].toString().toLowerCase());
    setIsModalOpen(true);
  };

  const onSignOutGoogle = async () => {
    await GoogleAuth.signOut();
    // setAuth({});
  };
  const onSignOut = async () => {
    if (window.localStorage.getItem("isGoogle")) {
      onSignOutGoogle();
    }
    window.localStorage.clear();
    window.location.href = "/";
  };

  const updateData = (data: any) => { 
    setUserPhoto(data?.photo);
    window.localStorage.setItem("imageUrl", data?.photo);
    const newData = { ...data, id: auth?.id, photo: data?.photo_profile };
    dispatch(updateUser(newData)); 
  };

  return (
    <>
      {currentModal && (
        <Modals
          component={currentModal}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
          }}
          data={user}
          updateData={updateData}
        />
      )}
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
        <IonContent className="ion-padding " scrollEvents={true}>
          <IonItem
            className="at-pad-20-bottom cursor-pointer"
            color="none"
            lines="none"
            detail={true}
            onClick={() => {
              showModal(MODALS.ACCOUNT);
            }}
          >
            <img
              className="task-image-circle"
              // slot="start"
              width="60"
              height="60" 
              src={
                userPhoto
                  ? userPhoto
                  : user?.photo
                  ? user?.photo
                  : "/assets/images/person-gold.png"
              }
              alt="iPaayos" 
            ></img>

            {/* <div className="pad-20-left">
              <IonLabel className="at-size-18"> {auth?.name}</IonLabel>
            <IonLabel className="at-opacity-5">+63 977 1794 521</IonLabel>
            <br />
          </div> */}
            <div className="at-pad-20-left">
              <IonLabel className="at-size-18">{user?.name}</IonLabel>
              <IonLabel className="at-opacity-5">
                {user?.mobile_number}
              </IonLabel>
            </div>
            <IonButton slot="end">Edit Profile</IonButton>
          </IonItem>

          <IonItem lines="none" color="none">
            <IonButton
              className="at-list-button"
              onClick={() => {
                showModal(MODALS.SUPPORT);
              }}
            >
              <IonIcon
                className="pad-10"
                color="primary"
                icon={mail}
                size="small"
              />
              <IonLabel className="pad-10-left">Support</IonLabel>
            </IonButton>
          </IonItem>
          <IonItem lines="none" color="none" disabled={true}>
            <IonButton
              className="at-list-button"
              onClick={() => {
                showModal(MODALS.TERMS);
              }}
            >
              <IonIcon
                className="pad-10"
                color="primary"
                icon={documentLock}
                size="small"
              />
              <IonLabel className="pad-10-left">Terms & Conditions</IonLabel>
            </IonButton>
          </IonItem>
          <IonItem lines="none" color="none" disabled={true}>
            <IonButton
              className="at-list-button"
              onClick={() => {
                showModal(MODALS.ACCOUNT);
              }}
            >
              <IonIcon
                className="pad-10"
                color="primary"
                icon={helpCircle}
                size="small"
              />
              <IonLabel className="pad-10-left">FAQs & Terms</IonLabel>
            </IonButton>
          </IonItem>
          <IonItem lines="none" color="none">
            <IonButton
              className="at-list-button"
              // onClick={onSignOut}
              onClick={() =>
                presentAlert({
                  header: "LOGOUT",
                  message: "Are you sure you want to logout?",
                  cssClass: "custom-alert",
                  buttons: [
                    {
                      text: "No",
                      cssClass: "alert-button-cancel",
                    },
                    {
                      text: "Yes",
                      cssClass: "alert-button-confirm",
                      // handler: () => {
                      //   onSignOut();
                      // },
                      handler: onSignOut,
                    },
                  ],
                })
              }
            >
              <IonIcon
                className="pad-10"
                color="primary"
                icon={power}
                size="small"
              />
              <IonLabel className="pad-10-left">Logout</IonLabel>
            </IonButton>
          </IonItem>
        </IonContent>
      </IonModal>
    </>
  );
};

export default ModalAccount;
