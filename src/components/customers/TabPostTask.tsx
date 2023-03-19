import {
  IonContent,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../hooks/redux/actions/categoriesAction";
import { RootStore } from "../../hooks/redux/store";
import useAuth from "../../hooks/useAuth";
import { formatDateTime } from "../../utils/helpers";
import ModalPostTask from "./modals/postTask/ModalPostTask";

const defaultCategories = [
  {
    id: 1,
    name: "Air Conditioning",
    icon: "./assets/images/ac.png",
    class_name: null,
    width: 44,
    status: "active",
    ts: "2022-04-03T10:56:46.000Z",
  },
  {
    id: 2,
    name: "Building Maintenance",
    icon: "./assets/images/building-maintenance.png",
    class_name: null,
    width: 44,
    status: "active",
    ts: "2022-04-03T10:56:46.000Z",
  },
  {
    id: 3,
    name: "Carpentry",
    icon: "./assets/images/hammer.png",
    class_name: null,
    width: 44,
    status: "active",
    ts: "2022-04-03T10:58:41.000Z",
  },
  {
    id: 4,
    name: "Electrical",
    icon: "./assets/images/electrical.png",
    class_name: null,
    width: 44,
    status: "active",
    ts: "2022-04-03T10:58:41.000Z",
  },
  {
    id: 5,
    name: "Home Improvement",
    icon: "./assets/images/home.png",
    class_name: null,
    width: 44,
    status: "active",
    ts: "2022-04-03T10:58:41.000Z",
  },
  {
    id: 6,
    name: "Painting",
    icon: "./assets/images/paint-roller.png",
    class_name: null,
    width: 44,
    status: "active",
    ts: "2022-04-03T10:58:41.000Z",
  },
  {
    id: 7,
    name: "Pest Control",
    icon: "./assets/images/pest-control.png",
    class_name: null,
    width: 44,
    status: "active",
    ts: "2022-04-03T10:58:41.000Z",
  },
  {
    id: 8,
    name: "Plumbing",
    icon: "./assets/images/plumbing.png",
    class_name: null,
    width: 44,
    status: "active",
    ts: "2022-04-03T10:58:41.000Z",
  },
  {
    id: 9,
    name: "Roofing",
    icon: "./assets/images/roof.png",
    class_name: null,
    width: 44,
    status: "active",
    ts: "2022-04-03T10:58:41.000Z",
  },
  {
    id: 10,
    name: "Smart Product Installation",
    icon: "./assets/images/cctv.png",
    class_name: null,
    width: 44,
    status: "active",
    ts: "2022-04-03T10:58:41.000Z",
  },
  {
    id: 11,
    name: "Solar Panel Installation",
    icon: "./assets/images/solar-panels.png",
    class_name: null,
    width: 44,
    status: "active",
    ts: "2022-04-03T10:58:41.000Z",
  },
  {
    id: 12,
    name: "Tiling",
    icon: "./assets/images/tiles.png",
    class_name: null,
    width: 44,
    status: "active",
    ts: "2022-04-03T10:58:41.000Z",
  },
  {
    id: 13,
    name: "Landscaping",
    icon: "./assets/images/landscaping.png",
    class_name: null,
    width: 44,
    status: "active",
    ts: "2022-04-03T10:58:41.000Z",
  },
  {
    id: 14,
    name: "Perimeter Fencing",
    icon: "./assets/images/fencing.png",
    class_name: null,
    width: 44,
    status: "active",
    ts: "2022-04-03T10:58:41.000Z",
  },
];

/***** data from Randy
 building permit application
autocad design
structural design
built in cabinets
      perimeter fencing
      landscaping
      trusses and roofing
retaining walls and ripraps
      solar panel installations
      tiling works
renovations
extensions
 */
const TabPostTask: React.FC<any> = () => {
  const dispatch: any = useDispatch();
  const allCategories = useSelector((state: RootStore) => state.allCategories);
  const [categories, setCategories] = useState<any>(defaultCategories);

  const { auth } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [data, setData] = useState<any>({
    user_id: auth?.id,
    category: "Carpentry",
    task_datetime: "",
    // taskdate: "December 21, 2022",
    taskdate: formatDateTime(new Date(), "MMMM dd, yyyy"),
    tasktime: "8:00 AM",
    location: "14 Ibayo Street, Malinta, Valenzuela City",
    location_coord: "",
    status: "posted",
    remarks: "",
    // "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem aliquid veniam dignissimos nulla. Quo, quisquam inventore. At earum debitis iusto, laudantium adipisci eius optio dolores nobis, numquam quae sint ducimus?",
  });
  /***
		user_id	int(255)
		task_offer_id	int(255)				
		category	varchar(50)				
		images	varchar(4000)				
		task_datetime	varchar(50)				
		location	varchar(255)				
		location_coord	varchar(255)				
		remarks	varchar(4000)				
		offers	int(50)				
		shortlisted	int(50)				
		declined	int(50)				
		rating	int(1)			
		review_text	text				
		status   
   */

  useEffect(() => {
    dispatch(fetchCategories());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (allCategories?.length) {
      setCategories(allCategories);
    }
  }, [allCategories]);

  const onClickCategory = (cat: string) => {
    // alert("onClickCategory");
    // history.push(`/post/${cat.toLowerCase().replaceAll(" ", "_")}`);
    setData({ ...data, category: cat });
    setIsModalOpen(true);
  };

  const getGreeting = () => {
    const today = new Date();
    const curHr = today.getHours();

    if (curHr < 12) {
      // return "Good Morning,";
      return "Magandang Umaga,";
    } else if (curHr < 18) {
      // return "Good Afternoon,";
      return "Magandang Hapon,";
    } else {
      // return "Good Evening,";
      return "Magandang Gabi,";
    }
  };
  const getFirstName = () => {
    return (auth?.name + " ")?.split(" ")[0];
  };
  return (
    <>
      <IonContent className="ion-padding " scrollEvents={true}>
        <IonCard color="none" at-default>
          <IonCardContent>
            <IonCardTitle className="at-center">
              <small>
                {getGreeting()} {getFirstName()}!
              </small>
            </IonCardTitle>
            {/* <IonCardSubtitle className="at-center">What do you need help with?</IonCardSubtitle> */}
            <IonCardSubtitle className="at-center">
              Saan mo kailangan ng tulong?
            </IonCardSubtitle>
          </IonCardContent>
        </IonCard>

        <IonCard color="none" at-default>
          <IonCardContent>
            <div className="categories pad-10-left">
              {categories?.length > 0 &&
                categories?.map((cat: any, index: number) => {
                  return (
                    <div
                      key={index}
                      className="category at-center cursor-pointer"
                      onClick={() => onClickCategory(cat.name)}
                    >
                      <div className="cat-icon">
                        <img
                          src={cat.icon}
                          alt="icon"
                          width={cat.width}
                          // className={cat.className}
                          className="pad-15"
                        />
                      </div>
                      <div className="cat-text size-12 at-center">
                        {cat.name}
                      </div>
                    </div>
                  );
                })}
            </div>
          </IonCardContent>
        </IonCard>
      </IonContent>
      <ModalPostTask
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        data={data}
        setData={setData}
        allCategories={allCategories}
      />
    </>
  );
};

export default TabPostTask;
