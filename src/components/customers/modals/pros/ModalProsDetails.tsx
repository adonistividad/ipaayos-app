import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonModal,
  IonButtons,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonCardTitle,
  IonCardSubtitle,
  IonCard,
  IonCardContent,
} from "@ionic/react";
import React, { useState } from "react";
import { arrowBackOutline } from "ionicons/icons";
import ModalSendMessage from "../ModalSendMessage";
// import { formatDateTime } from "../../../../utils/helpers";
// import AtModalMap from "../../../common/AtModalMap";
// import AvtChat from "../../../common/AvtChat";
// import StarRatings from "react-star-ratings";

const ModalProsDetails: React.FC<any> = ({
  isOpen,
  onClose,
  data,
  isReadOnly = false,
}) => {
  const [isOpenSendMessage, setIsOpenSendMessage] = useState<boolean>(false);
  const { photo, r1_c1, r1_c2, r2_c1, r2_c2, r4_c1 } = data;

  const onDismiss = () => {
    onClose(1);
  };

  return (
    <>
      <IonModal isOpen={isOpen} onDidDismiss={onDismiss}>
        <IonHeader color="none">
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={onDismiss}>
                <IonIcon icon={arrowBackOutline} />
              </IonButton>
            </IonButtons>
            <IonTitle className="at-center">Provider Details</IonTitle>
            <IonButtons slot="end">
              <IonButton />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding" at-default-modal>
          <IonCard color="none" at-default>
            <IonCardContent>
              <IonList>
                <div className="at-item-list">
                  <img
                    alt="iPaayos"
                    className="task-image-circle"
                    src={
                      photo
                        ? photo?.includes("http")
                          ? photo
                          : `/assets/images/${photo}`
                        : "/assets/images/ipaayos-logo.jpg"
                    }
                    width="60"
                    height="60"
                  />
                  <IonItem lines="none">
                    <IonLabel position="stacked" slot="start"></IonLabel>
                    {r1_c1 && (
                      <IonCardTitle className="at-size-16">
                        <span className="column at-size-18">{r1_c1}</span>
                        <span className="at-text-wrap column at-right color-primary">
                          {r1_c2}
                        </span>
                      </IonCardTitle>
                    )}
                    {r2_c1 && (
                      <IonCardSubtitle className="at-size-12 at-margin-5-top">
                        <span className="at-text-wrap column">{r2_c1}</span>
                        <span
                        // className={`${isMergedLine2 ? "" : "column-2 at-right"}`}
                        >
                          {r2_c2}
                        </span>
                      </IonCardSubtitle>
                    )}
                    {/*                   
                    <IonCardSubtitle className="at-size-12 at-margin-20-top">
                      <span className="column">Task Category</span>
                      <span className="column">Task Cost</span>
                    </IonCardSubtitle>
                    <IonCardTitle className="at-size-14 at-margin-5-top">
                      <span className="column">{remarks}</span>
                      <span className="column">{remarks2}</span>
                    </IonCardTitle> */}

                    <IonCardSubtitle className="at-size-12 at-margin-20-top">
                      <span>Description</span>
                    </IonCardSubtitle>
                    <IonCardTitle className="at-size-14 at-margin-5-top">
                      <span>{r4_c1}</span>
                    </IonCardTitle>

                    <span className="at-margin-10-top"></span>
                  </IonItem>
                </div>
              </IonList>
            </IonCardContent>
          </IonCard>
        </IonContent>
        <div className="at-menu-bottom">
          <IonButton expand="block" onClick={() => setIsOpenSendMessage(true)}>
            {/* <IonIcon icon={thumbsUp} className="at-size-14 at-pad-10-right" />{" "} */}
            &nbsp;Send Message
          </IonButton>
          {/* <IonButton expand="block" onClick={saveInfo}>
            &nbsp;Book Provider
          </IonButton>
          <IonButton expand="block" onClick={saveInfo}>
            &nbsp;Book Provider
          </IonButton> */}
        </div>
      </IonModal>

      {/* <AtModalMap
        isOpen={isOpenMaps}
        onClose={() => {
          setIsOpenMaps(false);
        }}
        setResult={setResult}
        destination={{ lat: 25.270083, lng: 55.3203976 }} //-- reef mall
      />

      <AvtChat isOpen={isOpenChat} onClose={() => setIsOpenChat(false)} /> */}
      {isOpen && (
        <ModalSendMessage
          isOpen={isOpenSendMessage}
          onClose={() => {
            setIsOpenSendMessage(false);
          }}
          data={data}
        />
      )}
      {/* <>{console.log("data>>>>>", data)}</> */}
    </>
  );
};

export default ModalProsDetails;
//-- Should refresh every 5 minutes if task status is PENDING to check on Booking Confirmation
