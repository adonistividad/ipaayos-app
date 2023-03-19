import {
  IonCard,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonIcon,
  IonRow,
  IonText,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import {
  currencyFormat,
  downloadFile,
  getFileExtension,
  getFilename,
} from "../../../../../utils/helpers";
import { locationOutline } from "ionicons/icons";
import { GetStarRating } from "./GetStarRating";

const SwiperTaskCard: React.FC<any> = ({ data }) => {
  const { category, estimated_cost, remarks, estimated_time, provider } = data;
  const [attachments, setAttachments] = useState<any>([]);

  useEffect(() => {
    // setStateData({ ...data });
    if (data?.documents) {
      const attached = data?.documents?.split(",");
      setAttachments(attached);
    }

    // eslint-disable-next-line
  }, [data]);

  const onClick_File = (url: any, fileName: any) => {
    downloadFile(url, fileName);
  };
  const showFiles = (name: string, key: number) => {
    const fileName: any = getFilename(name);
    const ext: string = getFileExtension(fileName)?.substr(0, 3);
    return (
      <div
        className="at-center at-attachment at-cursor-pointer"
        title={fileName}
        key={key}
        onClick={() => onClick_File(name, fileName)}
      >
        <img
          alt="iPaayos"
          src={`../assets/images/icon-${ext}-file.png`}
          height="56"
        />

        <IonIcon
          className="delete at-cursor-pointer"
          color="danger"
          title="Delete file"
        />

        <div className="at-size-12">{`${fileName?.substr(0, 6)}...${ext}`}</div>
      </div>
    );
  };
  return (
    <>
      <IonCard className="at-swiper-card" at-default>
        <IonGrid>
          <IonRow>
            <IonCol className="at-left" style={{ maxWidth: "74px" }}>
              <img
                alt=""
                className="task-image-circle"
                src={`${provider.photo}`}
                width="70"
              />
            </IonCol>
            <IonCol>
              <IonRow>
                <IonCol className="at-left">
                  <IonCardTitle className="at-size-16">
                    {provider.name}
                  </IonCardTitle>
                </IonCol>
                <IonCol className="at-left">
                  <IonCardTitle className="at-size-16 at-right">
                    {currencyFormat(estimated_cost, "₱")}
                  </IonCardTitle>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol className="at-left">
                  <IonCardSubtitle className="at-size-12 ">
                    {GetStarRating(provider?.rating)}
                  </IonCardSubtitle>
                </IonCol>
                <IonCol className="at-right">
                  <IonCardSubtitle className="at-size-12 ">
                    {estimated_time}
                    {estimated_time <= 1 ? " day" : " days"}
                  </IonCardSubtitle>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol className="at-left">
                  <IonCardTitle className="at-size-14">{category}</IonCardTitle>
                </IonCol>
                {provider.distance && (
                  <IonCol className="at-right">
                    <IonCardTitle className="at-size-14">
                      <IonIcon icon={locationOutline} /> {provider.distance} km
                      away
                    </IonCardTitle>
                  </IonCol>
                )}
              </IonRow>
            </IonCol>
          </IonRow>
        </IonGrid>
        {provider.about && (
          <div>
            <IonCardTitle className="at-size-16 at-margin-10-top">
              About
            </IonCardTitle>
            <p>{provider.about} fdsafdsafdsa</p>
          </div>
        )}
        <div>
          <IonCardTitle className="at-size-16 at-margin-10-top">
            Remarks
          </IonCardTitle>
          <p>{remarks}</p>
        </div>
        <div>
          <IonCardTitle className="at-size-16 at-margin-10-top">
            Attachments
          </IonCardTitle>
          <IonText>
            {attachments?.length > 0 &&
              attachments?.map((name: any, index: number) => {
                return showFiles(name, index);
              })}
          </IonText>
        </div>
      </IonCard>
      {/* {console.log("data ===>>>", data)} */}
    </>
  );
};

export default SwiperTaskCard;
