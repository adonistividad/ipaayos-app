import React, { useEffect, useState } from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent, 
  IonInput,
  IonItem,
  IonLabel,
} from "@ionic/react"; 
const SignUpInfo: React.FC<any> = () => { 
  const [state, setState] = useState<any>({
    email: "",
    name: "",
    mobile_number: "",
    message: "",
  });

  useEffect(() => {
    const email = localStorage.getItem("eml");
    if (email) {
      setState({ ...state, email });
    } else {
      window.location.href = "/signup";
    }
    // eslint-disable-next-line
  }, []);

  const SignUpHandler = () => {
    if (!state?.name) {
      setState({ ...state, message: "Full Name is required" });
      return;
    }
    if (!state?.mobile_number) {
      setState({ ...state, message: "Mobile Number is required" });
      return;
    }

    if (state?.email) {
      localStorage.setItem("eml", state?.email);
      window.location.href = "/sign-otp";
    }
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
              <div className="flex flex-center">
                <img alt="" src="../assets/images/ipaayos-logo.png" width="64" />
              </div>
              <IonCardTitle className="flex flex-center">
                <h1> Sign Up Info</h1>
              </IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
              <div className="flex flex-center">
                <h2>
                  We've sent you OTP on below given email: <br />
                  <b> {state.email}</b>
                </h2>
              </div>
              <IonItem color="none">
                <IonLabel position="floating">Full Name</IonLabel>
                <IonInput
                  placeholder="Enter your full name"
                  value={state.name}
                  onFocus={(e) => setState({ ...state, message: "" })}
                  onIonChange={(e) =>
                    setState({ ...state, name: e.detail.value! })
                  }
                />
              </IonItem>
              <IonItem color="none">
                <IonLabel position="floating">Mobile Number</IonLabel>
                <IonInput
                  placeholder="Enter your mobile number"
                  value={state.mobile_number}
                  onFocus={(e) => setState({ ...state, message: "" })}
                  onIonChange={(e) =>
                    setState({ ...state, mobile_number: e.detail.value! })
                  }
                />
              </IonItem>
              <IonCardSubtitle className="at-center">
                {state.message}
              </IonCardSubtitle>

              <br />
              <br />
              <br />
              <IonButton
                expand="block"
                className="margin-20-tb"
                onClick={SignUpHandler}
              >
                Sign Up
              </IonButton>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </>
  );
};

export default SignUpInfo;
