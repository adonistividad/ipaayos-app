import React, { useEffect, useState } from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { eye, eyeOff } from "ionicons/icons";
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import { Device, DeviceInfo } from "@capacitor/device";
import useAuth from "../hooks/useAuth";

const SignIn: React.FC<any> = () => {
  const { setAuth } = useAuth();
  const history = useHistory();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [state, setState] = useState<any>({
    email: "",
    password: "",
    message: "",
  });

  const onSignIn = () => {
    persistAllData({
      user: "Don",
      name: "Don Tividad",
      givenName: "Don",
      imageUrl: "/assets/images/adonis-tividad.jpg",
      accessToken: "",
    });
    setAuth({ user: "don", name: "don", imageUrl: "", accessToken: "" });
    window.location.href = "/account";
  };
  const onInitGoogle = async () => {
    const deviceInfo = await Device.getInfo();
    // alert("deviceName: "+(deviceInfo as unknown as DeviceInfo).platform)
    if ((deviceInfo as unknown as DeviceInfo).platform === "web") {
      GoogleAuth.initialize();
    }
  };

  useEffect(() => {
    //// GoogleAuth.initialize();
    onInitGoogle();
  }, []);

  const persistAllData: any = (data: any) => {
    Object.keys(data).map((key: any) => {
      // console.log("data[key] ", data[key]);
      return window.localStorage.setItem(key, data[key]);
    });
  };

  const onSignInGoogle = async () => {
    try {
      const authUser = await GoogleAuth.signIn();
      console.log("Google signin", authUser);
      const { email, familyName, givenName, imageUrl, authentication } =
        authUser;
      const username = email?.split("@")[0];

      const data: any = {
        user: username,
        name: `${givenName} ${familyName}`,
        givenName,
        imageUrl,
        accessToken: authentication?.accessToken,
        isGoogle: true,
      };
      persistAllData(data);
      setAuth(data);
      window.location.href = "/post";
    } catch (error: any) {
      alert("Google signin error: " + error);
      console.log("Google signin error", error);
    }
  };
  // const onAuthRefresh = async () => {
  //   const authCode = await GoogleAuth.refresh();
  //   console.log("Refresh", authCode);
  // };

  // const onSignOutGoogle = async () => {
  //   await GoogleAuth.signOut();
  //   setAuth({});
  // };

  return (
    <IonPage>
      <IonContent
        fullscreen={true}
        className="ion-padding "
        scrollEvents={true}
      >
        <div className="flex flex-right height-full user-sign">
          <IonCard>
            <IonCardHeader>
              <div className="flex flex-center">
                {/* <img
                  alt=""
                  src="../assets/images/ipaayos-logo.png"
                  height="64"
                /> */}
                <img
                  alt=""
                  src="../assets/images/ipaayos-logo-word.png"
                  height="64"
                />
              </div>
              <IonCardTitle className="flex flex-center">
                <h1> Sign In</h1>
              </IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
              <div className="flex flex-center">
                <h2>
                  Join <b>iPAAYOS</b> today
                </h2>
              </div>
              <IonItem color="none">
                <IonLabel position="floating">Email</IonLabel>
                <IonInput placeholder="Enter your email address"></IonInput>
              </IonItem>
              <IonItem color="none">
                <IonLabel position="floating">Password</IonLabel>
                <IonInput
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={state.password}
                  onFocus={(e) => setState({ ...state, message: "" })}
                  onIonChange={(e) =>
                    setState({ ...state, password: e.detail.value! })
                  }
                />

                <IonButton
                  fill="clear"
                  slot="end"
                  className="margin-30-top icon-button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <IonIcon
                    icon={showPassword ? eyeOff : eye}
                    className="at-size-24"
                    color="dark"
                  />
                </IonButton>
              </IonItem>
              <div className="flex flex-right margin-20-tb">
                <a
                  href="/forgot-password"
                  // onClick={() => history.push("/forgot-password")}
                >
                  Forgot password?
                </a>
              </div>
              <IonButton
                expand="block"
                className="margin-20-tb"
                onClick={onSignIn}
              >
                Sign in with email
              </IonButton>
              <div
                className="at-center"
                style={{ color: "var(--ion-text-color)" }}
              >
                or
              </div>

              <IonButton
                expand="block"
                className="margin-20-tb"
                onClick={onSignInGoogle}
                color="secondary"
                style={{
                  backgroundColor: "var(--ion-text-color)",
                  color: "var(--ion-color-step-100)",
                  borderRadius: "4px",
                }}
              >
                <img src="/assets/images/google.png" width="20" alt="google" />{" "}
                &nbsp; Sign in with Google
              </IonButton>

              <div className="flex flex-center">
                <div>
                  New to iPaayos?{" "}
                  <a href="/signup" onClick={() => history.push("/signup")}>
                    Sign Up
                  </a>
                </div>
              </div>
              {/* <IonButton onClick={onAuthRefresh}>Refresh</IonButton>
              <IonButton onClick={onSignOutGoogle}>SignOut</IonButton> */}
              <br />
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SignIn;
