import React, { useEffect, useState } from "react";
import {
  IonCard,
  IonCardContent,
  IonContent,
  IonItem,
  IonLabel,
} from "@ionic/react";
import AtListItem from "../common/AtListItem";
import AtSearchBar from "../common/AtSearchBar";
import { GetStarRating } from "./modals/appointments/bidding/GetStarRating";
import ModalProsDetails from "./modals/pros/ModalProsDetails";
import AtIonRefresher from "../common/AtIonRefresher";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../../hooks/redux/store";
import { fetchProviders } from "../../hooks/redux/actions/providersAction";

const TabPros: React.FC<any> = () => {
  const dispatch: any = useDispatch();
  const allProviders = useSelector((state: RootStore) => state.allProviders);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [currentItem, setCurrentItem] = useState<any>();

  const [data, setData] = useState<any>([]);
  const refreshData = () => {
    dispatch(fetchProviders());
  };

  useEffect(() => {
    refreshData();

    // eslint-disable-next-line
  }, []);

  // const filterData = (filterString = "") => {};

  useEffect(() => {
    // filterData();
    if (allProviders?.length > 0) {
      // console.log("allProviders >>>", allProviders);

      const fields = ["name", "categories"];
      //-- https://betterprogramming.pub/creating-a-multi-filter-function-to-filter-out-multiple-attributes-javascript-react-rails-5aad8e272142
      let newData = allProviders
        ?.filter((p: any) => {
          return searchText?.length
            ? //--- for OR condition
              // ? searchText?.trim().split(" ")?.some((text: any) => {
              //--- for AND condition
              searchText
                ?.trim()
                .split(" ")
                ?.every((text: any) => {
                  return fields?.some((field: any) =>
                    p[field]?.toLowerCase().includes(text)
                  );
                })
            : true;
        })
        ?.map((provider: any, index: number) => {
          const {
            id,
            photo,
            about: r4_c1,
            // address,
            // address_coord,
            categories: r1_c2,
            // city,
            // country,
            // datestarted,
            // email_status,
            // ip_address,
            // mobile_number,
            name: r1_c1,
            // nationality,
            price_per_hour,
            // profile_images,
            rating,
            reviews,
            // state,
            // status,
            // transport,
            // user_name,
          } = provider;
          const r2_c1 = GetStarRating({ rating, reviews });
          const r2_c2 = price_per_hour ? `₱${price_per_hour} per hour` : "";

          return {
            id,
            user_id: window.localStorage.getItem("id"),
            provider_id: id,
            photo,
            r1_c1,
            r1_c2,
            r2_c1,
            r2_c2,
            r4_c1,
            latlong: "",
            sender_name: window.localStorage.getItem("name"),
          };
        });

      setData(newData);
    }
    // eslint-disable-next-line
  }, [allProviders, searchText]);

  const onClickItem = (id: number) => {
    setIsModalOpen(true);
    // alert("onClickItem id: " + id);
    setCurrentItem(data.find((dat: any) => dat.id === id));
  };

  return (
    <>
      {currentItem && (
        <ModalProsDetails
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
          }}
          data={currentItem}
          isReadOnly={true}
        />
      )}

      <IonContent
        className="ion-padding sticky-header-content"
        scrollEvents={true}
      >
        <div className="sticky-header">
          <AtSearchBar setSearchText={setSearchText} />
        </div>
        <IonCard color="none" at-default>
          <IonCardContent>
            {data?.length <= 0 ? (
              <IonItem color="none" lines="none">
                <IonLabel className="at-center at-margin-50-top">
                  No task available in your area yet.
                </IonLabel>
              </IonItem>
            ) : (
              <AtListItem
                data={data}
                isMergedLine2={false}
                onClickItem={onClickItem}
                isTextWrap={true}
              />
            )}
          </IonCardContent>
        </IonCard>

        <AtIonRefresher refreshData={refreshData} />
      </IonContent>
      {/* {console.log("allProviders>>>", allProviders)} */}
      {/* {console.log("searchText>>>", searchText.split(" "))} */}
    </>
  );
};

export default TabPros;
