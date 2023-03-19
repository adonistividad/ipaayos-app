import React, { useEffect, useState } from "react";
import {
  IonAlert,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { eye, eyeOff } from "ionicons/icons";
import qs from "qs";
import { useDispatch, useSelector } from "react-redux";
import { resendOTP, verifyOTP } from "../hooks/redux/actions/userAction";
import { RootStore } from "../hooks/redux/store";

const SignOTP: React.FC<any> = () => {
  const dispatch: any = useDispatch();
  const userAuth = useSelector((state: RootStore) => state.user);
  const [showOTP, setShowOTP] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<any>(false);
  const [state, setState] = useState<any>({
    email: "",
    otp: "",
    message: "",
    mode: "",
  });

  useEffect(() => {
    const email = localStorage.getItem("eml");
    const queryString = window.location.search.replace(/^\?/, "");
    const queryParams = qs.parse(queryString);
    if (email) {
      setState({ ...state, email, mode: queryParams?.mode });
    } else {
      window.location.href = "/signup";
    }

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    //  console.log("userAuth>>>", userAuth)
    if (userAuth?.status === 500) {
      setState({ ...state, message: userAuth?.msg });
    } else if (
      userAuth?.status === 200 &&
      !userAuth?.msg?.toLowerCase().includes("sent")
    ) {
      if (state?.mode !== "reset-password") {
        localStorage.removeItem("eml");
      }
      const { id, userName, name, imageUrl, accessToken, isGoogle, status } =
        userAuth?.user;
      let result: any = {
        id,
        userName,
        name,
        imageUrl: imageUrl === undefined ? "" : imageUrl,
        accessToken,
      };
      if (isGoogle) {
        result = { ...result, isGoogle };
      }
      persistAllData(result);
      window.location.href = state.mode ? `/${state?.mode}` : "/";
    }
    // eslint-disable-next-line
  }, [userAuth]);

  const SignUpHandler = () => {
    if (!state?.otp) {
      setState({ ...state, message: "OTP is required" });
      return;
    }
    dispatch(verifyOTP(state));
    /****
      if (state?.otp !== "1234") {
        setState({ ...state, message: "Invalid OTP" });
        return;
      }
      // alert(state.email)
      // if (state?.email || state?.mode) { 
      localStorage.removeItem("eml");
      window.location.href = state.mode ? `/${state?.mode}` : "/home";
      // }
    */
  };
  const onClick_ResendOTP = () => {
    dispatch(resendOTP(state));
    setShowAlert(true);
  };
  const persistAllData: any = (data: any) => {
    Object.keys(data).map((key: any) => {
      // console.log("data[key] ", data[key]);
      return window.localStorage.setItem(key, data[key]);
    });
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
                <img
                  alt=""
                  src="../assets/images/ipaayos-logo.png"
                  width="64"
                />
              </div>
              <IonCardTitle className="flex flex-center">
                <h1> Verification</h1>
              </IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
              <div className="flex flex-center">
                <h2>
                  Enter verification code sent to: <br /> <b> {state.email}</b>
                </h2>
              </div>
              <IonItem color="none">
                <IonLabel position="floating">Enter Code</IonLabel>
                <IonInput
                  name="otp"
                  placeholder="Enter code"
                  type={showOTP ? "text" : "password"}
                  value={state?.otp}
                  onFocus={(e) => setState({ ...state, message: "" })}
                  onIonChange={(e) =>
                    setState({ ...state, otp: e.detail.value! })
                  }
                />
                <IonButton
                  fill="clear"
                  slot="end"
                  className="margin-30-top icon-button"
                  onClick={() => setShowOTP(!showOTP)}
                >
                  <IonIcon
                    icon={showOTP ? eyeOff : eye}
                    className="at-size-24"
                    color="dark"
                  />
                </IonButton>
              </IonItem>
              <IonCardSubtitle className="at-center">
                {state.message}
              </IonCardSubtitle>

              <div className="at-right margin-10-tb cursor-pointer">
                <a onClick={onClick_ResendOTP}>Resend OTP</a>
              </div>
              <br />
              <IonButton
                expand="block"
                className="margin-20-tb"
                onClick={SignUpHandler}
              >
                Confirm
              </IonButton>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header="Resend OTP"
        // subHeader="Important message"
        message={`Verification code resent to: ${state?.email}`}
        buttons={["OK"]}
      />
    </>
  );
};

export default SignOTP;
