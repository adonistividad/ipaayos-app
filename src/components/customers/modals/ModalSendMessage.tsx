import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonCardTitle,
  IonCardSubtitle,
  IonTextarea,
  IonToggle,
  useIonToast,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { arrowBackOutline } from "ionicons/icons";
import { useDispatch } from "react-redux";
import { updateMessage } from "../../../hooks/redux/actions/messagesAction";
import { updateNotification } from "../../../hooks/redux/actions/notificationsAction";
// import { PlatformContext } from "../../../contexts/PlatformContext";

const ModalSendMessage: React.FC<any> = ({
  isOpen,
  onClose,
  data,
  sender = "customer",
}) => {
  const dispatch: any = useDispatch();
  // const { platform } = useContext(PlatformContext);
  const [present] = useIonToast();
  const [state, setState] = useState<any>({
    id: 0,
    user_id: 0,
    provider_id: 0,
    message: "",
    sender,
    isSaveMessage: "on",
  });

  useEffect(() => {
    console.log("data >>>", data);
    setState({
      ...state,
      // user_id: platform?.user_id,
      user_id: data?.user_id,
      provider_id: data?.provider_id,
    });
    // eslint-disable-next-line
  }, [data]);

  const onDismiss = () => {
    onClose(1);
  };
  const sendMessage = () => {
    // alert("Info updated \n" + JSON.stringify(state));
    dispatch(updateMessage(state));

    const { sender_name, user_id, provider_id } = data;
    dispatch(
      updateNotification({
        user_id,
        provider_id,
        message: `${sender_name} sent a new message`,
        recipient: process.env.REACT_APP_CHAT_RECIPIENT,
        url_param: "/messages",
      })
    );

    if (!state?.isSaveMessage) {
      setState({ ...state, message: "" });
    }
    present({
      duration: 1000,
      message: `New message sent to ${data?.title}.`,
      onDidDismiss: () => {
        onDismiss();
      },
      onWillDismiss: () => console.log("will dismiss"),
    });
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
            <IonTitle className="at-center">Contact this pro</IonTitle>
            <IonButtons slot="end">
              <IonButton />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding" at-default-modal>
          <IonCard color="none" at-default>
            <IonCardContent>
              <IonList>
                <div className="at-item-list">
                  {/* <img
                    alt="provider"
                    className="task-image"
                    src={`/assets/images/${data?.photo}`}
                    width="60"
                  ></img> */}
                  <img
                    alt="iPaayos"
                    className="task-image-circle"
                    src={
                      data?.photo
                        ? data?.photo?.includes("http")
                          ? data?.photo
                          : `/assets/images/${data?.photo}`
                        : "/assets/images/ipaayos-logo.jpg"
                    }
                    width="60"
                    height="60"
                  />
                  <IonItem lines="none">
                    <IonLabel position="stacked" slot="start"></IonLabel>
                    {data?.title && (
                      <IonCardTitle className="at-size-16">
                        <span>To: {data?.title}</span>
                      </IonCardTitle>
                    )}
                    {data?.subtitle && (
                      <IonCardSubtitle className="at-size-12 at-margin-5-top">
                        <span className="at-text-wrap column">
                          {data?.subtitle}
                        </span>
                      </IonCardSubtitle>
                    )}

                    <IonCardSubtitle className="at-margin-20-top">
                      <span>Message</span>
                    </IonCardSubtitle>
                    <IonTextarea
                      value={state?.message}
                      className="at-pad-10"
                      rows={10}
                      style={{ border: "1px solid #999", borderRadius: "5px" }}
                      onIonChange={(e) =>
                        setState({ ...state, message: e.detail.value! })
                      }
                    />
                    <span className="at-margin-10-top"></span>
                  </IonItem>
                  <IonItem lines="none" disabled={false}>
                    <IonCardSubtitle>
                      Save your message to save time – easily contact more
                      providers
                    </IonCardSubtitle>
                    <IonToggle
                      slot="start"
                      checked={state?.isSaveMessage}
                      onIonChange={(e) =>
                        setState({
                          ...state,
                          isSaveMessage: e.detail.checked!,
                        })
                      }
                    ></IonToggle>
                  </IonItem>
                </div>
              </IonList>
            </IonCardContent>
          </IonCard>
        </IonContent>
        <div className="at-menu-bottom">
          <IonButton expand="block" onClick={onDismiss}>
            Cancel
          </IonButton>

          <IonButton expand="block" onClick={sendMessage}>
            {/* <IonIcon icon={thumbsUp} className="at-size-14 at-pad-10-right" />{" "} */}
            &nbsp;Send
          </IonButton>
        </div>
      </IonModal>
      {/* <>{console.log("ModalSendMessage>>>", state?.isSaveMessage)}</> */}
    </>
  );
};

export default ModalSendMessage;
