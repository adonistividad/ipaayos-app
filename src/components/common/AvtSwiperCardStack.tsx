import React, { useContext, useEffect, useRef, useState } from "react";
import "./AvtSwiperCardStack.css";
import {
  IonModal,
  IonContent,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonHeader,
  IonTitle,
  IonFab,
  IonFabButton,
  IonFooter,
  IonLabel,
  IonItem,
  // IonBadge,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonRouterOutlet,
} from "@ionic/react";
import AvtSwiperCard from "./AvtSwiperCard";
import {
  arrowForwardOutline,
  arrowBackOutline,
  checkboxOutline,
  callOutline,
  chatboxEllipsesOutline,
} from "ionicons/icons";
import { CallNumber } from "@ionic-native/call-number";
import { PlatformContext } from "../../contexts/PlatformContext";
import AvtChat from "./AvtChat";
// import { useSelector } from "react-redux";
// import { RootStore } from "../../hooks/redux/store";

const AvtSwiperCardStack: React.FC<any> = ({
  isOpen,
  onClose,
  taskOffers,
  saveTaskOffer,
  refreshTaskOffers,
  offer_status = "",
  // setChatState,
}) => {
  const { platform } = useContext(PlatformContext);
  // const taskOffers = useSelector((state: RootStore) => state.taskOffers);

  // const [taskOffers, setAllTaskOffers] = useState<any>(taskOffers)
  const currentIndex = useRef<number>(taskOffers.length - 1);
  const [showInstructions, setShowInstructions] = useState<boolean>(true);
  const [mobile_number, setMobile_number] = useState<string>("");
  const [showModal_Chat, setShowModal_Chat] = useState<boolean>(false);

  const onDismiss = () => {
    refreshTaskOffers();
    onClose(1);
  };

  useEffect(() => {
    if (taskOffers && taskOffers.length > 0) {
      currentIndex.current =
        taskOffers?.filter((t: any) => t.offer_status === offer_status).length -
        1;
      setMobile_number(
        taskOffers[currentIndex.current]?.providers_profile?.mobile_number
      );
    }
    // eslint-disable-next-line
  }, [taskOffers]);

  const updateStatus: any = (
    id: number,
    task_id: number,
    provider_id: number,
    status: string
  ) => {
    // console.log("taskOffers >>>>", currentIndex.current, taskOffers);
    saveTaskOffer({
      id,
      offer_status: status,
      task_id,
      provider_id,
    });

    if (
      ["shortlisted", "declined"].includes(status) &&
      currentIndex.current >= 0
    ) {
      currentIndex.current = currentIndex.current - 1;
    }
    if (status === "accepted" || currentIndex.current < 0) {
      onDismiss();
    } else {
      setMobile_number(
        taskOffers[currentIndex.current]?.providers_profile?.mobile_number
      );
    }
    // taskOffers[currentIndex.current] = {
    //   ...taskOffers[currentIndex.current],
    //   offer_status: status,
    // };
    // console.log("taskOffers >>>>", currentIndex.current, taskOffers);
  };
  const onCallNumber = () => {
    // console.log(
    //   "providers_profile >>>>",
    //   taskOffers[currentIndex.current]?.providers_profile
    // );
    const phoneNumber =
      taskOffers[currentIndex.current]?.providers_profile?.mobile_number;
    alert("call number " + phoneNumber);
    try {
      CallNumber.callNumber(phoneNumber, true)
        .then((res: any) => console.log("Launched dialer!", res))
        .catch((err: any) => console.log("Error launching dialer", err));
    } catch (error) {
      console.log("Error launching dialer >>>", error);
    }
  };

  // const openChat = () => {
  //   setChatState({
  //     isOpen: true,
  //     task_id: taskOffers[currentIndex.current]?.task_id,
  //     user_id: platform.user_id,
  //     username: platform.username,
  //     provider_id: taskOffers[currentIndex.current]?.providers_profile?.id,
  //     provider_name: taskOffers[currentIndex.current]?.providers_profile?.name,
  //   });
  // };
  return (
    <>
      <IonModal isOpen={isOpen} onDidDismiss={onDismiss}>
        <IonHeader translucent>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={onDismiss}>
                <IonIcon icon={arrowBackOutline} />
              </IonButton>
            </IonButtons>
            <IonTitle className="at-center color-primary">taskagram</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={onDismiss}>
                {/* <IonIcon icon={arrowBackOutline}/> */}
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen className="ion-padding ion-content-default">
          {showInstructions && (
            <div
              className="avt-swiper-instructions"
              onClick={() => setShowInstructions(false)}
            >
              <div className="avt-swiper-instructions-container at-center">
                <img
                  src="/assets/images/swipe-left-right.gif"
                  alt="instructions"
                />
                <IonItem className="at-center">
                  <div>
                    <IonIcon icon={arrowBackOutline} size="large"></IonIcon>
                  </div>
                  <IonLabel className="color-aaa">
                    swipe left to <b className="color-primary">DECLINE</b>{" "}
                  </IonLabel>
                </IonItem>
                <IonItem className="at-center">
                  <IonLabel className="color-aaa">
                    {" "}
                    swipe right to <b className="color-primary">
                      SHORTLIST
                    </b>{" "}
                  </IonLabel>
                  <div>
                    <IonIcon icon={arrowForwardOutline} size="large"></IonIcon>
                  </div>
                </IonItem>
                <IonItem className="at-center">
                  <IonLabel className="color-aaa"> Tap check box </IonLabel>
                  <div>
                    <IonIcon icon={checkboxOutline} size="large"></IonIcon>
                  </div>
                  <IonLabel className="color-aaa">
                    to <b className="color-primary"> BOOK</b> task
                  </IonLabel>
                </IonItem>
              </div>
            </div>
          )}

          <div className="avt-swiper-container">
            {taskOffers &&
              taskOffers.length > 0 &&
              !showModal_Chat &&
              // taskOffers?.filter((t: any) => t.offer_status === "").length > 0 &&
              taskOffers?.filter((t: any) => t.offer_status === offer_status)
                .length > 0 &&
              taskOffers
                // ?.filter((t: any) => t.offer_status === "")
                ?.filter((t: any) => t.offer_status === offer_status)
                .map((dummyCard: any, index: number) => (
                  <AvtSwiperCard
                    // childFunc={childFunc}
                    key={index}
                    card={dummyCard}
                    currentIndex={index}
                    updateStatus={updateStatus}
                  />
                ))}
          </div>
        </IonContent>
        <IonFooter className="ion-no-border" style={{ height: "60px" }}>
          <IonTabs>
            <IonRouterOutlet></IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton
                tab="call"
                disabled={!mobile_number || platform.name === "web"}
              >
                <IonIcon icon={callOutline} onClick={() => onCallNumber()} />
                <IonLabel onClick={() => onCallNumber()}>Call</IonLabel>
              </IonTabButton>

              <IonTabButton tab="book">
                <IonFab vertical="center" horizontal="center">
                  <IonFabButton
                    onClick={() => {
                      updateStatus(
                        taskOffers[currentIndex.current].id,
                        taskOffers[currentIndex.current].task_id,
                        taskOffers[currentIndex.current].providers_profile?.id,
                        "accepted"
                      );
                    }}
                  >
                    <IonIcon icon={checkboxOutline} size="large"></IonIcon>
                  </IonFabButton>
                </IonFab>
              </IonTabButton>

              <IonTabButton tab="chat">
                <IonIcon
                  icon={chatboxEllipsesOutline}
                  onClick={() => setShowModal_Chat(true)}
                  // onClick={() => openChat()}
                />
                <IonLabel onClick={() => setShowModal_Chat(true)}>
                  {/* <IonLabel onClick={() => openChat()}>*/}
                  Chat
                </IonLabel>
                {/* <IonBadge>6</IonBadge> */}
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonFooter>
      </IonModal>

      {taskOffers && taskOffers?.length > 0 && (
        <AvtChat
          isOpen={showModal_Chat}
          onClose={() => setShowModal_Chat(false)}
          task_id={taskOffers[currentIndex.current]?.task_id}
          user_id={platform.user_id}
          username={platform.username}
          provider_id={taskOffers[currentIndex.current]?.providers_profile?.id}
          provider_name={
            taskOffers[currentIndex.current]?.providers_profile?.name
          }
        />
      )}
      {/* {console.log("taskOffers >>>>", currentIndex.current, taskOffers)} */}
    </>
  );
};

export default AvtSwiperCardStack;
