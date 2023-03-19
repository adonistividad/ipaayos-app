// https://ionicframework.com/docs/react/your-first-app
import { useState, useEffect, useContext } from "react";
import { isPlatform } from "@ionic/react";
import axios from "axios";
import qs from "qs";

import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from "@capacitor/camera";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { Storage } from "@capacitor/storage";
import { Capacitor } from "@capacitor/core";
import { PlatformContext } from "../contexts/PlatformContext";

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}

export async function base64FromPath(path: string): Promise<string> {
  const response = await fetch(path);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject("method did not return a string");
      }
    };
    reader.readAsDataURL(blob);
  });
}
const PHOTO_STORAGE = "photos";
export function usePhotoGallery() {
  const [photos, setPhotos] = useState<UserPhoto[]>([]);
  const { platform } = useContext(PlatformContext);

  const savePicture = async (
    photo: Photo,
    fileName: string
  ): Promise<UserPhoto> => {
    let base64Data: string;
    // "hybrid" will detect Cordova or Capacitor;
    if (isPlatform("hybrid")) {
      const file = await Filesystem.readFile({
        path: photo.path!,
      });
      base64Data = file.data;
    } else {
      base64Data = await base64FromPath(photo.webPath!);
    }
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data,
    });

    // .then((res: any) => console.log("res>>>", res));

    // console.log("savedFile.uri>>>", savedFile);
    // console.log("fileName>>>", fileName);
    // console.log("base64Data ===>>>", base64Data);

    if (isPlatform("hybrid")) {
      // Display the new image by rewriting the 'file://' path to HTTP
      // Details: https://ionicframework.com/docs/building/webview#file-protocol
      return {
        filepath: savedFile.uri,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri),
      };
    } else {
      // Use webPath to display the new image instead of base64 since it's
      // already loaded into memory
      return {
        filepath: fileName,
        webviewPath: photo.webPath,
      };
    }
  };

  const loadSaved = async () => {
    const { value } = await Storage.get({ key: PHOTO_STORAGE });

    const photosInStorage = (value ? JSON.parse(value) : []) as UserPhoto[];
    // If running on the web...
    if (!isPlatform("hybrid")) {
      for (let photo of photosInStorage) {
        const file = await Filesystem.readFile({
          path: photo.filepath,
          directory: Directory.Data,
        });
        // Web platform only: Load the photo as base64 data
        photo.webviewPath = `data:image/jpeg;base64,${file.data}`;
      }
    } 
    // console.log("photosInStorage >>> ", photosInStorage);
    setPhotos(photosInStorage);
  };

  const takePhoto = async (
    prefix: string = "",
    cameraSource: CameraSource = CameraSource.Camera
  ) => {
    // const cameraSource= CameraSource["Cource"];
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      // source: CameraSource.Camera,
      // source: CameraSource.Photos,
      source: cameraSource,
      quality: 100,
    });

    // console.log("filename ", filename );
    const fileName = prefix + new Date().getTime() + ".jpg";
    const savedFileImage = await savePicture(photo, fileName);
    const newPhotos = [savedFileImage, ...photos];
    setPhotos(newPhotos);
    Storage.set({ key: PHOTO_STORAGE, value: JSON.stringify(newPhotos) });

    // console.log("savedFileImage>>>>", savedFileImage)
    loadSaved();
  };

  useEffect(() => {
    loadSaved();
  }, []);

  const deletePhotos = async () => {
    // Update photos array cache by overwriting the existing photo array
    Storage.set({ key: PHOTO_STORAGE, value: JSON.stringify([]) });

    photos.map(async (photo: any) => {
      const filename = photo.filepath.substring(
        photo.filepath.lastIndexOf("/") + 1
      );
      await Filesystem.deleteFile({
        path: filename,
        directory: Directory.Data,
      });
    });
    setPhotos([]);
  };

  const deletePhoto = async (photo: UserPhoto) => {
    // Remove this photo from the Photos reference data array
    const newPhotos = photos.filter((p) => p.filepath !== photo.filepath);

    // Update photos array cache by overwriting the existing photo array
    Storage.set({ key: PHOTO_STORAGE, value: JSON.stringify(newPhotos) });

    // delete photo file from filesystem
    const filename = photo.filepath.substring(
      photo.filepath.lastIndexOf("/") + 1
    );
    await Filesystem.deleteFile({
      path: filename,
      directory: Directory.Data,
    });
    setPhotos(newPhotos);
  };
  const uploadPhoto = async (photo: UserPhoto) => {
    // Remove this photo from the Photos reference data array
    // const newPhotos = photos.filter((p) => p.filepath !== photo.filepath);

    // // Update photos array cache by overwriting the existing photo array
    // Storage.set({ key: PHOTO_STORAGE, value: JSON.stringify(newPhotos) });

    // delete photo file from filesystem
    let filename = photo?.filepath?.substring(
      photo?.filepath?.lastIndexOf("/") + 1
    );
    let webviewPath: string = photo?.webviewPath + "";

    // console.log("webviewPath >>>>", webviewPath, photo?.webviewPath)
    // console.log("filepath >>>>",   photo?.filepath, platform?.username)
    //-- for resizing image file to 200dpi
    const EXT = "." + filename?.split(".").pop();
    filename = filename?.replaceAll(EXT, `~200${EXT}`);

    /////////////////////////
    const baseURL = process.env.REACT_APP_SERVER_URL;
    let uploadURL = `${baseURL}/upload`;
    let data: any;
    let config: any = {
      header: { "content-type": "multipart/form-data" },
    };
    if (webviewPath?.startsWith("data")) {
      uploadURL = `${baseURL}/upload/image`;
      data = qs.stringify({
        folder: platform?.username,
        filename: filename,
        base64image: webviewPath,
      });
      config = {
        header: { "content-type": "application/x-www-form-urlencoded" },
      };
      // console.log("starts with data>>>");

      // alert("starts with data>>>>>>>>" + filename);
    } else {
      // console.log("starts with file>>>>>>>>", photo?.filepath);

      // alert("starts with file>>>>>>>>" + photo.filepath);

      const response: any = await fetch(photo?.webviewPath + "");
      const blob: any = await response.blob();
      data = new FormData();
      data.append("folder", platform.username);
      data.append("images", blob, filename);
    }

    return await axios
      .post(uploadURL, data, config)
      .then((res: any) => {
        // const filename = file.name;
        // if (res.data.status === 200) {
        //   setValue(name, filename);
        //   setImage(`${uploadsPath}${folder}/${filename}`);
        // }
        // const EXT="."+filename.split('.').pop();
        // filename=filename.replaceAll(EXT, `~200${EXT}`);

        console.log("success>>>>>", uploadURL, res.data.files);
        return res.data.files;
      })
      .catch((error: any) => {
        console.log("error", error);
        // setErrorMessage(res.data.msg);
        throw error;
      });
  };

  return {
    uploadPhoto,
    deletePhoto,
    deletePhotos,
    photos,
    takePhoto,
  };
}
