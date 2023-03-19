import { IonCard, IonCardContent, IonItem, IonLabel } from "@ionic/react";
import React, { useState } from "react";
import { MODALS } from "..";
import AtListItem from "../../../common/AtListItem";
import ModalAppointmentsStatus from "./ModalAppointmentsStatus";

const data: any = [
  {
    id: 3,
    photo: "auric_gavin.jpg",
    r1_c1: "Auric Gavin",
    r1_c2: "Rejected",
    r2_c1: "San Jose, Antipolo, Philippines",
    r2_c2: "28 Feb, 10:25 AM",
    r3_c1: "Solar Panel Installation",
    r3_c2: "₱250 per hour",
    r4_c1: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. ",
    cssR1_c2: "color-danger",

    cssItem: "",
    rating: 3.5,
    reviews: 25,
    cost: "₱250 per hour",
    address: "San Jose, Antipolo, Philippines",
    latlong: "",
  },
  {
    id: 1,
    photo: "randy_legaspi.jpg",
    r1_c1: "Randy Legaspi",
    r1_c2: "New Task",
    r2_c1: "Camiling, Tarlac, Philippines",
    r2_c2: "19 Dec, 11:30 AM",
    r3_c1: "Interior Decorations",
    r3_c2: "₱100 per hour",
    r4_c1:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio fugit maxime id nemo alias quam delectus nesciunt nobis doloribus at, sit velit eligendi quisquam aut nulla voluptates rem! Ullam, aliquam?",
    cssR1_c2: "color-primary",
    cssItem: "at-border-primary",
    rating: 4.5,
    reviews: 15,
    cost: "₱100 per hour",
    address: "Camiling, Tarlac, Philippines",
    latlong: "",
  },
  {
    id: 2,
    photo: "geraldine_tividad.jpg",
    r1_c1: "Geraldine Tividad",
    r1_c2: "Approved",
    r2_c1: "Iguig, Cagayan Valley, Philippines",
    r2_c2: "28 Feb, 10:25 AM",
    r3_c1: "Bathroom fittings",
    r3_c2: "₱200 per hour",
    r4_c1:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio maiores consectetur, dignissimos optio accusantium error a assumenda velit. Vero quidem architecto debitis quis quasi fuga totam sed nisi sequi soluta!",
    cssR1_c2: "color-success",
    cssItem: "",
    rating: 4.3,
    reviews: 12,
    cost: "₱200 per hour",
    address: "Iguig, Cagayan Valley, Philippines",
    latlong: "",
  },
];

const AppointmentsHistory: React.FC<any> = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentModal, setCurrentModal] = useState<any>("");
  const [currentItem, setCurrentItem] = useState<any>();
  const showModal = (modalName: any) => {
    setCurrentModal(MODALS[modalName].toString().toLowerCase());
    setIsModalOpen(true);
  };

  const onClickItem = (id: number) => {
    showModal(MODALS.TASK_STATUS);
    // alert("onClickItem id: " + id );
    setCurrentItem(data.find((dat: any) => dat.id === id));
  };
  return (
    <>
      {currentModal && (
        <ModalAppointmentsStatus
          component={currentModal}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
          }}
          data={currentItem}
          isReadOnly={true}
        />
      )}

      <IonCard color="none" at-default>
        <IonCardContent>
          {data?.length <= 0 ? (
            <IonItem color="none" lines="none">
              <IonLabel className="at-center at-margin-50-top">
                No completed task yet.
              </IonLabel>
            </IonItem>
          ) : (
            <AtListItem
              data={data}
              isMergedLine2={false}
              onClickItem={onClickItem}
              isChatEnable={true}
              isTextWrap={true}
            />
          )}
        </IonCardContent>
      </IonCard>
    </>
  );
};

export default AppointmentsHistory;
