import {
  IonItem,
  IonLabel,
  IonCardTitle,
  IonCardSubtitle,
  IonImg,
  IonText,
} from "@ionic/react";
import React, { useState } from "react";
import { useIsOverflow } from "../../hooks/useIsOverflow";

const AtItemDetails: React.FC<any> = ({
  data,
  isMergedLine2 = false,
  isTextWrap = false,
  isShowMore = false,
  textWrapRows = 1,
  isImageCircle = true,
  rows = 4,
}) => {
  const ref: any = React.useRef(); 
  const isOverflow = useIsOverflow(ref, (isOverflowFromCallback: any) => {
    // console.log("isOverflowFromCallback >>>>", isOverflowFromCallback);
  });
  const ellipsis = `at-text-wrap${textWrapRows > 1 ? "-" + textWrapRows : ""}`;
  const [showMoreText, setShowMoreText] = useState<string>(ellipsis);
  const [fallback, setFallback] = useState(false);
  const {
    id,
    photo,
    r1_c1,
    r1_c2,
    r2_c1,
    r2_c2,
    r3_c1,
    r3_c2,
    r4_c1,
    cssR1_c2,
    cssItem,
  } = data;

  const showMoreButton = () => {
    return (
      isOverflow && (
        <button
          className="at-size-12 show-more"
          onClick={() => setShowMoreText(showMoreText ? "" : ellipsis)}
        >
          ...show {showMoreText ? "more" : "less"}
        </button>
      )
    );
  };
  const getImageSrc = () => {
    return photo
      ? photo?.includes("http")
        ? `${photo}?${Date.now()}`
        : `/assets/images/${photo}?${Date.now()}`
      : "/assets/images/ipaayos-logo.jpg";
  };
  const reloadSrc = (e: any) => {
    if (fallback) {
      e.target.src = "/assets/images/ipaayos-logo.jpg";
    } else {
      e.target.src = getImageSrc();
      setFallback(true);
    }
  };
  return (
    <>
      <div className={`at-list-item rows-${rows}`} id={id}>
        <IonImg
          alt="iPaayos"
          className={`at-item-image at-item-image${
            isImageCircle ? "-circle" : ""
          }`}
          src={getImageSrc()}
          onError={reloadSrc}
        />
        <IonItem lines="none" className={`${cssItem}`}>
          <IonLabel position="stacked" slot="start"></IonLabel>
          {(r1_c1 || r1_c2) && (
            <IonText className="at-item-row">
              {r1_c1 && (
                <IonCardTitle className="at-size-16 at-text-wrap">
                  {r1_c1}
                </IonCardTitle>
              )}
              {r1_c2 && (
                <IonCardTitle
                  className={`at-size-14 at-text-wrap ${
                    r1_c1 ? "at-right" : ""
                  }  ${cssR1_c2}`}
                >
                  {r1_c2}
                </IonCardTitle>
              )}
            </IonText>
          )}
          {r2_c1 && (
            <div className="at-item-row ">
              <IonCardSubtitle className="at-size-12 at-text-wrap">
                {" "}
                {r2_c1}
              </IonCardSubtitle>
              <IonCardSubtitle className="at-size-12 at-right">
                {r2_c2}
              </IonCardSubtitle>
            </div>
          )}
          {r3_c1 && (
            <div className="at-item-row ">
              <p className="at-size-14 at-text-wrap"> {r3_c1}</p>
              <p className="at-size-14 at-right">{r3_c2}</p>
            </div>
          )}
          {r4_c1 && (
            <div>
              <IonCardSubtitle className="at-size-12">
                <p className={`${isTextWrap ? showMoreText : ""}`} ref={ref}>
                  {r4_c1}
                  {isShowMore && showMoreButton()}
                </p>
              </IonCardSubtitle>
            </div>
          )}
        </IonItem>
      </div>
    </>
  );
};

export default AtItemDetails;
