import React, { useContext, useEffect, useState } from "react";
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonDatetime,
  IonPopover,
  IonText,
  IonFab,
  IonFabButton,
  IonFooter,
  IonImg,
  IonAlert,
  IonActionSheet,
  useIonToast,
} from "@ionic/react";
import { arrowBackOutline, camera, trash, close } from "ionicons/icons";

import Moment from "moment";
import { format, parseISO } from "date-fns";
import { Swiper, SwiperSlide } from "swiper/react";
import { usePhotoGallery, UserPhoto } from "../../../../hooks/usePhotoGallery";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { fetchTasks, updateTask } from "../../../../hooks/redux/actions/tasksAction";
import { PlatformContext } from "../../../../contexts/PlatformContext";

const MAX_PHOTOS = 2;
const ModalPostTask: React.FC<any> = ({
  isOpen,
  onClose,
  data,
  setData,
  allCategories,
}) => {
  const dispatch: any = useDispatch();
  const { platform } = useContext(PlatformContext);
  const history = useHistory();
  const { photos, takePhoto, deletePhoto, uploadPhoto, deletePhotos } =
    usePhotoGallery();
  const [photoToDelete, setPhotoToDelete] = useState<UserPhoto>();
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [present] = useIonToast();

  const onDismiss = () => {
    deletePhotos();
    onClose(1);
  };

  /******************* disabled temporarily [2023-01-07]
  useEffect(() => {
    // console.log("photos>>>", photos);
    if (isOpen && photos?.length < MAX_PHOTOS) {
      capturePhoto();
    }
    // eslint-disable-next-line
  }, [isOpen]);
  *******************/
 useEffect(() => {
  deletePhotos();
   // eslint-disable-next-line
 }, []);

  const saveData = (e: any) => {
    // alert("Info updated \n" + JSON.stringify(data));
    const name = e.target.name;
    let value = e.detail.value;

    if (name === "taskdate") {
      value = format(parseISO(value), "MMMM d, yyyy");
    } else if (name === "tasktime") {
      value = format(parseISO(value), "hh:mm a");
    }
    setData({ ...data, [name]: value });
    // onClose(1);
  };

  const capturePhoto = () => {
    if (photos?.length < MAX_PHOTOS) {
      takePhoto("tsk_");
    } else {
      setShowAlert(true);
      // alert("Maximun images reached. Please delete some photos.");
    }
  };
  const postTask = () => {
    try {
      var dateTime = new Date(data.taskdate + " " + data.tasktime);
      Moment.locale("en");
      data.task_datetime = Moment(dateTime).format("yyyy-MM-DD HH:mm");

      let images: any = [];
      try {
        if (photos?.length > 0) {
          photos?.map((photo: any) => {
            uploadPhoto(photo);
            const filename = photo.filepath.substring(
              photo.filepath.lastIndexOf("/") + 1
            );
            images = [...images, `${platform.uploadsPath}/${filename}`];
            return true;
          });
        }
        present({
          // color: "medium",
          duration: 2000,
          // buttons: [{ text: 'hide', handler: () => dismiss() }],
          message: `New "${data.category}" task posted.`,
          onDidDismiss: () => {
            deletePhotos();
            onDismiss();
            dispatch(fetchTasks()); 
            history.push("/appointments?m=bidding");

            /***********************************
             * PENDING: 2023-01-07
             * send notification to all service provider with this type of category
             * 
             */
          },
          onWillDismiss: () => console.log("will dismiss"),
        });
      } catch (error: any) {
        console.log(`Something went wrong: ${error}`);
      }
      let newData: any = { ...data, images: images?.join(",") };
      dispatch(updateTask(newData));
    } catch (error) {}
  };

  /***
  const isWeekday = (dateString: string) => {
    const date = new Date(dateString);
    const utcDay = date.getUTCDay();
    // Date will be enabled if it is not Sunday or Saturday
    return utcDay !== 0 && utcDay !== 6;
  };
  */

  const isPastDate = (dateString: string) => {
    const date = new Date(dateString);
    const current = new Date();
    current.setDate(current.getDate() - 1);
    return date > current;
  };

  const savePhoto = async (photo: any) => {
    const files: any = await uploadPhoto(photo);
  };
  useEffect(() => {
    if (photos?.length > 0) {
      savePhoto(photos[0]);
    }
    // eslint-disable-next-line
  }, [photos]);

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onDismiss} at-default>
      <IonHeader color="none">
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={onDismiss}>
              <IonIcon icon={arrowBackOutline} />
            </IonButton>
          </IonButtons>
          <IonTitle className="at-center">New Task</IonTitle>
          <IonButtons slot="end">
            <IonButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" xat-default-modal>
        <IonCard color="none" at-default>
          <IonCardContent>
            <Swiper
              slidesPerView={2}
              loop={false}
              spaceBetween={10}
              className="slider-task-images"
            >
              {photos?.length > 0 &&
                photos?.map((photo: any, index: number) => (
                  <SwiperSlide key={index}>
                    <IonImg
                      src={photo.webviewPath}
                      onClick={() => setPhotoToDelete(photo)}
                    />
                  </SwiperSlide>
                ))}
              {photos &&
                Array.from(Array(MAX_PHOTOS - photos?.length))?.map(
                  (n: any, index: number) => (
                    <SwiperSlide
                      style={{ maxHeight: "200px !important" }}
                      onClick={() => capturePhoto()}
                      key={index + 3}
                    >
                      <div
                        className="at-flex at-flex-center at-cursor-pointer"
                        style={{ height: "100%" }}
                      >
                        <IonIcon
                          icon={camera}
                          size="large"
                          color="tertiary"
                        ></IonIcon>
                      </div>
                      {n}
                    </SwiperSlide>
                  )
                )}
            </Swiper>

            <IonItem color="none">
              <IonLabel>Category</IonLabel>
              <IonSelect
                multiple={false}
                value={data.category}
                onIonChange={(e) =>
                  setData({ ...data, category: e.detail.value! })
                }
              >
                {allCategories?.length > 0 &&
                  allCategories?.map((category: any, i: number) => (
                    <IonSelectOption value={category.name} key={i}>
                      {category.name}
                    </IonSelectOption>
                  ))}
              </IonSelect>
            </IonItem>
            <IonItem color="none" button={true} id="open-date-input">
              <IonLabel>Task Date</IonLabel>
              <IonText slot="end">{data.taskdate}</IonText>
              <IonPopover
                trigger="open-date-input"
                showBackdrop={false}
                alignment="end"
              >
                <IonDatetime
                  name="taskdate"
                  presentation="date"
                  onIonChange={saveData}
                  showDefaultButtons={true}
                  // isDateEnabled={isWeekday}
                  isDateEnabled={isPastDate}
                />
              </IonPopover>
            </IonItem>
            <IonItem color="none" button={true} id="open-time-input">
              <IonLabel>Task Time</IonLabel>
              <IonText slot="end">{data.tasktime}</IonText>
              <div style={{ position: "relative", maxWidth: "400px" }}>
                <IonPopover
                  trigger="open-time-input"
                  showBackdrop={false}
                  alignment="end"
                >
                  <IonDatetime
                    name="tasktime"
                    presentation="time"
                    onIonChange={saveData}
                    minuteValues={[0, 15, 30, 45]}
                    showDefaultButtons={true}
                  />
                </IonPopover>
              </div>
            </IonItem>
            <IonItem color="none">
              <IonLabel>Location</IonLabel>
              <IonTextarea
                name="location"
                value={data.location}
                onIonChange={saveData}
                rows={3}
              />
              {/* <IonText slot="end" >{data.location}</IonText>  */}
            </IonItem>
            <IonItem color="none">
              <IonLabel>Remarks</IonLabel>
              {/* <IonIcon
                color="primary"
                icon={informationCircle}
                size="small"
                slot="start"
              /> */}
              <IonTextarea
                name="remarks"
                value={data.remarks}
                onIonChange={saveData}
                rows={5}
              />
            </IonItem>
          </IonCardContent>
        </IonCard>
      </IonContent>
      <IonFooter className="ion-no-border">
        <IonToolbar>
          <IonButtons className="pad-20 footer-buttons">
            <IonButton onClick={onDismiss}>
              <IonLabel style={{ color: "var(--ion-color-primary)" }}>
                CANCEL
              </IonLabel>
            </IonButton>
            <IonLabel></IonLabel>
            <IonFab vertical="center" horizontal="center">
              <IonFabButton onClick={() => capturePhoto()}>
                <IonIcon icon={camera}></IonIcon>
              </IonFabButton>
            </IonFab>
            <IonButton onClick={postTask}>
              <IonLabel style={{ color: "var(--ion-color-primary)" }}>
                POST
              </IonLabel>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonFooter>
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        cssClass="my-custom-class"
        header={"Image Capture"}
        // subHeader={"Subtitle"}
        message={"Maximun number of images reached. Please delete some photos."}
        buttons={["OK"]}
      />
      <IonActionSheet
        isOpen={!!photoToDelete}
        buttons={[
          // {
          //   text: "Upload",
          //   role: "destructive",
          //   icon: cloudUpload,
          //   handler: () => {
          //     if (photoToDelete) {
          //       uploadPhoto(photoToDelete);
          //     }
          //   },
          // },
          {
            text: "Delete",
            role: "destructive",
            icon: trash,
            handler: () => {
              if (photoToDelete) {
                deletePhoto(photoToDelete);
                setPhotoToDelete(undefined);
              }
            },
          },
          {
            text: "Cancel",
            icon: close,
            role: "cancel",
          },
        ]}
        onDidDismiss={() => setPhotoToDelete(undefined)}
      />
    </IonModal>
  );
};

export default ModalPostTask;
