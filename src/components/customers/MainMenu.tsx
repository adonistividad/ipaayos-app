import React, { useEffect, useCallback, useState } from "react";
import {
  peopleSharp,
  peopleOutline,
  // fileTrayFullSharp,
  // fileTrayFullOutline,
  notificationsSharp,
  notificationsOutline,
  addCircle,
  calendarSharp,
  calendarOutline,
  chatboxEllipsesSharp,
  chatboxEllipsesOutline,
} from "ionicons/icons";
import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonHeader,
  IonToolbar,
  IonBadge,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect } from "react-router";
import TabPost from "./TabPostTask";
import TabPros from "./TabPros";
import TabAppointments from "./TabAppointments";
import TabNotifications from "./TabNotifications";
import ModalAccount from "./ModalAccount";
import { titleCase } from "../../utils/helpers";
import TabMessages from "./TabMessages";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../../hooks/redux/store";
import { fetchBadges } from "../../hooks/redux/actions/badgesAction";
const MainMenu: React.FC<any> = () => {
  const dispatch: any = useDispatch();
  const allBadges = useSelector((state: RootStore) => state.allBadges);

  const isProfileShown: any = window.localStorage.getItem("isProfileShown");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(!isProfileShown);
  // const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const imageUrl: string = localStorage.getItem("imageUrl") + "";
  const [selectedTab, setSelectedTab] = useState("post");
  const [badges, setBadges] = useState({
    notifications: 0,
    messages: 0,
  });

  const refreshBadges = useCallback(
    () => dispatch(fetchBadges({ user_id: window.localStorage.getItem("id") })),
    [dispatch]
  );

  useEffect(() => {
    // console.log("selectedTab >>>>", selectedTab, window.location.pathname)
    const pathname = titleCase(window.location.pathname.replaceAll("/", ""));
    setSelectedTab(pathname);
    refreshBadges();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (allBadges) {
      setBadges(allBadges);
    }
  }, [allBadges]);

  const onRedirect = () => {
    setSelectedTab("Post");
    return <Redirect to="/post" />;
  };
  return (
    <>
      <IonHeader translucent className="ion-no-border">
        <IonToolbar>
          <img
            alt="iPaayos"
            src="../assets/images/ipaayos-logo-word.png"
            height="50"
            className="at-pad-10-left"
          />
          <IonLabel slot="end">
            <div className="profile">
              <img
                alt="iPaayos"
                className="task-image-circle at-margin-10 cursor-pointer"
                src={
                  imageUrl?.length > 4
                    ? imageUrl
                    : "/assets/images/person-gold.png"
                }
                width="40"
                height="40"
                onClick={() => setIsModalOpen(true)}
              />{" "}
              <br />
              <span className="profile-label">PROFILE</span>
            </div>
          </IonLabel>
        </IonToolbar>
      </IonHeader>

      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact={true} path="/post" component={() => <TabPost />} />
            <Route exact={true} path="/tasks" component={() => <TabPros />} />
            <Route
              exact={true}
              path="/appointments"
              component={() => <TabAppointments />}
            />

            <Route
              exact={true}
              path="/notifications"
              component={() => (
                <TabNotifications refreshBadges={refreshBadges} />
              )}
            />

            <Route
              exact={true}
              path="/messages"
              component={() => <TabMessages refreshBadges={refreshBadges} />}
            />

            <Route
              exact={true}
              path="/"
              // render={() => <Redirect to="/post" />}
              render={onRedirect}
            />
            <Route
              exact={true}
              path="/home"
              render={() => <Redirect to="/post" />}
            />
            <Route render={() => <Redirect to="/post" />} />
          </IonRouterOutlet>

          <IonTabBar
            slot="bottom"
            // hidden={platform.name === "web"} //-- temporarily disabled
            selectedTab="account"
            onIonTabsDidChange={(e) =>
              // setSelectedTab(e.detail.tab.toLowerCase())
              setSelectedTab(e.detail.tab)
            }
            className="pad-5-tb"
          >
            <IonTabButton tab="Tasks" href="/tasks">
              <IonIcon
                icon={
                  selectedTab === "Tasks"
                    ? peopleSharp
                    : peopleOutline
                }
              />
              <IonLabel className="at-size-10">PROS</IonLabel>
            </IonTabButton>
            <IonTabButton tab="Appointments" href="/appointments">
              <IonIcon
                icon={
                  selectedTab === "Appointments"
                    ? calendarSharp
                    : calendarOutline
                }
              />
              <IonLabel className="at-size-10">APPOINTMENTS</IonLabel>
            </IonTabButton>

            <IonTabButton tab="Post" href="/post">
              <IonIcon icon={addCircle} className="at-size-44" />
            </IonTabButton>
            <IonTabButton tab="Notifications" href="/notifications">
              {badges.notifications > 0 && (
                <IonBadge>{badges.notifications}</IonBadge>
              )}
              <IonIcon
                icon={
                  selectedTab === "Notifications"
                    ? notificationsSharp
                    : notificationsOutline
                }
              />
              <IonLabel className="at-size-10">NOTIFICATIONS</IonLabel>
            </IonTabButton>
            <IonTabButton tab="Messages" href="/messages">
              {badges.messages > 0 && <IonBadge>{badges.messages}</IonBadge>}
              <IonIcon
                icon={
                  selectedTab === "Messages"
                    ? chatboxEllipsesSharp
                    : chatboxEllipsesOutline
                }
              />
              <IonLabel className="at-size-10">MESSAGES</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
      <ModalAccount
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        // data={provider}
        // updateData={updateData}
      />
      {/* <>{console.log("allBadges>>>>>", allBadges)}</> */}
    </>
  );
};

export default MainMenu;
