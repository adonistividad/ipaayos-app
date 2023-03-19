import React from "react";
import { logoGithub, menu } from "ionicons/icons";
import {
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonButton,
  IonIcon,
  IonMenuToggle,
} from "@ionic/react";

const Toolbar: React.FC<any> = () => {
  const toggleMenu = () => {
    const splitPane: any = document.querySelector("ion-split-pane");
    if (
      // window.matchMedia(SIZE_TO_MEDIA[splitPane.when] || splitPane.when).matches
      window.matchMedia(splitPane.when).matches
    ) {
      splitPane?.classList.toggle("split-pane-visible");
    }
  };
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>
        
        {/*******     
        <IonMenuToggle autoHide={false}>
          <IonButton onClick={toggleMenu}>
            <IonIcon icon={menu} />
          </IonButton>
        </IonMenuToggle> 
        **************/}

      </IonButtons>
      <IonTitle slot="end">Ionic React Template</IonTitle>
      <IonButtons slot="end">
        <IonButton href={"https://github.com/JamesBrightman"}>
          <IonIcon slot="icon-only" icon={logoGithub} />
        </IonButton>
      </IonButtons>
    </IonToolbar>
  );
};

export default Toolbar;
