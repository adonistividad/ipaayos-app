import React, { useState } from "react";
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
import { useDispatch } from "react-redux";
import { resendOTP } from "../hooks/redux/actions/userAction";
const ForgotPassword: React.FC<any> = () => {
  const dispatch: any = useDispatch();
  const [state, setState] = useState<any>({
    email: "",
    message: "",
  });

  const ForgotPasswordHandler = () => {
    if (!state?.email) {
      setState({ ...state, message: "Email address is required" });
      return;
    }
    dispatch(resendOTP(state));
    localStorage.setItem("eml", state?.email);
    window.location.href = "/sign-otp?mode=reset-password";
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
                <h1>Forgot Password</h1>
              </IonCardTitle>
              <IonCardSubtitle>
                {" "}
                Enter the email and we'll send you instructions <br /> to reset
                your password.
              </IonCardSubtitle>
              {/* Enter you new password below, we're just being extra safe */}
            </IonCardHeader>
            <IonCardContent>
              <IonItem color="none">
                <IonLabel position="floating">Email</IonLabel>
                <IonInput
                  placeholder="Enter your email address"
                  value={state.email}
                  onFocus={(e) => setState({ ...state, message: "" })}
                  onIonChange={(e) =>
                    setState({ ...state, email: e.detail.value! })
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
                onClick={ForgotPasswordHandler}
                autoCapitalize="true"
              >
                Send Instructions
              </IonButton>
              <div className="flex flex-center margin-20-tb">
                <div>
                  <a href="/signin">Log In</a>
                </div>
              </div>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </>
  );
};

export default ForgotPassword;
