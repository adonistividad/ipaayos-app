import React, { useEffect, useState } from "react";
import {
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
  IonPage,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { eye, eyeOff } from "ionicons/icons";
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import { Device, DeviceInfo } from "@capacitor/device";
import { useDispatch, useSelector } from "react-redux";
import { userSignIn } from "../hooks/redux/actions/userAction";
import { RootStore } from "../hooks/redux/store";
import { emailValidate } from "../utils/helpers";
// import useAuth from "../hooks/useAuth";

const SignIn: React.FC<any> = () => {
  const dispatch: any = useDispatch();
  const userAuth = useSelector((state: RootStore) => state.user);
  // const { setAuth } = useAuth();
  const history = useHistory();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [state, setState] = useState<any>({});
  const [email, setEmail] = useState<string>("");
  // const [state, setState] = useState<any>({
  //   email: "a@a.com",
  //   password: "",
  //   social_login: "",
  //   message: "",
  // });

  useEffect(() => {
    const { id, userName, name, imageUrl, accessToken, isGoogle, status } =
      userAuth;
    if (status === 200) {
      let result: any = {
        id,
        userName,
        name,
        imageUrl,
        accessToken,
      };
      if (isGoogle) {
        result = { ...result, isGoogle };
      }
      persistAllData(result);
      window.location.href = "/post";
    }
    setState({ ...state, message: userAuth?.msg });
    // eslint-disable-next-line
  }, [userAuth]);

  const onSignIn = () => {
    const data = { ...state, email };
    dispatch(userSignIn(data));
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
      const user_name = email?.split("@")[0];

      const data = {
        email,
        password: "",
        user_name,
        name: `${givenName} ${familyName}`,
        photo: imageUrl,
        accessToken: authentication?.accessToken,
        social_login: "google",
      };
      dispatch(userSignIn(data));
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
  //   // setAuth({});
  // };

  const onChange_Email = (e: any) => {
    const newEmail = e.target.value!;
    if (emailValidate(newEmail)) {
      setEmail(newEmail);
    }
  };
  const onBlur_Email = (e: any) => {
    const newEmail = e.target.value!;
    let message = "";
    if (!emailValidate(newEmail)) {
      message = "Invalid email";
    }
    setState({ ...state, message });
  };
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
                <IonInput
                  name="email"
                  placeholder="Enter your email address"
                  onIonChange={onChange_Email}
                  onFocus={(e) => setState({ ...state, message: "" })}
                  onIonBlur={onBlur_Email}
                />
              </IonItem>
              <IonItem color="none">
                <IonLabel position="floating">Password</IonLabel>
                <IonInput
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={state.password}
                  // onFocus={(e) => setState({ ...state, message: "" })}
                  onIonChange={(e: any) => {
                    setState({ ...state, password: e.detail.value! });
                  }}
                  autocomplete="off"
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
              {state?.message && (
                // <div className="at-center">{state?.message}</div>
                <IonCardSubtitle className="at-center">
                  {state.message}
                </IonCardSubtitle>
              )}
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
      <>{console.log("state: ", state)}</>
      <>{console.log("email: ", email)}</>
    </IonPage>
  );
};

export default SignIn;
