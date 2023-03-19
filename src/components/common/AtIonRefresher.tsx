import {
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
} from "@ionic/react";
import React from "react";
import { chevronDownCircleOutline } from "ionicons/icons";

const AtIonRefresher: React.FC<any> = ({ refreshData, refreshBadges }) => {
  const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    setTimeout(() => {
      if (typeof refreshData === "function") {
        refreshData();
      }
      if (typeof refreshBadges === "function") {
        refreshBadges();
      }
      event.detail.complete();
    }, 2000);
  };
  return (
    <>
      <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
        <br />
        <IonRefresherContent
          pullingIcon={chevronDownCircleOutline}
          pullingText="Pull to refresh"
          refreshingSpinner="circles"
          refreshingText="Refreshing..."
        ></IonRefresherContent>
      </IonRefresher>
      <p className="at-center cursor-pointer">
        Pull this content down to refresh.
      </p>
    </>
  );
};

export default AtIonRefresher;
