import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCol,
  IonGrid,
  IonImg,
  IonRow,
} from "@ionic/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Gesture, GestureConfig, createGesture } from "@ionic/core";
import "./AvtSwiperCard.css";
import StarRatings from "react-star-ratings";
import { PlatformContext } from "../../contexts/PlatformContext";
import { currencyFormat } from "../../utils/helpers";
// import {
//   chevronForwardCircleOutline,
//   chevronBackCircleOutline,
//   checkboxOutline,
//   bookOutline,
//   chatboxEllipsesOutline,
// } from "ionicons/icons";

const AvtSwiperCard: React.FC<any> = ({
  card,
  currentIndex,
  updateStatus,
  // childFunc,
}) => {
  const { platform } = useContext(PlatformContext);
  const cardElement = useRef<HTMLIonCardElement>(null);
  const [provider, setProvider] = useState<any>([]);
  const {
    // id,
    name,
    // photo,
    // rating,
    // reviews,
    // price,
    // days,
    // status,
    // category,
    // photoOffer,
    // description,
    ///////
    id,
    task_id,
    // provider_id,
    // category,
    currency,
    estimated_cost,
    estimated_time,
    remarks,
    // documents,
    images,
    // offer_datetime,
    // offer_status,
    // status,
    providers_profile,
  } = card;

  // const alertUser = () => {
  //   alert("You clicked!");
  //   swipeLeft();
  // };
  // useEffect(() => {
  //   alert()
  //   childFunc.current = alertUser;
  // }, [cardElement]);

  const swipeLeft = () => {
    cardElement.current!.style.transform = `translateX(-${
      window.innerWidth * 1.5
    }px)`;
    updateStatus(id, task_id, null, "declined", currentIndex);
    setTimeout(() => {
      cardElement.current!.style.display = "none";
    }, 100);
  };
  const swipeRight = () => {
    cardElement.current!.style.transform = `translateX(${
      window.innerWidth * 1.5
    }px)`;
    updateStatus(id, task_id, null, "shortlisted", currentIndex);
    setTimeout(() => {
      cardElement.current!.style.display = "none";
    }, 100);
  };
  useEffect(() => {
    setProvider(providers_profile);
    const initGesture = async () => {
      const windowWidth = window.innerWidth;
      if (cardElement.current === null) {
        return;
      }
      const options: GestureConfig = {
        el: cardElement.current,
        gestureName: "avt-swiper-card",
        onStart: () => {
          cardElement.current!.style.transition = "";
        },
        onMove: (detail) => {
          cardElement.current!.style.transform = `translate(${
            detail.deltaX
          }px, ${detail.deltaY}px) rotate(${detail.deltaX / 20}deg)`;
        },
        onEnd: (detail) => {
          cardElement.current!.style.transition = "0.3s ease-out";

          if (detail.deltaX > windowWidth / 3) {
            // do something
            swipeRight();
          } else if (detail.deltaX < -windowWidth / 3) {
            swipeLeft();
          } else {
            cardElement.current!.style.transform = "";
          }
        },
      };
      const gesture: Gesture = await createGesture(options);
      gesture.enable();
    };
    initGesture();
    // eslint-disable-next-line
  }, []);

  const getImage = (image: any) => {
    // const photo = images.split(",")[0];
    return `${platform.uploadsPath}${platform.username}/${image}`;
  };

  return (
    <>
      <IonCard ref={cardElement} className="avt-swiper-card">
        <IonCardHeader>
          <IonGrid className="at-center">
            <IonRow>
              <IonCol className="at-left" style={{ maxWidth: "100px" }}>
                <IonImg
                  className="task-image"
                  src={getImage(provider?.photo)}
                ></IonImg>
              </IonCol>
              <IonCol>
                <IonRow>
                  <IonCol className="ion-no-padding size-16 at-left ellipsis at-bold color-666">
                    {provider?.name}
                  </IonCol>
                  <IonCol
                    className="ion-no-padding size-16 at-right"
                    style={{ maxWidth: "200px" }}
                  >
                    <span className="ion-no-padding color-888 size-12">
                      {currency}
                    </span>
                    {""}
                    <b>{currencyFormat(estimated_cost, "")}</b>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol className="at-left ion-no-padding ellipsis color-666 size-12">
                    {provider?.rating?.toFixed(1).toString()}
                    <StarRatings
                      rating={provider?.rating}
                      starRatedColor="yellow"
                      starHoverColor="yellow"
                      starDimension="14px"
                      starSpacing="0px"
                      name="rating"
                    />
                    ({provider?.reviews})
                    {/* {provider?.reviews > 0 ? "reviews" : "review"} */}
                  </IonCol>
                  <IonCol className="at-right ion-no-padding" color="primary">
                    <span className="color-666 size-12">
                      {estimated_time} {estimated_time <= 1 ? "day" : "days"}
                    </span>
                  </IonCol>
                </IonRow>
                <IonRow>
                  {" "}
                  <IonCol className="at-left ion-no-padding">
                    <span className="color-444 size-12">
                      id:{id} | {provider?.categories}
                    </span>{" "}
                  </IonCol>
                </IonRow>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCardHeader>
        <IonCardContent>
          {images &&
            images?.split(",").length > 0 &&
            images?.split(",").map((image: any, index: number) => {
              return (
                <img
                  key={index}
                  draggable={false}
                  src={getImage(image)}
                  alt={name}
                  width="100%"
                />
              );
            })}
          <IonCardSubtitle>{remarks}</IonCardSubtitle>
          <IonRow className="size-12 at-left color-aaa">
            <IonCol>
              <div className="size-14 at-bold color-666">Location</div>
              <span>
                {provider?.city}, {provider?.state}
              </span>
            </IonCol>
          </IonRow>
          <IonRow className="size-12 at-left color-aaa">
            <IonCol>
              <div className="size-14 at-bold color-666">
                About the service provider
              </div>
              <span>{provider?.about}</span>
            </IonCol>
          </IonRow>
          <br />
          <br />
          <br />
        </IonCardContent>
      </IonCard>
    </>
  );
};

export default AvtSwiperCard;
