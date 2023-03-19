import React, { useEffect, useRef, useState } from "react";
import { arrowBackOutline, send } from "ionicons/icons";
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonTitle,
  IonContent,
  IonFooter,
  IonInput,
  IonItem,
  IonList,
} from "@ionic/react";
import "../../../common/AvtChat.css";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../../../../hooks/redux/store";
import {
  fetchMessages,
  updateMessage,
} from "../../../../hooks/redux/actions/messagesAction";
import AtIonRefresher from "../../../common/AtIonRefresher";
const ModalMessages: React.FC<any> = ({
  isOpen,
  onClose,
  data,
  sender = "customer",
}) => {
  const dispatch: any = useDispatch();
  let allMessages = useSelector((state: RootStore) => state.allMessages);
  const [message, setMessage] = useState<string>("");
  const refContent = useRef<HTMLIonContentElement>(null);

  const dispatchData: any = () => {
    const { user_id, provider_id, task_id } = data;
    // console.log("user_id, provider_id, task_id >>>> ", user_id, provider_id, task_id)
    dispatch(fetchMessages({ user_id, provider_id, task_id }));
  };

  useEffect(() => {
    dispatchData();
    // eslint-disable-next-line
  }, []);

  const refreshData = () => {
    dispatchData();
  };

  const onDismiss = () => {
    onClose(1);
  };
  const sendMessage = () => {
    if (message) {
      const { user_id, provider_id, task_id } = data;
      const newMessage = {
        task_id,
        user_id,
        provider_id,
        sender,
        message,
      };
      allMessages = [...allMessages, newMessage];
      dispatch(updateMessage(newMessage, [...allMessages]));
      setMessage("");
    }
  };
  const scrollToBottom = () => {
    refContent.current?.scrollToBottom(5);
  };

  useEffect(() => {
    setTimeout(scrollToBottom, 500);

    // eslint-disable-next-line
  }, [isOpen]);

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onDismiss} at-default>
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={onDismiss}>
              <IonIcon icon={arrowBackOutline} />
            </IonButton>
          </IonButtons>
          {/* <IonTitle className="at-center color-primary">taskagram</IonTitle> */}
          <IonTitle className="at-center ">Messages</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onDismiss}>
              {/* <IonIcon icon={arrowBackOutline}/> */}
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent
        ref={refContent}
        // fullscreen
        className="ion-padding ion-content-default "
        scrollEvents={true}
        onIonScrollStart={(_e) => {
          console.log(_e);
        }}
      >
        <AtIonRefresher refreshData={refreshData} />
        <IonList className="chat-box">
          {allMessages &&
            allMessages?.length > 0 &&
            allMessages?.map((chat: any, index: number) => {
              return (
                <IonItem lines="none" key={index} color="none">
                  <div
                    slot={`${chat.sender === sender ? "end" : ""}`}
                    className={`chat-message chat-${chat.sender}`}
                  >
                    {chat.message}
                  </div>
                  <img
                    loading="lazy"
                    slot={chat?.sender === sender ? "end" : "start"}
                    src={
                      data[
                        `${
                          chat?.sender === sender
                            ? sender
                            : sender === "customer"
                            ? "provider"
                            : "customer"
                        }_photo`
                      ]
                    }
                    alt="iPaayos"
                  />
                </IonItem>
              );
            })}
        </IonList>
      </IonContent>
      <IonFooter>
        <IonItem>
          {/* <IonLabel position="floating">Floating Label</IonLabel> */}
          <IonInput
            autofocus={true}
            placeholder="Type your message here"
            value={message}
            onIonInput={(e: any) => setMessage(e.target.value)}
            // onKeyUp={(e) =>
            //   e.key === "Enter" &&
            //   sendMessage((e.target as HTMLInputElement).value)
            // }
            ///////////
            onKeyUp={(e) => e.key === "Enter" && sendMessage()}
          ></IonInput>
          <IonIcon
            icon={send}
            slot="end"
            color="primary"
            className="cursor-pointer"
            ////////////////
            onClick={() => sendMessage()}
          ></IonIcon>
        </IonItem>
      </IonFooter>
      {/* <>{console.log("data >>>", data)}</> */}
      {/* <>{console.log("allMessages >>>", allMessages)}</> */}
      {/* {console.log("refContent >>>", refContent)} */}
    </IonModal>
  );
};

export default ModalMessages;
// https://shamique.medium.com/simple-chat-application-using-ionic-and-socket-io-82d9b4605cc3
