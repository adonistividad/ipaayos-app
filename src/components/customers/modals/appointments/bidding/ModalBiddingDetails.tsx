import React, { useEffect, useState } from "react";
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonTitle,
  IonContent,
  IonLabel,
  IonCol,
  IonGrid,
  IonRow,
  IonCardSubtitle,
  IonCardTitle,
  IonSegment,
  IonSegmentButton,
  IonList,
  IonCard,
  IonCardContent,
  IonFooter,
} from "@ionic/react";
import { arrowBackOutline, locationOutline } from "ionicons/icons";
import AtItemDetails from "../../../../common/AtItemDetails";
import { Swiper, SwiperSlide } from "swiper/react";
import AtListItem from "../../../../common/AtListItem";
import { currencyFormat } from "../../../../../utils/helpers";
import ModalTaskSwiper from "./ModalTaskSwiper";
import { GetStarRating } from "./GetStarRating";
import { updateNotification } from "../../../../../hooks/redux/actions/notificationsAction";
import { useDispatch } from "react-redux";

const ModalBiddingDetails: React.FC<any> = ({
  isOpen,
  onClose,
  data,
  taskOffers,
  setTaskOffers,
  onChangeTabName,
}) => {
  const dispatch: any = useDispatch();
  const [status, setStatus] = useState<string>("shortlisted");
  const [mySwiper, setMySwiper] = useState<any>();
  const [dataOffers, setDataOffers] = useState<any>([]);
  const [showModal_SwiperCardStack, setShowModal_SwiperCardStack] =
    useState<boolean>(taskOffers > 0);
  const onDismiss = () => {
    onClose(1);
  };

  const onSetDataOffers = (offers: any) => {
    let offerList = [];
    console.log("offers >>>>", offers);
    if (offers.length > 0) {
      offerList = offers?.map((offer: any) => {
        const {
          photo,
          name: r1_c1,
          rating,
          about: r4_c1,
          mobile_number,
        } = offer?.provider;

        // console.log("offer >>>>", offer?.provider)
        const dat = {
          id: offer.id,
          photo,
          // r1_c1:offer.providers_profile.name,
          // r1_c2: currencyFormat(offer.estimated_cost, "₱"),
          // r2_c1: GetStarRating(offer.providers_profile),
          r1_c1,
          r1_c2: currencyFormat(offer.estimated_cost, "₱"),
          r2_c1: GetStarRating(rating),
          r2_c2: "5 days",
          r3_c1: "Solar Panel Installation",
          r3_c2: (
            <>
              <IonIcon icon={locationOutline} /> 2.5km away
            </>
          ),
          r4_c1,

          // title: offer.providers_profile.name,
          // title2: currencyFormat(offer.estimated_cost, "₱"),
          // subtitle: GetStarRating(rating),
          // subtitle2: "5 days",
          // remarks: "Solar Panel Installation",
          remarks2: (
            <>
              <IonIcon icon={locationOutline} /> 2.5km away
            </>
          ),
          // subremarks: offer.providers_profile.about,
          cssItem: "",
          cssTitle2: "",
          offer_status: offer.offer_status,
          mobile_number,
        };
        return dat;
      });
    }
    setDataOffers(offerList);
  };
  useEffect(() => {
    onSetDataOffers(taskOffers);
  }, [taskOffers]);

  // useEffect(() => {
  //   onSetDataOffers(taskOffers);
  // }, [taskOffers]);

  const openSwiperCardStack = (offerStatus: string) => {
    /**************
     
    setOffer_status(offerStatus);
    */
    setShowModal_SwiperCardStack(true);
  };
  const statusCountShortlisted = () => {
    return taskOffers?.filter(
      (offer: any) => offer.offer_status === "shortlisted"
    ).length;
    // return 0;
  };
  const statusCountDeclined = () => {
    return taskOffers?.filter((offer: any) => offer.offer_status === "declined")
      .length;
  };

  const onChangeType = (type: any) => {
    setStatus(type);
    if (type === "declined") {
      mySwiper.slideNext();
    } else {
      mySwiper.slidePrev();
    }
  };

  const onClickItem = (id: number) => {
    // alert("onClickItem id: " + id );
    // setCurrentData(data[id]);
    // setIsModalOpen(true);
  };

  const getShortlisted = () => {
    // console.log("taskOffers >>>>", taskOffers);
    // console.log("dataOffers >>>>", dataOffers);

    return dataOffers?.filter(
      (offer: any) => offer.offer_status === "shortlisted"
    );
  };
  const getDeclined = () => {
    return dataOffers?.filter(
      (offer: any) => offer.offer_status === "declined"
    );
  };
  const accordionShortlisted = () => {
    return (
      <IonList slot="content">
        {/* <>{console.log("data >>>", data)}</> */}
        {/* <>{console.log("getShortlisted() >>>", getShortlisted())}</> */}
        <AtListItem
          data={getShortlisted()}
          isMergedLine2={false}
          onClickItem={onClickItem}
          isChatEnable={true}
          isTextWrap={true}
          emptyMessage="No shorlisted task yet."
        />
      </IonList>
    );
  };
  const accordionDeclined = () => {
    return (
      <IonList slot="content">
        {/* <>{console.log("data >>>", data)}</> */}
        {/* <>{console.log("getDeclined() >>>", getDeclined())}</> */}
        <AtListItem
          data={getDeclined()}
          isMergedLine2={false}
          onClickItem={onClickItem}
          isChatEnable={true}
          isTextWrap={true}
          emptyMessage="No shorlisted task yet."
        />
      </IonList>
    );
  };

  const buttonSeeOffers = () => {
    let button: any = (
      <IonButton disabled={true} expand="block">
        No Offers Available
      </IonButton>
    );
    // if (isBooked) {
    //   button = (
    //     <IonButton
    //       expand="block"
    //       onClick={() => {
    //         onDismiss();
    //         onChangeTabName("booking");
    //       }}
    //     >
    //       See booking
    //     </IonButton>
    //   );
    // } else
    if (taskOffers?.filter((t: any) => !t.offer_status).length > 0) {
      button = (
        <IonButton expand="block" onClick={() => openSwiperCardStack("")}>
          See Offers
        </IonButton>
      );
    }

    return <div className="at-menu-bottom">{button}</div>;
  };

  // const refreshTaskOffers = (isInitial = false) => {
  const refreshTaskOffers = (newTaskOffers: any) => {
    // console.log("taskOffers >>>", taskOffers);
    console.log("newTaskOffers >>>", newTaskOffers);
    // alert("refreshTaskOffers")
    setTaskOffers(newTaskOffers);

    onSetDataOffers(newTaskOffers);
    const acceptedOffer = newTaskOffers?.find(
      (t: any) => t.offer_status === "accepted"
    );
    if (acceptedOffer) {
      onDismiss();
      onChangeTabName("booking");

      const user_id = window.localStorage.getItem("id");
      const sender_name= window.localStorage.getItem("name")
      // console.log("data>>>>", data)
      console.log("acceptedOffer>>>>", acceptedOffer)
      const {  provider_id, category } = acceptedOffer;
 
      dispatch(
        updateNotification({
          user_id,
          provider_id,
          message: `${sender_name} accepted your offer for ${category}`,
          recipient: process.env.REACT_APP_CHAT_RECIPIENT,
          url_param: "/appointments?m=booking",
        })
      );
    }

    // dispatch(fetchTaskOffers({ task_id: task.id }));
    // if (!isInitial) {
    //   refreshStatusCount();
    // }
  };

  return (
    <>
      <IonModal isOpen={isOpen} onDidDismiss={onDismiss}>
        <IonHeader color="none">
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={onDismiss}>
                <IonIcon icon={arrowBackOutline} />
              </IonButton>
            </IonButtons>
            <IonTitle className="at-center">Bidding</IonTitle>
            <IonButtons slot="end">
              <IonButton />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding" at-default-modal>
          <IonCard color="none" at-default className="at-margin-20-top">
            <AtItemDetails
              data={data}
              isTextWrap={true}
              textWrapRows={2}
              isShowMore={true}
            />
          </IonCard>

          <IonGrid>
            <IonRow className="at-center">
              <IonCol className="ion-no-padding">
                <IonCardTitle>{taskOffers?.length} </IonCardTitle>{" "}
                <IonCardSubtitle>offers</IonCardSubtitle>
              </IonCol>
              <IonCol className="ion-no-padding">
                <IonCardTitle>{statusCountShortlisted()}</IonCardTitle>{" "}
                <IonCardSubtitle>shortlisted</IonCardSubtitle>
              </IonCol>
              <IonCol className="ion-no-padding">
                <IonCardTitle>{statusCountDeclined()}</IonCardTitle>
                <IonCardSubtitle>declined</IonCardSubtitle>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>{buttonSeeOffers()}</IonCol>
            </IonRow>
          </IonGrid>
          <IonCard color="none" at-default>
            <IonSegment
              value={status}
              onIonChange={(e) => onChangeType(e.detail.value)}
            >
              <IonSegmentButton value="shortlisted">
                <IonLabel>shortlisted</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="declined">
                <IonLabel>declined</IonLabel>
              </IonSegmentButton>
            </IonSegment>

            <IonCardContent>
              {" "}
              <Swiper
                onInit={(e: any) => setMySwiper(e)}
                onSlideChange={(e: any) => {
                  setStatus(e.activeIndex === 1 ? "declined" : "shortlisted");
                  //-- left <0 | right >0
                  // console.log("e >>>",swiper.touches.diff < 0);
                  // console.log("e.touches.diff >>>", e.touches.diff);
                }}
              >
                <SwiperSlide className="height-80vh cursor-grab">
                  {accordionShortlisted()}
                </SwiperSlide>
                <SwiperSlide className="height-80vh cursor-grab">
                  {accordionDeclined()}
                </SwiperSlide>
              </Swiper>
            </IonCardContent>
          </IonCard>
        </IonContent>
        <IonFooter>{buttonSeeOffers()}</IonFooter>
      </IonModal>
      {taskOffers?.length > 0 && (
        <>
          {/* <AvtChatV2
            chatState={chatState}
            onClose={() => setChatState({ ...chatState, isOpen: false })}
          /> */}
          <ModalTaskSwiper
            isOpen={showModal_SwiperCardStack}
            onClose={() => setShowModal_SwiperCardStack(false)}
            data={data}
            taskOffers={taskOffers}
            refreshTaskOffers={refreshTaskOffers}
            // saveTaskOffer={saveTaskOffer}
            // offer_status={offer_status}
            // chatState={chatState}
            // setChatState={setChatState}
          />
        </>
      )}
      <>{/* {console.log("taskOffers >>>", taskOffers)} */}</>
    </>
  );
};

export default ModalBiddingDetails;
