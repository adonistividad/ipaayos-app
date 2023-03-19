import React, { useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/zoom";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

import { arrowBackOutline } from "ionicons/icons";
import {
  IonModal,
  IonHeader, 
  IonButtons,
  IonButton,
  IonIcon,
  IonLabel,
  IonTitle,
  IonContent,
} from "@ionic/react";
import "./ImageGallery.css";
import { Zoom, Navigation, EffectCoverflow } from "swiper";

const ImageGallery: React.FC<any> = ({
  isOpen,
  onClose,
  data,
  slideId,
  name,
}) => {
  const [mySwiper, setMySwiper] = useState<any>();

  const onDismiss = () => {
    onClose(1);
  };
  const zoomIn = (isZoomIn: boolean) => {
    const zoom: any = mySwiper.zoom;
    isZoomIn ? zoom.in() : zoom.out();
  };
  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={onDismiss}
      at-default
      className="avt-chat"
    >
      <IonHeader translucent>
        <IonButtons slot="start" className="at-pad-5 image-gallery-header">
          <IonButton onClick={onDismiss}>
            <IonIcon icon={arrowBackOutline} />
          </IonButton>
          <IonLabel className="at-pad-10-left"> {name}</IonLabel>
        </IonButtons>
        {/* 
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={onDismiss}>
              <IonIcon icon={arrowBackOutline} />
            </IonButton>

            <IonLabel className="at-pad-10-left"> {name}</IonLabel>
          </IonButtons>
          <IonTitle></IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onDismiss}></IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent> */}
        <Swiper
          className="image-gallery-swiper"
          onInit={(e: any) => setMySwiper(e)}
          initialSlide={data?.findIndex((dat: any) => dat.id === slideId)}
          centeredSlides={true}
          zoom={true}
          navigation={true}
          //   pagination={{
          //     clickable: true,
          //   }}
          //   modules={[Zoom, Navigation, Pagination]}
          modules={[Zoom, Navigation, EffectCoverflow]}
          effect="coverflow"
        >
          {data.length &&
            data?.map((dat: any, index: number) => {
              return (
                <SwiperSlide key={index}>
                  <div className="swiper-zoom-container">
                    <img loading="lazy" src={dat?.photo} />
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>
        {/* </IonContent> */}
      </IonHeader>
      {/* <>{console.log("data >>>>", data)}</> */}
      {/* <IonFooter>
        <IonButton onClick={() => zoomIn(true)}>Zoom In</IonButton>
        <IonButton onClick={() => zoomIn(false)}>Zoom Out</IonButton>
      </IonFooter> */}
    </IonModal>
  );
};

export default ImageGallery;
