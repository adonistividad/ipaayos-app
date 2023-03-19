import { IonSearchbar } from "@ionic/react";
import React, { createRef, useEffect } from "react";

const AtSearchBar: React.FC<any> = ({ setSearchText }) => {
  const refSearchbar = createRef<HTMLIonSearchbarElement>();

  useEffect(() => {
    if (refSearchbar.current) {
      if (typeof refSearchbar.current.setFocus !== "undefined") {
        // console.log("GOING TO SET FOCUS");
        refSearchbar.current.setFocus();
        
      } else {
        // console.log("FUNCTION DOESN'T EXIST?");
      }
    }

    setTimeout(() => {
      if (refSearchbar.current) {
        // console.log("GOING TO SET FOCUS AFTER TIMEOUT");
        refSearchbar.current.setFocus();
        // console.log(refSearchbar.current);
      }
    }, 1000);
  }, [refSearchbar]);

  return (
    <IonSearchbar
      ref={refSearchbar}
      onIonChange={(e) => setSearchText(e.detail.value!)}
    />
  );
};

export default AtSearchBar;
