import React, { useEffect } from "react";
import { IonApp, setupIonicReact } from "@ionic/react";
// import { Redirect, Route } from "react-router-dom";
// import { IonReactRouter } from "@ionic/react-router";
import "./App.css";

import { Provider } from "react-redux";
import store from "./hooks/redux/store";

/* Pages Imports */
// import Home from "./pages/Home";
// import Page1 from "./pages/Page1";
// import Page2 from "./pages/Page2";
import Main from "./components/Main";
import { Capacitor } from "@capacitor/core";
import { StatusBar } from "@awesome-cordova-plugins/status-bar";
import { PlatformProfider } from "./contexts/PlatformContext";
// import { AndroidFullScreen } from "@ionic-native/android-full-screen";
// import { NavigationBar } from "@ionic-native/navigation-bar";
import { App as CapacitorApp } from "@capacitor/app";

setupIonicReact();
// setupIonicReact({ mode: "md" });
// setupIonicReact({ mode: "ios" });

const App: React.FC = () => {
  const platform = Capacitor.getPlatform(); //-- web, ios, android
  useEffect(() => {
    /***************
    //-- auto-hide navigation bar on Android devices
    if (platform.toString() === "android") {
      const autoHideNavigationBar = true;
      NavigationBar.setUp(autoHideNavigationBar);

      // alert(platform.toString());

      //------- https://github.com/mesmotronic/cordova-plugin-fullscreen
      AndroidFullScreen.isImmersiveModeSupported()
        .then(() => {
          //--- remove comment to enable andriod fullscreen mode
          AndroidFullScreen.immersiveMode();
        })
        .catch((err: any) => console.log("err>>>", err));
    }
    ***************/
    /***************
   alert(platform.toString())
   ***************/
    if (platform.toString() === "android") {
      //-- let status bar overlay webview
      //  StatusBar.overlaysWebView(true);
      StatusBar.overlaysWebView(false);
      //  StatusBar.styleBlackOpaque();

      //-- set status bar to white
      StatusBar.backgroundColorByHexString("#000000");
    }
  }, [platform]);

  CapacitorApp.addListener("backButton", ({ canGoBack }) => {
    if (!canGoBack) {
      CapacitorApp.exitApp();
    } else {
      window.history.back();
    }
  });

  return (
    <Provider store={store}>
      <IonApp>
        <PlatformProfider>
          <Main />
        </PlatformProfider>
      </IonApp>
    </Provider>
  );
  // return (
  //   <Provider store={store}>
  //     <IonApp>
  //       <PlatformProfider>
  //         <Main />
  //       </PlatformProfider>
  //     </IonApp>
  //   </Provider>
  // );
};

export default App;
