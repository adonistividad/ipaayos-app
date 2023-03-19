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
import { Device, DeviceInfo } from "@capacitor/device";
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import { useDispatch, useSelector } from "react-redux";
import { userSignIn, userSignUp } from "../hooks/redux/actions/userAction";
import { RootStore } from "../hooks/redux/store";
import { emailValidate } from "../utils/helpers";
const SignUp: React.FC<any> = () => {
  const dispatch: any = useDispatch();
  const userAuth = useSelector((state: RootStore) => state.user);
  const history = useHistory();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [state, setState] = useState<any>({
    email: "",
    password: "",
    message: "",
  });

  useEffect(() => {
    if (userAuth?.status === 500) {
      setState({ ...state, message: userAuth?.msg });
      return;
    } else {
      const { id, userName, name, imageUrl, accessToken, isGoogle } = userAuth;
      let result: any = {
        id,
        userName,
        name,
        imageUrl,
        accessToken,
      };
      if (isGoogle) {
        result = { ...result, isGoogle };
        persistAllData(result);
        window.location.href = "/post";
      } else {
        // console.log("userAuth >>>>", userAuth?.status);
        localStorage.setItem("eml", email);
        if (userAuth?.status === 201) {
          window.location.href = "/signup-info";
        } else if (userAuth?.status === 202) {
          window.location.href = "/sign-otp";
        }
      }
    }
    // eslint-disable-next-line
  }, [userAuth]);

  // useEffect(() => {
  //   if (userAuth?.status === 200) {
  //     const { id, userName, name, imageUrl, accessToken, isGoogle } = userAuth;
  //     // alert("isGoogle >>>"+ isGoogle)
  //     let result: any = {
  //       id,
  //       userName,
  //       name,
  //       imageUrl,
  //       accessToken,
  //     };
  //     if (isGoogle) {
  //       result = { ...result, isGoogle };
  //     }
  //     persistAllData(result);
  //     window.location.href = "/account";
  //   }
  // }, [userAuth]);

  const saveData = () => {
    const user_name = email?.split("@")[0];
    const data = {
      email,
      password: state?.password,
      user_name,
      // name: `${givenName} ${familyName}`,
      // photo: imageUrl,
      // accessToken: authentication?.accessToken,
      social_login: "",
    };
    dispatch(userSignUp(data));
  };
  const SignUpHandler = () => {
    // if (!state?.email) {
    if (!email) {
      setState({ ...state, message: "Email address is required" });
      return;
    }
    if (!state?.password) {
      setState({ ...state, message: "Password is required" });
      return;
    }

    // if (state?.email) {
    if (email) {
      saveData();
      localStorage.setItem("eml", email);
      window.location.href = "/signup-info";
    }
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
  const onSignUpGoogle = async () => {
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
    console.log(newEmail, message);
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
                <h1> Sign Up</h1>
              </IonCardTitle>
              {/* <IonCardTitle>
                See what's your neighbor's <br /> home improvement projects{" "}
                <br /> right now
              </IonCardTitle> */}
              {/* <IonCardSubtitle>See what's your neighbor's home improvement projects right now</IonCardSubtitle> */}
            </IonCardHeader>
            <IonCardContent>
              <div className="flex flex-center">
                <h2>
                  Join <b>iPAAYOS</b> today
                </h2>
              </div>
              <IonItem color="none">
                <IonLabel position="floating">Email</IonLabel>
                {/* <IonInput
                  placeholder="Enter your email address"
                  value={state.email}
                  onFocus={(e) => setState({ ...state, message: "" })}
                  onIonChange={(e) =>
                    setState({ ...state, email: e.detail.value! })
                  }
                /> */}
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

              {state?.message && (
                // <div className="at-center">{state?.message}</div>
                <IonCardSubtitle className="at-center">
                  {state.message}
                </IonCardSubtitle>
              )}
              <IonButton
                expand="block"
                className="margin-20-tb"
                onClick={SignUpHandler}
              >
                Sign up with email
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
                onClick={onSignUpGoogle}
                color="secondary"
                style={{
                  backgroundColor: "var(--ion-text-color)",
                  color: "var(--ion-color-step-100)",
                  borderRadius: "4px",
                }}
              >
                <img src="/assets/images/google.png" width="20" alt="google" />{" "}
                &nbsp; Sign up with Google
              </IonButton>

              <IonItem lines="none" color="none">
                <IonCardSubtitle className="at-center">
                  By signin up, you agree to the{" "}
                  <a href="/signup">Terms of Service</a> <br />
                  and <a href="/signup">Privacy Policy</a> including{" "}
                  <a href="/signup">Cookie use</a>
                </IonCardSubtitle>
              </IonItem>

              <div className="flex flex-center margin-20-tb">
                <div>
                  Already have an account?{" "}
                  <a href="/signin" onClick={() => history.push("/signin")}>
                    Log In
                  </a>
                </div>
              </div>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SignUp;
