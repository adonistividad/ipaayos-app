import React from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
} from "@ionic/react";
const Successful: React.FC<any> = () => {
  const SuccessfulHandler = () => {
    window.location.href = "/signin";
  };
  return (
    <>
      <IonContent
        fullscreen={true}
        className="ion-padding "
        scrollEvents={true}
      >
        <div className="flex flex-right height-full user-sign">
          <IonCard>
            <IonCardHeader>
              <IonCardTitle className="flex flex-center">
                <h3 className="at-center">Successful Password Reset</h3>
              </IonCardTitle>
              <IonCardSubtitle className="at-center">
                You can now use your new password to login <br /> to your
                account.
              </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <IonButton
                expand="block"
                className="margin-20-tb"
                onClick={SuccessfulHandler}
                autoCapitalize="true"
              >
                Login
              </IonButton>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </>
  );
};

export default Successful;
