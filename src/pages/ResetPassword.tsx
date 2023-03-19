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
} from "@ionic/react";
import { eye, eyeOff } from "ionicons/icons";
import { useDispatch } from "react-redux";
import { updateUser } from "../hooks/redux/actions/userAction";
const ResetPassword: React.FC<any> = () => {
  const dispatch: any = useDispatch();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [state, setState] = useState<any>({
    password: "",
    passwordConfirm: "",
    message: "",
  });

  useEffect(() => {
    const email = localStorage.getItem("eml");
    setState({ ...state, email });
     // eslint-disable-next-line
  }, []);

  const ResetPasswordHandler = () => {
    if (!state?.password) {
      setState({ ...state, message: "Password is required" });
      return;
    }
    if (state?.password !== state?.passwordConfirm) {
      setState({ ...state, message: "Password does not match" });
      return;
    }
    ////-- API call reset password
    if (state?.password) {
      dispatch(updateUser(state));
      localStorage.removeItem("eml");
      window.location.href = "/successful";
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
              <IonCardTitle className="flex flex-center">
                <h1>Reset Password</h1>
              </IonCardTitle>
              <IonCardSubtitle>
                {" "}
                Enter you new password below, we're just being extra safe.
              </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
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
              </IonItem>{" "}
              <IonItem color="none">
                <IonLabel position="floating">Confirm Password</IonLabel>
                <IonInput
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={state.passwordConfirm}
                  onFocus={(e) => setState({ ...state, message: "" })}
                  onIonChange={(e) =>
                    setState({ ...state, passwordConfirm: e.detail.value! })
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
              <IonCardSubtitle className="at-center">
                {state.message}
              </IonCardSubtitle>
              <br />
              <br />
              <br />
              <IonButton
                expand="block"
                className="margin-20-tb"
                onClick={ResetPasswordHandler}
                autoCapitalize="true"
              >
                Reset Password
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

export default ResetPassword;
