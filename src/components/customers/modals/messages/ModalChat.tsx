import React, { useEffect, useRef, useState } from "react";
import {
  arrowBackOutline,
  send,
  grid,
  camera,
  documentText,
} from "ionicons/icons";
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
  IonItem,
  IonList,
  IonLabel,
  IonText,
  IonCardSubtitle,
  IonTextarea,
} from "@ionic/react";
import "../../../common/AvtChat.css";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../../../../hooks/redux/store";
import {
  fetchMessages,
  updateMessage,
} from "../../../../hooks/redux/actions/messagesAction";

import { io } from "socket.io-client";
import AtImage from "../../../common/AtImage";
import {
  // base64FromPath,
  usePhotoGallery,
} from "../../../../hooks/usePhotoGallery";
import { base64FromPath } from "@ionic/react-hooks/filesystem";

// import { CameraSource } from "@capacitor/camera";
import { formatBytes, getFilename } from "../../../../utils/helpers";
import FileUpload from "./FileUpload";
import ImageGallery from "./ImageGallery";
import PdfViewer from "./PdfViewer";
const chat_server: any = process.env.REACT_APP_CHAT_SERVER;
const socket: any = io(chat_server);

const ModalChat: React.FC<any> = ({
  isOpen,
  onClose,
  data,
  sender = "customer",
}) => {
  const dispatch: any = useDispatch();
  let allMessages: any = useSelector((state: RootStore) => state.allMessages);
  const [message, setMessage] = useState<string>("");
  const refContent = useRef<HTMLIonContentElement>(null);
  const { photos, takePhoto, deletePhotos, deletePhoto } = usePhotoGallery();

  const [messageList, setMessageList] = useState<any>([]);
  const [room, setRoom] = useState<string>("");
  const [file, setFile] = useState<any>(null);
  const [isOpenViewer, setIsOpenViewer] = useState<boolean>(false);
  const [isOpenFileViewer, setIsOpenFileViewer] = useState<boolean>(false);
  const [slideId, setSlideId] = useState<number>(0);
  const fileInput = useRef<any>(null);
  const [PDFile, setPDFile] = useState<any>(null);

  useEffect(() => {
    // alert("// code to run after render goes here")
    const interval = setInterval(() => scrollToBottom, 5000);
    return () => clearInterval(interval);
  });

  socket.on("connect", () => {
    // displayMessage(`Connected to server with id: ${socket.id}`);
    console.log(`Connected to server with id: ${socket.id}`);
  });

  socket.off("receive-message").on("receive-message", (data: any) => {
    // console.log("received data >>>>", data);
    // const { message } = data;
    // setMessage(message);

    updateMessageList(data, process.env.REACT_APP_CHAT_RECIPIENT);
  });

  const joinRoom = (room: any) => {
    socket.emit("join-room", room, (message: any) => {
      // alert(message);
    });
  };

  const dispatchData: any = () => {
    const { user_id, provider_id, task_id } = data;
    // console.log("user_id, provider_id, task_id >>>> ", user_id, provider_id, task_id)
    dispatch(fetchMessages({ user_id, provider_id, task_id }));
  };

  useEffect(() => {
    if (isOpen) {
      if (data) {
        const newRoom = `usr${data?.user_id}pro${data?.provider_id}`;
        setRoom(newRoom);
        joinRoom(newRoom);
      }
      // console.log("data>>>>>>>", data);
      dispatchData();
    }
    if (allMessages?.length) {
      setMessageList([...allMessages]);
    }
    // eslint-disable-next-line
  }, [isOpen, data]);

  useEffect(() => {
    if (allMessages?.length) {
      setMessageList([...allMessages]);
    }
  }, [allMessages]);

  // useEffect(() => {
  //   const interval = setInterval(() => scrollToBottom, 500);
  //   return () => clearInterval(interval);
  // }, [messageList]);

  const onDismiss = () => {
    deletePhotos();
    setMessageList([]);
    onClose(1);
  };
  const updateMessageList = (messageData: any, sender: any = "customer") => {
    const { user_id, provider_id, task_id } = data;
    // console.log("message >>>>", message)
    const newMessage = {
      task_id,
      user_id,
      provider_id,
      sender,
      // message,
      ...messageData,
    };
    setMessageList([...messageList, newMessage]);
    setTimeout(scrollToBottom, 500);
    // console.log(" ...messageList, newMessage >>>>>>>", messageList, newMessage)
    return newMessage;
  };

  const handleFileChange = (e: any) => {
    const objFile = e.target.files[0];
    // alert(`${formatBytes(objFile.size)}`);
    sendFile(objFile);
  };

  const sendFile = async (objFile: any) => {
    const messageData = {
      room,
      sender,
      author: data?.name,
      type: "file",
      body: objFile,
      mimeType: objFile?.type,
      fileName: objFile?.name,
      message: `${process.env.REACT_APP_CHAT_SERVER}/uploads/${objFile?.name}`,
      message_type: "file",
    };
    // alert("send file | messageData>>>" + JSON.stringify(messageData));
    setMessage("");
    setFile(null);
    await socket.emit("send-message", messageData, room);

    console.log("fileInput?.current>>>>>", fileInput?.current);
    const newMessage: any = updateMessageList(messageData, sender);
    saveInfo(newMessage);
    // dispatch(updateMessage(newMessage));
    fileInput.current.value = null;
  };

  const saveInfo = (data: any) => {
    dispatch(updateMessage(data));
  };
  const sendMessage = async () => {
    let messageData = {
      room,
      sender,
      author: data?.name,
      type: "message",
      message,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    };
    if (file) {
      await sendFile(file);
    } else {
      if (message) {
        // socket.emit("send-message", message, room);
        await socket.emit("send-message", messageData, room);
        // const newMessage: any = updateMessageList(message, sender);
        const newMessage: any = updateMessageList(messageData, sender);
        saveInfo(newMessage);
        // dispatch(updateMessage(newMessage));
        setMessage("");
      }
    }
  };

  const scrollToBottom = () => {
    refContent.current?.scrollToBottom(5);
  };

  useEffect(() => {
    setTimeout(scrollToBottom, 500);

    // eslint-disable-next-line
  }, [isOpen]);

  const openMenu = () => {
    alert("Future feature");
  };
  const openCamera = () => {
    // takePhoto("msg_", CameraSource.Camera, true);
    takePhoto("msg_");
    // alert("Future feature");
  };

  const showUserPhoto = () => {
    const photo =
      data[
        `${
          process.env.REACT_APP_CHAT_RECIPIENT === sender
            ? sender
            : sender === "customer"
            ? "provider"
            : "customer"
        }_photo`
      ];
    return photo ? photo : "./assets/images/ipaayos-logo.jpg";
  };

  const getMimeType: any = (name: any) => {
    if (name.indexOf("pdf")) {
      return "application/pdf";
    } else if (name.indexOf("png")) {
      return "image/png";
    } else if (name.indexOf("docx")) {
      return "application/docx";
    } else if (name.indexOf("doc")) {
      return "application/doc";
    } else {
      return "";
    }
  };

  const showPdfViewer = (fileName: any) => {
    setPDFile(fileName);
    setIsOpenFileViewer(true);
  };
  const renderContent = (msg: any) => {
    let blob: any = null;
    if (msg?.message_type === "file") {
      blob = new Blob([msg?.body], { type: msg?.type });
    }

    if (msg?.message_type === "file") {
      const fileName = getFilename(msg?.message);
      const size = formatBytes(msg?.size);
      if (
        [".jpg", ".jpeg", ".png", ".gif"].some((el) =>
          msg?.message.includes(el)
        )
      ) {
        return (
          <img
            loading="lazy"
            className="image-file"
            src={`${msg?.message}?${Date.now()}`}
            alt="iPaayos"
            onError={() => {
              const interval = setInterval(() => {
                dispatchData();
              }, 2000);
              clearInterval(interval);
            }}
            // onError={()=>alert('error loading')}
            onClick={() => {
              setSlideId(msg?.id);
              setIsOpenViewer(true);
            }}
          />
        );
        /*************** Future Feature: temporarily disabled on 2023-02-02
      } else if (msg?.message.includes(".pdf")) {
        // const fileName = msg?.message?.split("?")[0]?.replace(/^.*[\\\/]/, "");
        const size = formatBytes(msg?.size);
        return (
          <IonItem
            style={{ borderRadius: "10px" }}
             onClick={() => showPdfViewer(fileName)}
             className="at-cursor-pointer"
             >
             <IonIcon color="secondary" size="large" icon={documentText} />
             <IonLabel className="at-pad-10-left">
             {" "}
              {fileName} <br /> <IonCardSubtitle>{size}</IonCardSubtitle>{" "}
            </IonLabel>
          </IonItem>
          );
          */
      } else {
        // const fileName = msg?.message?.split("?")[0]?.replace(/^.*[\\\/]/, "");

        return (
          <a href={msg?.message} download target="_blank">
            <IonItem style={{ borderRadius: "10px" }}>
              <IonIcon color="secondary" size="large" icon={documentText} />
              <IonLabel className="at-pad-10-left">
                {" "}
                {fileName} <br /> <IonCardSubtitle>{size}</IonCardSubtitle>{" "}
              </IonLabel>
            </IonItem>
          </a>
        );
      }
    } else if (msg?.type === "file") {
      return (
        <AtImage filename={msg?.filename} blob={blob} className="image-file" />
      );
    } else {
      return (
        <IonText className="ion-text-wrap ion-wrap"> {msg?.message}</IonText>
        // <IonTextarea className="ion-text-wrap ion-wrap"  readonly autoGrow={true}> {msg?.message}</IonTextarea>
      );
    }
  };

  const renderMessage = (msg: any, index: number) => {
    // console.log("renderMessage msg >>>>>>>>>>>", msg);
    let blob: any = null;
    let fileType: string = "";
    // if (msg?.type === "file") {
    if (msg?.message_type === "file") {
      blob = new Blob([msg?.body], { type: msg?.type });
      fileType = getMimeType(msg?.message);
    }
    // alert("msg "+ JSON.stringify(msg))
    return (
      <IonItem
        lines="none"
        key={index}
        color="none"
        className={`chat-${msg?.sender === sender ? "sender" : "recipient"}`}
      >
        <div
          slot={`${msg?.sender === sender ? "end" : ""}`}
          // className={`chat-message chat-${msg?.type || msg?.message_type}`}
          className={`chat-message chat-${msg?.message_type}`}
        >
          {renderContent(msg)}
        </div>
        <img
          loading="lazy"
          className="user-photo"
          slot={msg?.sender === sender ? "end" : "start"}
          src={showUserPhoto()}
          alt="iPaayos"
        />
      </IonItem>
    );
  };

  const showImageGallery = () => {
    const dataImages: any = messageList
      ?.filter((msg: any) => msg?.message?.includes(".jpg"))
      .map((dat: any) => {
        return {
          ...dat,
          photo: dat?.message,
        };
      });

    return (
      <ImageGallery
        isOpen={isOpenViewer}
        onClose={() => setIsOpenViewer(false)}
        data={dataImages}
        slideId={slideId}
        name={data?.name}
      />
    );
  };

  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={onDismiss}
      at-default
      className="avt-chat"
    >
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={onDismiss}>
              <IonIcon icon={arrowBackOutline} />
            </IonButton>
            <img
              loading="lazy"
              width="40"
              height="40"
              className="at-border-radius-circle"
              src={showUserPhoto()}
              alt="iPaayos"
            />
            <IonLabel className="at-pad-10-left">{data?.name} </IonLabel>
          </IonButtons>
          {/* <IonTitle className="at-center color-primary">taskagram</IonTitle> */}
          {/* <IonTitle className="at-center ">Chat Messages</IonTitle> */}
          <IonTitle></IonTitle>
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
        {messageList?.length <= 0 ? (
          <IonItem color="none" lines="none">
            <IonLabel className="at-center at-margin-50-top">
              No message yet.
            </IonLabel>
          </IonItem>
        ) : (
          <IonList className="chat-box">
            {messageList?.map((message: any, index: number) => {
              return renderMessage(message, index);
            })}
          </IonList>
        )}
      </IonContent>
      <IonFooter style={{ position: "relative" }}>
        <IonItem color="none" lines="none">
          <IonIcon
            icon={grid}
            slot="start"
            color="primary"
            className="cursor-pointer chat-menu"
            onClick={() => openMenu()}
            style={{ display: "none" }}
          />
          <IonIcon
            icon={camera}
            slot="start"
            color="primary"
            className="cursor-pointer"
            onClick={() => openCamera()}
            style={{ display: "none" }}
          />

          {/* {room && (
            <FileUpload
              info={data}
              room={room}
              sender={sender}
              saveInfo={saveInfo}
            />
          )} */}

          {/* <IonLabel position="floating">Floating Label</IonLabel> */}

          <IonTextarea
            className="chat-input"
            // autofocus={true}
            placeholder="Type your message here"
            value={message}
            onIonInput={(e: any) => setMessage(e.target.value)}
            // onKeyUp={(e) =>
            //   e.key === "Enter" &&
            //   sendMessage((e.target as HTMLInputElement).value)
            // }
            ///////////
            onKeyUp={(e) => e.key === "Enter" && sendMessage()}
            rows={1}
            autoGrow={true}
          ></IonTextarea>
          {room && (
            <FileUpload
              info={data}
              room={room}
              sender={sender}
              saveInfo={saveInfo}
            />
          )}

          <IonIcon
            icon={send}
            slot="end"
            // style={{bottom:'0'}}
            color="primary"
            className="cursor-pointer send"
            ////////////////
            onClick={() => sendMessage()}
          ></IonIcon>
        </IonItem>
      </IonFooter>

      {showImageGallery()}

      {PDFile && (
        <PdfViewer
          isOpen={isOpenFileViewer}
          onClose={() => setIsOpenFileViewer(false)}
          PDFile={PDFile}
        />
      )}
    </IonModal>
  );
};

export default ModalChat;
// https://shamique.medium.com/simple-chat-application-using-ionic-and-socket-io-82d9b4605cc3
