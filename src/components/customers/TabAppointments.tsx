import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonLabel, 
  IonSegment,
  IonSegmentButton, 
} from "@ionic/react"; 

import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import AppointmentsBidding from "./modals/appointments/AppointmentsBidding";

import AppointmentsBooking from "./modals/appointments/AppointmentsBooking";
import AppointmentsHistory from "./modals/appointments/AppointmentsHistory";
import { fetchTasks } from "../../hooks/redux/actions/tasksAction";
import { useDispatch } from "react-redux";
import AtIonRefresher from "../common/AtIonRefresher";

const TabAppointments: React.FC<any> = () => {
  const dispatch: any = useDispatch();
  const tabNames = ["Bidding", "Booking", "History"];
  const [tabName, setTabName] = useState<any>("bidding");
  const [mySwiper, setMySwiper] = useState<any>();

  const refreshData = () => { 
    dispatch(fetchTasks());
  };
   
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const m = urlParams.get("m");
    if (m) {
      setTabName(m);
    }
    // }, []);
    // eslint-disable-next-line
  }, [window.location.search]);

  const onChangeTabName = (type: any) => {
    const slideNo = tabNames.findIndex(
      (tab: any) => tab.toLowerCase() === type
    );
    mySwiper.slideTo(slideNo);
  };

  return (
    <>
      <IonContent className="ion-padding " scrollEvents={true}>
        <IonSegment
          value={tabName}
          onIonChange={(e) => onChangeTabName(e.detail.value)}
          className="sticky-header"
        >
          <IonSegmentButton value="bidding">
            <IonLabel
              style={{ textTransform: "none" }}
              className="at-bold size-16"
            >
              Bidding
            </IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="booking">
            <IonLabel
              style={{ textTransform: "none" }}
              className="at-bold size-16"
            >
              Booking
            </IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="history">
            <IonLabel
              style={{ textTransform: "none" }}
              className="at-bold size-16"
            >
              History
            </IonLabel>
          </IonSegmentButton>
        </IonSegment>
 
        <Swiper
          onInit={(e: any) => setMySwiper(e)}
          onSlideChange={(e: any) =>
            setTabName(tabNames[e.activeIndex].toLowerCase())
          }
          initialSlide={tabNames.findIndex(
            (tab) => tab.toLowerCase() === tabName
          )}
        >
          <SwiperSlide className="min-height-80vh cursor-grab">
            <AppointmentsBidding onChangeTabName={onChangeTabName} />
          </SwiperSlide>
          <SwiperSlide className="min-height-80vh cursor-grab">
            <AppointmentsBooking />
          </SwiperSlide>
          <SwiperSlide className="min-height-80vh cursor-grab">
            <AppointmentsHistory />
          </SwiperSlide>
        </Swiper>

        {/* <AtIonRefresher refreshData={refreshData} /> */}
      </IonContent>
    </>
  );
};

export default TabAppointments;
