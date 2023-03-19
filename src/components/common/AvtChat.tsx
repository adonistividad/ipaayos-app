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
import "./AvtChat.css";
import AtIonRefresher from "./AtIonRefresher";
/*****
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../../hooks/redux/store";
import { fetchMessages, updateMessage } from "../../hooks/redux/actions/messagesAction";
import { PlatformContext } from "../../contexts/PlatformContext";
*/

//-- sample messages
let allMessages: any = [
  { sender: "customer", message: "Hi" },
  { sender: "customer", message: "Hi 2" },
  { sender: "provider", message: "Hi 3" },
  {
    sender: "customer",
    message:
      "Corrupti officiis at quo pariatur quidem distinctio consequuntur itaque, quis quas eligendi obcaecati odit rem eos. Facilis adipisci consectetur quam pariatur recusandae.",
  },
  {
    sender: "provider",
    message: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. ",
  },
  { sender: "customer", message: "Hi 6" },
];

const AvtChat: React.FC<any> = ({
  isOpen,
  onClose,
  task_id,
  user_id,
  username,
  provider_id,
  provider_name,
}) => {
  // const dispatch = useDispatch();
  // const { platform } = useContext(PlatformContext);
  // let allMessages = useSelector((state: RootStore) => state.allMessages);
  const [message, setMessage] = useState<string>("");
  const refContent = useRef<HTMLIonContentElement>(null);

  const refreshData = () => {
    ////// dispatch(
    //////   fetchMessages({ user_id: platform.user_id, provider_id, task_id })
    ////// );
  };

  useEffect(() => {
    if (provider_id && task_id) {
      refreshData();
    }
    // eslint-disable-next-line
  }, [provider_id, task_id]);

  const onDismiss = () => {
    onClose(1);
  };
  const sendMessage = () => {
    if (message) {
      setMessage("");

      const newMessage = {
        task_id,
        user_id: 1, ////// platform.user_id,
        provider_id,
        sender: "user",
        message,
      };
      allMessages = [...allMessages, newMessage];

      //////dispatch(updateMessage(newMessage, [...allMessages]));
    }
  };
  const scrollToBottom = () => {
    refContent.current?.scrollToBottom(5);
  };
  useEffect(() => {
    if (allMessages && allMessages?.length > 0) {
      scrollToBottom();
    }
    // eslint-disable-next-line
  }, [allMessages]);

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onDismiss}>
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={onDismiss}>
              <IonIcon icon={arrowBackOutline} />
            </IonButton>
          </IonButtons>
          {/* <IonTitle className="at-center color-primary">taskagram</IonTitle> */}
          <IonTitle className="at-center ">Chat</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onDismiss}>
              {/* <IonIcon icon={arrowBackOutline}/> */}
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent
        ref={refContent}
        fullscreen
        className="ion-padding ion-content-default"
        scrollEvents={true}
        onIonScrollStart={(_e) => {
          console.log(_e);
        }}
      >
        {/* <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent
            pullingIcon={chevronDownCircleOutline}
            pullingText="Pull to refresh"
            refreshingSpinner="circles"
            refreshingText="Refreshing..."
          ></IonRefresherContent>
        </IonRefresher>
        <br />
        <br />
        <br /> */}
        <IonList className="chat-box">
          {allMessages &&
            allMessages?.length > 0 &&
            allMessages?.map((chat: any, index: number) => {
              return (
                <IonItem lines="none" key={index} color="none">
                  <div
                    slot={`${chat.sender === "customer" ? "end" : ""}`}
                    className={`chat-message chat-${chat.sender}`}
                  >
                    {chat.message}
                  </div>
                </IonItem>
              );
            })}
        </IonList>
        <AtIonRefresher refreshData={refreshData} />
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
            onKeyUp={(e) => e.key === "Enter" && sendMessage()}
          ></IonInput>
          <IonIcon
            icon={send}
            slot="end"
            color="primary"
            className="cursor-pointer"
            onClick={() => sendMessage()}
          ></IonIcon>
        </IonItem>
      </IonFooter>
      {/* {console.log("allMessages >>>", allMessages)} */}
      {/* {console.log("refContent >>>", refContent)} */}
    </IonModal>
  );
};

export default AvtChat;
// https://shamique.medium.com/simple-chat-application-using-ionic-and-socket-io-82d9b4605cc3
