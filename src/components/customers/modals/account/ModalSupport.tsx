import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonModal,
  IonButtons,
  IonIcon,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonCardSubtitle,
  IonInput,
  IonTextarea,
} from "@ionic/react";
import React, { useState } from "react";
import { arrowBackOutline, call, mail, create } from "ionicons/icons";
const ModalSupport: React.FC<any> = ({
  isOpen,
  onClose,
  // setResult
}) => {
  const [state, setState] = useState<any>({
    email: "",
    message: "",
  });

  const onDismiss = () => {
    // setResult({ lat: center[0], lon: center[1], name: placeName });
    onClose(1);
  };
  const saveInfo =()=>{
    alert("Info updated \n"+ 
    JSON.stringify(state) );
    onClose(1);
  }
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onDismiss} at-default>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={onDismiss}>
              <IonIcon icon={arrowBackOutline} />
            </IonButton>
          </IonButtons>
          <IonTitle></IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard color="none">
          <IonCardHeader>
            <IonCardTitle>Support</IonCardTitle>
            <IonCardSubtitle>
              Let us know your inquiries and feedback
            </IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            <IonItem color="none" lines="none">
              <IonIcon color="primary" icon={call} size="small" slot="start" />
              <IonLabel slot="start">
                Call us
                <div className="at-size-18 at-text-color">+63 977 1794 521</div>
              </IonLabel>
            </IonItem>
            <IonItem color="none" lines="none">
              <IonIcon color="primary" icon={mail} size="small" slot="start" />
              <IonLabel slot="start">
                Email us
                <div className="at-size-18 at-text-color">
                  support@ipaayos.com
                </div>
              </IonLabel>
            </IonItem>
          </IonCardContent>
        </IonCard>
        <IonCard className="at-border-radius at-pad-20">
          <IonCardHeader>
            <IonCardTitle>Or Write Us</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem color="none">
              <IonLabel position="floating">Email Address</IonLabel>
              <IonIcon color="primary" icon={mail} size="small" slot="start" />
              <IonInput
                value={state.email}
                onFocus={(e) => setState({ ...state, message: "" })}
                onIonChange={(e) =>
                  setState({ ...state, email: e.detail.value! })
                }
              />
            </IonItem>
            <IonItem color="none">
              <IonLabel position="floating">Write your message</IonLabel>
              <IonIcon color="primary" icon={create} size="small" slot="start" />
              <IonTextarea 
                value={state.message}
                onFocus={(e) => setState({ ...state, message: "" })}
                onIonChange={(e) =>
                  setState({ ...state, message: e.detail.value! })
                }
              />
            </IonItem>
          </IonCardContent>
        </IonCard>
      </IonContent>
      <div className="at-menu-bottom">
        <IonButton expand="block" onClick={saveInfo}>Submit</IonButton>
      </div>
    </IonModal>
  );
};

export default ModalSupport;
