import React, { useState } from "react";
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

const SignIn: React.FC<any> = () => {
  const history = useHistory();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [state, setState] = useState<any>({
    email: "",
    password: "",
    message: "",
  });
  const onLogin =()=>{
     //-- login test
    window.localStorage.setItem("provider","auric plumbing")
    window.location.href="/post";
  }
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
                <h1> Log In</h1>
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

                <IonButton fill="clear"
                  slot="end"
                  className="margin-30-top icon-button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <IonIcon icon={showPassword ? eyeOff : eye} className="at-size-24" color="dark"/>
                </IonButton>
 
              </IonItem>
              <div className="flex flex-right margin-20-tb">
                <a href="/forgot-password" 
                // onClick={() => history.push("/forgot-password")}
                >
                  Forgot password?
                </a>
              </div>
              <IonButton expand="block" className="margin-20-tb"
              onClick={onLogin}>
                Log In
              </IonButton>
               <div className="flex flex-center">
                <div>
                  New to iPaayos?{" "}
                  <a href="/signup" onClick={() => history.push("/signup")}>
                    Sign Up
                  </a>
                </div>
              </div>
              <br />
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SignIn;
