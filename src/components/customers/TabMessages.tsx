import React, { useEffect, useState } from "react";
import { documentText } from "ionicons/icons";
import { IonContent, IonCard, IonCardContent, IonIcon } from "@ionic/react";
import AtListItem from "../common/AtListItem";
import AtIonRefresher from "../common/AtIonRefresher";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../../hooks/redux/store";
import {
  fetchGroupedMessages,
  updateMessages,
} from "../../hooks/redux/actions/messagesAction";
import {
  formatDateTime,
  getFileExtension,
  getFilename,
} from "../../utils/helpers";
// import ModalMessages from "./modals/messages/ModalMessages";
import ModalChat from "./modals/messages/ModalChat";

const TabMessages: React.FC<any> = ({ refreshBadges }) => {
  const dispatch: any = useDispatch();
  //-- fetch group / sorted messages
  const allGroupedMessages = useSelector(
    (state: RootStore) => state.allGroupedMessages
  );
  const [data, setData] = useState<any>([]);
  const [activeData, setActiveData] = useState<any>(null);
  const [isOpenChat, setIsOpenChat] = useState<boolean>(false);

  const refreshData = () => {
    dispatch(
      fetchGroupedMessages({ user_id: window.localStorage.getItem("id") })
    );
  };

  useEffect(() => {
    refreshData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!isOpenChat) {
      setActiveData(null);
    }
  }, [isOpenChat]);

  useEffect(() => {
    if (allGroupedMessages?.length > 0) {
      let newData: any = allGroupedMessages?.map((msg: any, index: number) => {
        const { id, message, task_id, user_id, provider_id, sender } = msg;
        if (!msg.provider) {
          msg.provider = { name: "Anonymous", photo: null };
        }
        const { name, photo } = msg?.provider;
        const { photo: customer_photo } = msg?.user;
        const provider_photo = photo;
        const r1_c2: any = (
          <label className="at-size-14 at-text-color-light">
            {formatDateTime(msg?.ts, "MM/dd/yyyy")}
          </label>
        );
        let r2_c1 = message;
        // alert(message)

        if (message.includes(".jpg")) {
          r2_c1 = `${msg.sender === "customer" ? "You " : name} sent a photo`;
          // } else if (message.includes(".pdf")) {
        } else if (
          ["doc", "ppt", "pdf", "xls"].includes(getFileExtension(message))
        ) {
          //-- accept="image/png, image/gif, image/jpeg, .doc, .docx, .ppt, .pptx, .pdf, .xlsx, .xls"
          r2_c1 = (
            <>
              <IonIcon
                color="secondary"
                className="size-12"
                icon={documentText}
              />{" "}
              <span> {getFilename(message)}</span>
            </>
          );
        }

        return {
          id,
          photo,
          r1_c1: name,
          r1_c2,
          r2_c1,
          task_id,
          user_id,
          provider_id,
          sender,
          customer_photo,
          provider_photo,
          name,
        };
      });
      setData(newData);
    }
    // eslint-disable-next-line
  }, [allGroupedMessages]);

  const onClickItem = (id: number) => {
    const dat: any = data.find((d: any) => d.id === id);
    setActiveData(dat);
    setIsOpenChat(true);

    const { user_id, provider_id, sender } = dat;
    console.log(
      "provider_id, user_id, sender>>>>",
      provider_id,
      user_id,
      sender
    );
    dispatch(
      updateMessages({
        user_id,
        provider_id,
        sender: "provider",
        status: "seen",
      })
    );

    // alert(typeof refreshBadges )
    // if (typeof refreshBadges === "function") {
    //   refreshBadges();
    // }
  };

  return (
    <>
      <IonContent className="ion-padding " scrollEvents={true}>
        <IonCard color="none" at-default>
          <IonCardContent>
            <AtListItem
              data={data}
              // isMergedLine2={true}
              isTextWrap={true}
              onClickItem={onClickItem}
              rows={2}
            />
          </IonCardContent>
        </IonCard>
        <AtIonRefresher
          refreshData={refreshData}
          refreshBadges={refreshBadges}
        />
      </IonContent>
      {/* {activeData && (
        <ModalMessages
          isOpen={isOpenChat}
          onClose={() => setIsOpenChat(false)}
          data={activeData}
          sender="customer"
        />
      )} */}
      {activeData && (
        <ModalChat
          isOpen={isOpenChat}
          onClose={() => {
            setIsOpenChat(false);
            refreshData();
          }}
          data={activeData}
          sender="customer"
        />
      )}
      {/* <>{console.log("allGroupedMessages >>>>", allGroupedMessages)}</> */}
      {/* <>{console.log("activeData >>>>", activeData)}</> */}
    </>
  );
};

export default TabMessages;
