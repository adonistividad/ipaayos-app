import React from "react";
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
} from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";

const TemplateModal: React.FC<any> = ({ isOpen, onClose, data }) => {
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
            <IonTitle className="at-center">Template Modal</IonTitle>
            <IonButtons slot="end">
              <IonButton />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding" at-default-modal>
          <IonCard color="none" at-default>
            <IonCardContent>
              <IonItem color="none" lines="none">
                <IonLabel>Title Label</IonLabel>
                <IonInput placeholder="Sample place holder" />
              </IonItem>
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonModal>{" "}
    </>
  );
};

export default TemplateModal;
