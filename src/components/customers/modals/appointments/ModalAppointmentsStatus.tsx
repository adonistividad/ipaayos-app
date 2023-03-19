import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonModal,
  IonButtons,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonCardTitle,
  IonCardSubtitle,
  IonCard,
  IonCardContent,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import {
  arrowBackOutline,
  navigateCircle,
  // thumbsUp,
  chatbubbleEllipses,
  checkmarkCircle,
} from "ionicons/icons";
import { formatDateTime } from "../../../../utils/helpers";
// import AtModalMaps from "../../../common/AtModalMaps";
// import AtModalMap from "../../../common/AtModalMap";
import AtModalMap from "../../../common/AtModalMap";
import AvtChat from "../../../common/AvtChat";
import StarRatings from "react-star-ratings";

enum BUTTON_ACTION {
  CHAT,
  TASK_START,
  TASK_COMPLETED,
  RATE_REVIEW,
}

const ModalAppointmentsStatus: React.FC<any> = ({
  isOpen,
  onClose,
  data,
  isReadOnly = false,
}) => {
  const [result, setResult] = useState<any>([]);
  const [isOpenMaps, setIsOpenMaps] = useState<boolean>(false);
  const [isOpenChat, setIsOpenChat] = useState<boolean>(false);

  const [statuses, setStatuses] = useState<any>([
    {
      name: "Pending",
      prefix: "Requested on",
      datetime: "21 June, 11:10 am",
      remarks: "",
    },
    {
      name: "Accepted",
      prefix: "Confirmed on",
      datetime: "21 June, 12:10 pm",
      remarks: "Usually confirms in 24 hour",
    },
    {
      name: "In Progress",
      prefix: "Task started on",
      datetime: "",
      remarks: "Task should start upon arrival",
    },
    {
      name: "Completed",
      prefix: "Task completed on",
      datetime: "",
      remarks: "",
    },
  ]);
  const [state, setState] = useState<any>({
    status: "Pending",
  });

  useEffect(() => {
    const statusList = statuses.filter((status: any) => status.datetime);
    setState({ ...state, status: statusList[statusList.length - 1].name });
    //  console.log( statusList[statusList.length-1])
    // eslint-disable-next-line
  }, [statuses]);

  const onDismiss = () => {
    // setResult({ lat: center[0], lon: center[1], name: placeName });
    onClose(1);
  };

  // const onClickLocation = () => {
  //   alert("onClickLocation");
  // };
  // const saveInfo = () => {
  //   alert("Info updated \n" + JSON.stringify(state));
  //   onClose(1);
  // };

  const updateStatus = (statusName: string) => {
    const index = statuses.findIndex(
      (status: any) => status.name?.toLowerCase() === statusName.toLowerCase()
    );
    let newStatus = statuses;
    newStatus[index] = {
      ...newStatus[index],
      datetime: formatDateTime(
        new Date().toString(),
        "dd MMMM, hh:mm aaaaa'm'"
      ),
    };
    setStatuses(newStatus);
    setState({ ...state, status: statusName });
  };

  const onClickButton = (action: BUTTON_ACTION) => {
    switch (action) {
      case BUTTON_ACTION.CHAT:
        break;
      case BUTTON_ACTION.TASK_START:
        // const statusName = "In Progress";
        updateStatus("In Progress");

        break;
      case BUTTON_ACTION.TASK_COMPLETED:
        updateStatus("Completed");
        break;
      case BUTTON_ACTION.RATE_REVIEW:
        break;
    }
  };
  const statusButton = () => {
    let buttonLabel = "",
      action = BUTTON_ACTION.CHAT;
    switch (state.status.toLowerCase()) {
      case "pending":
        action = BUTTON_ACTION.CHAT;
        buttonLabel = "Chat";
        break;
      case "accepted":
        action = BUTTON_ACTION.TASK_START;
        buttonLabel = "Start Task";
        break;
      case "in progress":
        action = BUTTON_ACTION.TASK_COMPLETED;
        buttonLabel = "Complete Task";
        break;
      case "completed":
        action = BUTTON_ACTION.RATE_REVIEW;
        buttonLabel = "Rate / Review";
        break;
    }

    return (
      <IonButton expand="block" onClick={() => onClickButton(action)}>
        {/* <IonIcon icon={thumbsUp} className="at-size-14 at-pad-10-right" /> */}
        &nbsp; {buttonLabel}
      </IonButton>
    );
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
            <IonTitle className="at-center">Task Status</IonTitle>
            <IonButtons slot="end">
              <IonButton />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding" at-default-modal>
          <IonCard color="none" at-default>
            <IonCardContent>
              <IonItem color="none" lines="none">
                <IonLabel className="task-status">
                  {statuses &&
                    statuses.map((status: any, index: number) => {
                      const currentStatus =
                        state.status === status.name ? "current-status" : "";
                      return (
                        <div
                          key={index}
                          className={`task-status-item ${currentStatus}`}
                        >
                          <div className="status-checkmark">
                            <IonIcon
                              icon={checkmarkCircle}
                              color={`${status.datetime ? "primary" : ""}`}
                            />
                          </div>
                          <div> {status.name}</div>
                          <IonCardSubtitle className="at-size-12">
                            {/* {status.datetime
                              ? status.prefix + " " + status.datetime
                              : status.remarks}{" "} */}
                            {status.datetime ? status.datetime : status.remarks}
                            &nbsp;
                          </IonCardSubtitle>
                        </div>
                      );
                    })}
                </IonLabel>
                <IonLabel className="at-center">
                  <div>
                    <img
                      alt=""
                      className="task-image"
                      src={`/assets/images/person-gold.png`}
                      width="120"
                    ></img>
                  </div>
                  {/* <IonButton>
                    <IonIcon
                      icon={thumbsUp}
                      className="at-size-14 at-pad-10-right"
                    />{" "}
                    &nbsp;Complete Task
                  </IonButton> */}
                </IonLabel>
              </IonItem>
            </IonCardContent>
          </IonCard>
          <IonCard color="none" at-default>
            <IonCardContent>
              <IonList>
                <div className="at-item-list">
                  <img
                    alt=""
                    className="task-image"
                    src={`/assets/images/${data?.photo}`}
                    width="60"
                  ></img>
                  <IonItem lines="none">
                    <IonLabel position="stacked" slot="start"></IonLabel>
                    <IonCardTitle className="at-size-18 at-margin-10-top">
                      <div className="column-2">
                        {data.title}
                        <br />
                        <IonCardSubtitle className="at-size-12">
                          {data?.rating?.toFixed(1).toString()}
                          <StarRatings
                            rating={data?.rating}
                            starRatedColor="goldenrod"
                            starHoverColor="goldenrod"
                            starDimension="14px"
                            starSpacing="0px"
                            name="rating"
                          />
                          ({data?.reviews})
                        </IonCardSubtitle>
                      </div>
                      {!isReadOnly && (
                        <span
                          className="column-2 at-right at-pad-10-left at-cursor-pointer at-size-24"
                          // onClick={onClickChat}
                          onClick={() => setIsOpenChat(true)}
                        >
                          <IonIcon
                            icon={chatbubbleEllipses}
                            className="at-icon-object"
                            color="primary"
                          ></IonIcon>
                          <div className="at-icon-text">CHAT</div>
                        </span>
                      )}
                    </IonCardTitle>

                    <IonCardSubtitle className="at-size-12 at-margin-20-top">
                      <span>Address</span>
                    </IonCardSubtitle>
                    <IonCardTitle className="at-size-14 at-margin-5-top">
                      <span className="column-2">{data.address}</span>
                      {!isReadOnly && (
                        <span
                          className="column-2 at-right at-pad-10-left at-cursor-pointer at-size-24"
                          // onClick={onClickLocation}
                          onClick={() => setIsOpenMaps(true)}
                        >
                          <IonIcon
                            icon={navigateCircle}
                            className="at-icon-object"
                            color="primary"
                          ></IonIcon>
                          <div className="at-icon-text">MAP</div>
                        </span>
                      )}
                    </IonCardTitle>

                    <IonCardSubtitle className="at-size-12 at-margin-20-top">
                      <span className="column">Task Date / Time</span>
                      <span className="column">Task Cost</span>
                    </IonCardSubtitle>
                    <IonCardTitle className="at-size-14 at-margin-5-top">
                      <span className="column">{data.subtitle2}</span>
                      <span className="column">{data.cost}</span>
                    </IonCardTitle>

                    <IonCardSubtitle className="at-size-12 at-margin-20-top">
                      <span>Task Category</span>
                    </IonCardSubtitle>
                    <IonCardTitle className="at-size-14 at-margin-5-top">
                      <span>{data.remarks}</span>
                    </IonCardTitle>

                    <IonCardSubtitle className="at-size-12 at-margin-20-top">
                      <span>Description</span>
                    </IonCardSubtitle>
                    <IonCardTitle className="at-size-14 at-margin-5-top">
                      <span>{data.subremarks}</span>
                    </IonCardTitle>

                    <span className="at-margin-10-top"></span>
                  </IonItem>
                </div>
              </IonList>
            </IonCardContent>
          </IonCard>
        </IonContent>
        <div className="at-menu-bottom">
          {!isReadOnly && statusButton()}
          {/* <IonButton expand="block" onClick={saveInfo}>
            <IonIcon icon={thumbsUp} className="at-size-14 at-pad-10-right" />{" "}
            &nbsp;Complete Task
          </IonButton> */}
        </div>
      </IonModal>
      {/* <AtModalMaps
        isOpen={isOpenMaps}
        onClose={() => {
          setIsOpenMaps(false);
        }}
        setResult={setResult}
        latLong={[14.689476788987829, 120.96061627445215]}
      /> */}
      <AtModalMap
        isOpen={isOpenMaps}
        onClose={() => {
          setIsOpenMaps(false);
        }}
        setResult={setResult}
        destination={{ lat: 25.270083, lng: 55.3203976 }} //-- reef mall
      />
      {console.log("result>>>>", result)}

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

      {/* {console.log("date>>>>", new Date().toISOString().split('T')[0] )} */}
      {/* {console.log("date toLocaleString>>>>", new Date().toLocaleString() )} */}
      {/* {console.log("date toLocaleString>>>>", formatDateTime(new Date().toString(),"dd MMM, hh:mm aaaaa'm'") )} */}
    </>
  );
};

export default ModalAppointmentsStatus;
//-- Should refresh every 5 minutes if task status is PENDING to check on Booking Confirmation
