import { IonIcon } from "@ionic/react";
import React, { useRef, useState } from "react";
import { attach } from "ionicons/icons";
import io from "socket.io-client";
import { isAbsolute } from "path";

const chat_server: any = process.env.REACT_APP_CHAT_SERVER;
const socket: any = io(chat_server);

const FileUpload: React.FC<any> = ({
  info,
  room,
  saveInfo,
  sender = "customer",
}) => {
  const [percent, setPercent] = useState(0);
  const fileInput = useRef<any>(null);

  const handleFileChange = (e: any) => {
    handleUpload(e.target.files[0]);
  };

  const handleUpload = async (file: any) => {
    if (!file) {
      return;
    }

    socket.emit("start-upload", { name: file.name, room });

    socket.on("ready", (data: any) => {
      console.log("ready  >>>>", data);
    });

    const chunkSize = (1024 * 1024) / 4; // .25MB
    const chunks = Math.ceil(file.size / chunkSize);
    let i = 0;

    socket.off("more-data").on("more-data", (data: any) => {
      if (i > chunks - 1) {
        const { name: fileName, size } = file;
        console.log("file >>>>", file);

        /***
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
         */
        const newData = {
          ...info,
          id: 0,
          sender,
          fileName,
          size,
          message: `${process.env.REACT_APP_CHAT_SERVER}/uploads/${fileName}`,
          message_type: "file",
        };
        console.log("newData  >>>>", newData);
        socket.emit("end-upload", newData, room);
        saveInfo(newData);
        fileInput.current.value = null;
        return false;
      }
      //   console.log("more-data  >>>>", data);
      const start = i * chunkSize;
      const end = start + chunkSize;
      const chunk = file.slice(start, end);
      socket.emit("upload-chunk", { name: file.name, chunk });
      i++;
      setPercent((i / chunks) * 100);
    });
  };

  return (
    // <div
    //   // style={{
    //   //   background: "var(--ion-color-step-50)",
    //   //   // margin: "0px",
    //   //   // padding: "6.5px 15px 6.5px 0px",
    //   //   // padding:'10px',
    //   //   // borderTopRightRadius: "25px",
    //   //   // borderBottomRightRadius: "25px",
    //   // }}
    // >
      <IonIcon
        icon={attach}
        slot="end"
        color="primary"
        className="cursor-pointer at-size-24 attach"
        onClick={() => fileInput?.current?.click()}
        // style={{
        //   transform: "rotate(-45deg)",
        //   position:'absolute',
        //   right:'100px'
        //   zIndex:'999'
        // }}
        // style={{position:'absolute', left:'0px', transform: 'rotate(-45deg)'}}
        // style={{position:'absolute', right:'10px', transform: 'rotate(-45deg)'}}
      >
        {/* <input type="file" accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf" /> */}
        {/* <button onClick={handleUpload}>Upload</button> */}
        {/* <p style={{ color: "gold", position: "absolute" }}>{percent}%</p> */}
        {/* {console.log("fileUpload info: >>>>>>", info)} */}
      <input
        hidden
        type="file"
        onChange={handleFileChange}
        ref={fileInput}
        // accept="image/png, image/gif, image/jpeg, .doc, .docx, .ppt, .pptx, .pdf, .xlsx, .xls"
        accept="image/png, image/gif, image/jpeg, .doc, .docx, .ppt, .pptx, .pdf, .xlsx, .xls"
      />
      </IonIcon> 
  );
};

export default FileUpload;
