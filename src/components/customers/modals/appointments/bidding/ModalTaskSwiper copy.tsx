import React, { useContext, useEffect, useState } from "react";
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
  IonFab,
  IonFabButton,
  IonFooter,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import {
  arrowBackOutline,
  checkboxOutline,
  callOutline,
  chatboxEllipsesOutline,
} from "ionicons/icons";
import AvtChat from "../../../../common/AvtChat";
import { PlatformContext } from "../../../../../contexts/PlatformContext";
import AvtSwiperCard from "../../../../common/AvtSwiperCard";
import SwiperTaskCard from "./SwiperTaskCard";
import { CallNumber } from "@ionic-native/call-number";
import ModalChat from "../../messages/ModalChat";
// import { AndroidPermissions } from "@ionic-native/android-permissions";

const ModalTaskSwiper: React.FC<any> = ({
  isOpen,
  onClose,
  taskOffers,
  refreshTaskOffers,
}) => {
  const { platform } = useContext(PlatformContext);
  const [isOpenChat, setIsOpenChat] = useState<boolean>(false);
  const [mobileNumber, setMobileNumber] = useState<string>("+971503908526");
  const [activeId, setActiveId] = useState<number>(0);
  const [dataIndex, setDataIndex] = useState<number>(taskOffers.length - 1);
  const [activeData, setActiveData] = useState<any>(null);

  const onDismiss = () => {
    onClose(1);
  };

  useEffect(() => {
    if (taskOffers && taskOffers.length > 0) {
      //   currentIndex.current =
      //     taskOffers?.filter((t: any) => t.offer_status === offer_status).length -
      //     1;
      //   setMobile_number(
      //     taskOffers[currentIndex.current]?.providers_profile?.mobile_number
      //   );
      const newId = taskOffers[dataIndex].id;
      setActiveId(newId);
      setMobileNumber(taskOffers[dataIndex]?.provider?.mobile_number);
      setActiveData({ user_id: 1, provider_id: 1, name: "Don Auric" });
    }
    // eslint-disable-next-line
  }, [taskOffers]);

  const onClickCall = () => {
    CallNumber.callNumber(mobileNumber, true)
      .then((res: any) => {
        console.log("Launched dialer!", res);
        // alert(`Launched dialer! ${res}`);
      })
      .catch((err: any) => {
        console.log("Error launching dialer", err);
        // alert(`Error launching dialer ${err}`);
      });

    // window.open(`tel:${mobileNumber}`, '_self');
  };
  const onClickAccept = () => {
    // alert(
    //   `onClickAccept \n id= ${activeId} \n dataIndex= ${dataIndex} \n name=${taskOffers[dataIndex].providers_profile.name}`
    // );
    updateStatus(activeId, "accepted", dataIndex);
    onDismiss();
  };
  const onClickChat = () => {
    setIsOpenChat(true);
  };

  const updateStatus: any = (
    id: number,
    status: string,
    currentIndex: number
  ) => {
    if (currentIndex >= 0) {
      const newId = taskOffers[currentIndex].id;
      setActiveId(newId);
      setMobileNumber(taskOffers[currentIndex]?.provider?.mobile_number);
    }
    setDataIndex(currentIndex);
    taskOffers.find((offer: any) => offer.id === id).offer_status = status;

    refreshTaskOffers(taskOffers);
    if (currentIndex < 0) {
      onDismiss();
    }

    // console.log("id, status >>>>>", id, status, currentIndex);
  };

  const cardObject = (task: any) => {
    return <SwiperTaskCard data={task} />;
  };
  return (
    <>
      <IonModal isOpen={isOpen} onDidDismiss={onDismiss} at-default-modal>
        <IonHeader color="none">
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={onDismiss}>
                <IonIcon icon={arrowBackOutline} />
              </IonButton>
            </IonButtons>
            <IonTitle className="at-center">iPaayos</IonTitle>
            <IonButtons slot="end">
              <IonButton />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent
          className="ion-padding"
          at-default-modal
          style={{ overflow: "hidden !important" }}
        >
          {taskOffers &&
            taskOffers.map((task: any, index: number) => {
              return (
                <AvtSwiperCard
                  key={index}
                  currentIndex={index}
                  data={task}
                  cardObject={cardObject(task)}
                  updateStatus={updateStatus}
                />
              );
            })}
        </IonContent>
        <IonFooter className="ion-no-border at-pad-10-bottom">
          <IonToolbar>
            <IonTabs>
              <IonRouterOutlet></IonRouterOutlet>
              <IonTabBar slot="bottom">
                <IonTabButton
                  onClick={onClickCall}
                  tab="call"
                  disabled={!mobileNumber || platform.name === "web"}
                >
                  <IonIcon icon={callOutline} />
                  {/* <IonLabel>CALL {mobileNumber}</IonLabel> */}
                  <IonLabel>CALL</IonLabel>
                </IonTabButton>

                <IonTabButton tab="book">
                  <IonFab vertical="center" horizontal="center">
                    <IonFabButton onClick={onClickAccept}>
                      <IonIcon icon={checkboxOutline} size="large"></IonIcon>
                    </IonFabButton>
                  </IonFab>
                </IonTabButton>

                <IonTabButton tab="chat" onClick={onClickChat}>
                  <IonIcon icon={chatboxEllipsesOutline} />
                  <IonLabel>CHAT</IonLabel>
                  {/* <IonBadge className="at-size-14 at-pad-5"> 5 </IonBadge> */}
                </IonTabButton>
              </IonTabBar>
            </IonTabs>
          </IonToolbar>
        </IonFooter>
      </IonModal>
      {activeData && (
        <ModalChat
          isOpen={isOpenChat}
          onClose={() => setIsOpenChat(false)}
          data={activeData}
          sender="customer"
        />
      )}

      <AvtChat
        isOpen={isOpenChat}
        onClose={() => setIsOpenChat(false)}
        /****
       
      task_id={taskOffers[currentIndex.current]?.task_id}
      user_id={platform.user_id}
      username={platform.username}
      provider_id={taskOffers[currentIndex.current]?.providers_profile?.id}
      provider_name={
        taskOffers[currentIndex.current]?.providers_profile?.name
      }
      */
      />
    </>
  );
};

export default ModalTaskSwiper;
