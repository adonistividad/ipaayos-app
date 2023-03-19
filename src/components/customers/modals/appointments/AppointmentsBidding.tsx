import { IonCard, IonCardContent, IonItem, IonLabel } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../../../../hooks/redux/actions/tasksAction";
import { RootStore } from "../../../../hooks/redux/store";
import { formatDateTime } from "../../../../utils/helpers";
import AtListItem from "../../../common/AtListItem";
import ModalBiddingDetails from "./bidding/ModalBiddingDetails";

const AppointmentsBidding: React.FC<any> = ({onChangeTabName}) => {
  const dispatch: any = useDispatch();
  const allTasks = useSelector((state: RootStore) => state.allTasks);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // const [currentModal, setCurrentModal] = useState<any>("");
  const [currentData, setCurrentData] = useState<any>();
  // const [taskOffers, setTaskOffers] = useState<any>(taskOffersData);
  const [taskOffers, setTaskOffers] = useState<any>([]);

  const [data, setData] = useState<any>([]);
  // const showModal = (modalName: any) => {
  //   setCurrentModal(MODALS[modalName].toString().toLowerCase());
  //   setIsModalOpen(true);
  // };

  const refreshData = async () => {
    const user_id = window.localStorage.getItem("id");
    await dispatch(fetchTasks({ user_id }));
  };
  useEffect(() => {
    refreshData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (allTasks?.length > 0) {
      // console.log("allTasks >>>", allTasks);

      let newData = allTasks?.map((task: any, index: number) => {
        const {
          category: title,
          id,
          images,
          // location,
          // location_coord,
          
          // rating,
          remarks: subremarks,
          // review_text,
          //// declined,
          //// shortlisted,
          // status,
          task_datetime,
          tasks_offers,
        } = task;

        const offers = task?.tasks_offers?.length;
        const shortlisted = task?.tasks_offers?.filter(
          (t: any) => t.offer_status === "shortlisted"
        ).length;
        const declined = task?.tasks_offers?.filter(
          (t: any) => t.offer_status === "declined"
        ).length;

 
        let photo = "";
        if (images?.length > 0) {
          photo = images.split(",")[0];
        }
        const title2 = formatDateTime(task_datetime, "dd MMM");
        const subtitle2 = formatDateTime(task_datetime, "hh:mm aaaaa'm'");
        let subtitle: any = "OPEN for offers";
        if (offers + shortlisted + declined > 0) {
          subtitle = (
            <>
              <span className="at-bold at-size-14">{offers}</span>{" "}
              {offers <= 1 ? "offer" : "offers"} |{" "}
              <span className="at-bold at-size-14">{shortlisted}</span>{" "}
              shortlisted |{" "}
              <span className="at-bold at-size-14">{declined}</span> declined
            </>
          );
        }

        return {
          id,
          photo,
          r1_c1: title,
          r1_c2: title2,
          r2_c1: subtitle,
          r2_c2: subtitle2,
          r4_c1: subremarks,
          tasks_offers, 
        };
      });
 
      setData(newData);
    }

    // eslint-disable-next-line
  }, [allTasks]);

  const onClickItem = (id: number) => {
    // alert("onClickItem id: " + id );
    const task = data.find((dat: any) => dat.id === id);
    setTaskOffers(task?.tasks_offers);
    setCurrentData(task);
    // console.log("task?.tasks_offers >>>",task?.tasks_offers)
    setIsModalOpen(true);
  };
  return (
    <>
    {taskOffers &&
      <ModalBiddingDetails
      // component={currentModal}
      isOpen={isModalOpen}
      onClose={() => {
        setIsModalOpen(false);
      }}
      data={currentData}
      taskOffers={taskOffers}
      setTaskOffers={setTaskOffers}
      onChangeTabName={onChangeTabName} 
      />
    }

      <IonCard color="none" at-default>
        <IonCardContent>
          {data?.length <= 0 ? (
            <IonItem color="none" lines="none">
              <IonLabel className="at-center at-margin-50-top">
                No task posted yet.
              </IonLabel>
            </IonItem>
          ) : (
            <AtListItem
              data={data}
              isMergedLine2={false}
              onClickItem={onClickItem}
              isChatEnable={true}
              isTextWrap={true}
              isImageCircle={false}
              rows={3}
            />
          )}
        </IonCardContent>
      </IonCard>
      <>
      {/* {console.log("allTasks >>>", allTasks)} */}
      </>
    </>
  );
};

export default AppointmentsBidding;
