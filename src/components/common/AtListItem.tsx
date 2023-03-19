import { IonList } from "@ionic/react";
import React from "react";
import AtItemDetails from "./AtItemDetails";
// import { call, chatbubbleEllipses } from "ionicons/icons";
const AtListItem: React.FC<any> = ({
  data,
  isReadOnly = false,
  isMergedLine2 = false,
  // isShowMore=false,
  // isBorderPrimary = false,
  // isChatEnable = false,
  isTextWrap = false,
  isImageCircle = true,
  onClickItem,
  emptyMessage,
  rows,
}) => {
  return (
    <>
      {data && data?.length > 0 ? (
        data?.map((dat: any, index: number) => {
          return (
            <IonList
              key={index}
              className={`${isReadOnly ? "" : "at-cursor-pointer"}`}
              onClick={() => !isReadOnly && onClickItem(dat.id)}
            >
              <AtItemDetails
                data={dat}
                isMergedLine2={isMergedLine2}
                isTextWrap={isTextWrap}
                isImageCircle={isImageCircle}
                rows={rows}
              />
            </IonList>
          );
        })
      ) : (
        <div className="at-center color-aaa at-margin-30-top">
          {emptyMessage}{" "}
        </div>
      )}
    </>
  );
};

export default AtListItem;
