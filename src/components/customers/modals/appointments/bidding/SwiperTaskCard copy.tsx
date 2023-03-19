import {
  IonCard,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonIcon,
  IonRow,
} from "@ionic/react";
import React, { useEffect } from "react";
import { currencyFormat } from "../../../../../utils/helpers";
import { locationOutline } from "ionicons/icons";
import { GetStarRating } from "./GetStarRating";

const SwiperTaskCard: React.FC<any> = ({ data }) => {
  /****
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
      providers_profile: provider,
    } = data;
     */
  const {
    // id,
    // task_id,
    // currency,
    category,
    estimated_cost,
    // remarks,
    // images,
    estimated_time,
    provider,
  } = data;

  // const { rating } = data?.provider;
  /****
    id: 1,
    photo: "randy_legaspi.jpg",
    title: "Interior Decorations",
    title2: "19 Dec",
    subtitle: (
      <>
        <span className="at-bold at-size-14">9</span> offers |{" "}
        <span className="at-bold at-size-14">4</span> shortlisted |{" "}
        <span className="at-bold at-size-14">4</span> declined
      </>
    ),
    subtitle2: "11:30 AM",
    remarks2: "₱100 per hour",
    subremarks:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio fugit maxime id nemo alias quam delectus nesciunt nobis doloribus at, sit velit eligendi quisquam aut nulla voluptates rem! Ullam, aliquam?",
    cssItem: "at-border-primary",
    cssTitle2: "",
   */
  // useEffect(() => {
  //   // alert("Data >>>>" + JSON.stringify(data));
  //   // const dat = {
  //   //   id,
  //   //   photo: provider.photo,
  //   //   title: "Interior Decorations",
  //   //   title2: "19 Dec",
  //   //   subtitle: GetStarRating(provider),
  //   //   subtitle2: "11:30 AM",
  //   //   remarks2: "₱100 per hour",
  //   //   subremarks:
  //   //     "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio fugit maxime id nemo alias quam delectus nesciunt nobis doloribus at, sit velit eligendi quisquam aut nulla voluptates rem! Ullam, aliquam?",
  //   //   cssItem: "",
  //   //   cssTitle2: "",
  //   // };
  //   // setCurrentData(dat);
  //   // eslint-disable-next-line
  // }, [data]);

  return (
    <>
      <IonCard className="at-swiper-card" at-default>
        <IonGrid>
          <IonRow>
            <IonCol className="at-left" style={{ maxWidth: "74px" }}>
              <img
                alt=""
                className="task-image"
                src={`${provider.photo}`}
                width="60"
              />
            </IonCol>
            <IonCol>
              <IonRow>
                <IonCol className="at-left">
                  <IonCardTitle className="at-size-16">
                    {provider.name}
                  </IonCardTitle>
                </IonCol>
                <IonCol className="at-left">
                  <IonCardTitle className="at-size-16 at-right">
                    {currencyFormat(estimated_cost, "₱")}
                  </IonCardTitle>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol className="at-left">
                  <IonCardSubtitle className="at-size-12 ">
                    {GetStarRating(provider?.rating)}
                  </IonCardSubtitle>
                </IonCol>
                <IonCol className="at-right">
                  <IonCardSubtitle className="at-size-12 ">
                    {estimated_time}
                    {estimated_time <= 1 ? " day" : " days"}
                  </IonCardSubtitle>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol className="at-left">
                  <IonCardTitle className="at-size-14">
                    {category}
                  </IonCardTitle>
                </IonCol>
                <IonCol className="at-right">
                  <IonCardTitle className="at-size-14">
                    <IonIcon icon={locationOutline} /> {provider.distance} km
                    away
                  </IonCardTitle>
                </IonCol>
              </IonRow>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCardTitle className="at-size-16 at-margin-10-top">
              About
            </IonCardTitle>
            <p>{provider.about}</p>
          </IonRow>
        </IonGrid>
      </IonCard>
      {/* {console.log("data ===>>>", data)} */}
    </>
  );
};

export default SwiperTaskCard;
