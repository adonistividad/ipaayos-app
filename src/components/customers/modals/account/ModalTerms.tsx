import { 
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonModal,
  IonButtons,
  IonIcon,
} from "@ionic/react";
import React from "react";
import { arrowBackOutline } from "ionicons/icons";
const ModalTerms: React.FC<any> = ({
  isOpen,
  onClose,
  // setResult
}) => {
    
  const onDismiss = () => {
    // setResult({ lat: center[0], lon: center[1], name: placeName });
    onClose(1);
  };
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={onDismiss}>
              <IonIcon icon={arrowBackOutline} />
            </IonButton>
          </IonButtons>
          <IonTitle>Terms & Conditions</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <p className="pad-20">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni illum
          quidem recusandae ducimus quos reprehenderit. Veniam, molestias quos,
          dolorum consequuntur nisi deserunt omnis id illo sit cum qui. Eaque,
          dicta.
        </p>
      </IonContent>
    </IonModal>
  );
};

export default ModalTerms;
