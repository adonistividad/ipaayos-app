import React, { useEffect, useState } from "react";
import { IonContent, IonCard, IonCardContent } from "@ionic/react";
import AtListItem from "../common/AtListItem";
import { useHistory } from "react-router";
// import { createOutline } from "ionicons/icons";
import AtIonRefresher from "../common/AtIonRefresher";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../../hooks/redux/store";
import {
  fetchNotifications,
  updateNotification,
} from "../../hooks/redux/actions/notificationsAction";
import { formatDateTime } from "../../utils/helpers";
// import { fetchBadges } from "../../hooks/redux/actions/badgesAction";

const TabNotifications: React.FC<any> = ({ refreshBadges }) => {
  const dispatch: any = useDispatch();
  const allNotifications = useSelector(
    (state: RootStore) => state.allNotifications
  );
  const [data, setData] = useState<any>([]);
  const history = useHistory();

  const refreshData = () => {
    dispatch(
      fetchNotifications({
        user_id: window.localStorage.getItem("id"),
        recipient: "customer",
      })
    );
  };

  useEffect(() => {
    refreshData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (allNotifications?.length > 0) {
      let newData: any = allNotifications?.map(
        (notification: any, index: number) => {
          const {
            id,
            message: remarks,
            user_id,
            provider_id,
            recipient,
            url_param,
          } = notification;
          const { photo } = notification?.provider;
          const subremarks = formatDateTime(
            notification?.ts,
            "dd MMMM yyyy, hh:mm aaaaa'm'"
          );
          /***  time is behind by 2 hours
            subremarks: "5 minutes ago",
            subremarks: "23 hours ago",
            subremarks: "25 October, 10:25 am", */
          return {
            id,
            photo,
            r1_c2:remarks, 
            r2_c1:subremarks,

            remarks,
            subremarks,
            url_param,
            user_id,
            provider_id,
            recipient,
          };
        }
      );
      setData(newData);
    }
    // eslint-disable-next-line
  }, [allNotifications]);

  const onClickItem = (id: number) => {
    const dat: any = data.find((d: any) => d.id === id);
    dispatch(updateNotification({ id, status: "seen" })); 
    history.push(dat?.url_param);
    if (typeof refreshBadges === "function") {
      refreshBadges();
    }
  };

  return (
    <>
      <IonContent className="ion-padding " scrollEvents={true}>
        <IonCard color="none" at-default>
          <IonCardContent>
            <AtListItem
              data={data}
              isMergedLine2={true}
              onClickItem={onClickItem}
              rows={2}
            />
          </IonCardContent>
        </IonCard>

        <AtIonRefresher refreshData={refreshData}  refreshBadges={refreshBadges}/>
        {/* <>{console.log(" allNotifications>>>", allNotifications)}</> */}
      </IonContent>
    </>
  );
};

export default TabNotifications;
