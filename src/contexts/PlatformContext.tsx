import { Capacitor } from "@capacitor/core";
import React, { createContext, useEffect, useMemo, useState } from "react";
import { File } from "@ionic-native/file";

export const PlatformContext = createContext<any>(null);

const platformName: string = Capacitor.getPlatform();
// const platformName: string = "ios";
// const platformName: string = "android";

export const PlatformProfider = ({ children }: { children: any }) => {
  const getPlatformPath = () => {
    switch (platformName) {
      case "ios":
        return File.documentsDirectory;
      case "android":
        console.log(
          "PlatformProfider platformName>>>",
          platformName,
          File.externalDataDirectory
        );
        // return File.externalRootDirectory;
        // return File.dataDirectory;
        return File.externalDataDirectory;
      default:
        return "/";
    }
  };
  // const getDownloadPath = () => {
  //   switch (platformName) {
  //     case 'ios':
  //       return File.documentsDirectory + 'downloads/';
  //     case 'android':
  //       // return File.externalRootDirectory + 'downloads/';
  //       // return File.dataDirectory + 'downloads/';
  //       return File.externalDataDirectory + 'downloads/';
  //     default:
  //       return '/downloads/'
  //   }
  // }

  const username = localStorage.getItem("userName");
  const [platform, setPlatform] = useState({
    name: platformName,
    path: getPlatformPath(),
    downloadPath: getPlatformPath() + "downloads/",
    downloadFilename: getPlatformPath() + "downloads/playlist.json",
    // username: localStorage.getItem("uname"),
    user_id: localStorage.getItem("id"),
    // user_id: 1,
    // username: "auric.gavin.tividad",
    // first_name: "Auric Gavin",
    username,
    first_name: localStorage.getItem("name"),
    email: localStorage.getItem("eml"),
    pid: localStorage.getItem("pid"),
    // uploadsPath: `http://localhost:5000/uploads/user/${username}`,
    // uploadsPath: `https://api.ipaayos.com/uploads/user/${username}`,
    uploadsPath: `${process.env.REACT_APP_UPLOADS_PATH}${username}`,
  });

  const providerValue = useMemo(
    () => ({ platform, setPlatform }),
    [platform, setPlatform]
  );

  useEffect(() => {
    if (platformName !== "web") {
      // alert(platformName + ' ' + getPlatformPath())
      try {
        File.createDir(getPlatformPath(), "downloads", false)
          .then((response) => {
            console.log("downloads - Directory created", response);
          })
          .catch((err) => {
            console.log('Could not create directory "downloads" ', err);
          });
      } catch (error) {
        // console.log(error)
      }
    }
  }, []);
  return (
    <PlatformContext.Provider value={providerValue}>
      {children}
    </PlatformContext.Provider>
  );
};
