import React from "react";
// import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonLabel,
  IonTitle,
  IonContent,
} from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";

const FileViewer: React.FC<any> = ({ isOpen, onClose, data }) => {
  const docs = [
    // {uri: "http://localhost:5002/uploads/110140630_976_stpaul_scathedrallondon.jpg",},
    // {uri: "http://localhost:5002/uploads/DanielCheong-Vertoramas.jpg",},
    // {uri: "http://localhost:5002/uploads/detroit.jpg",},
    // {
    //   uri: "https://api.ipaayos.tividad.com/uploads/user/don/msg_1674675643451.jpg",
    // }, // Remote file
    // {
    //   uri: "https://apichat.tividad.com/uploads/pexels-christian-heitz-842711.jpg?1674821273698",
    // }, // Remote file
    // { uri: "https://url-to-my-pdf.pdf" }, // Remote file
    // { uri: require("./example-files/pdf.pdf") }, // Local File
    // {
    //   uri: "https://api.ipaayos.tividad.com/public/ADONIS-TIVIDAD-CV.pdf",
    //   method: "GET",
    //   withCredentials: false,
    //   crossorigin: true,
    //   mode: "no-cors",
    //   headers: {
    //     "Access-Control-Allow-Origin": "*",
    //   },
    // },
    { uri: "/assets/docs/ADONIS-TIVIDAD-CV.pdf" }, // Local File
    { uri: "/assets/docs/ADONIS-TIVIDAD-CV.docx" }, // Local File
    { uri: "/assets/docs/ecommerce-template.xlsx" }, // Local File
    { uri: "/assets/images/ipaayos-logo.jpg" }, // Local File
    { uri: "/assets/images/ipaayos-logo-word.png" }, // Local File
    { uri: "/assets/images/person-gold.png" }, // Local File
  ];
  const onDismiss = () => {
    onClose(1);
  };
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onDismiss} className="avt-chat">
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={onDismiss}>
              <IonIcon icon={arrowBackOutline} />
            </IonButton>

            <IonLabel className="at-pad-10-left"> Doc Viewer</IonLabel>
          </IonButtons>
          <IonTitle></IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onDismiss}>
              {/* <IonIcon icon={arrowBackOutline}/> */}
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent
        // ref={refContent}
        // fullscreen
        className="ion-padding ion-content-default full-height"
        scrollEvents={true}
        onIonScrollStart={(_e) => {
          console.log(_e);
        }}
      >
        <DocViewer
          documents={docs}
          initialActiveDocument={docs[0]}
          pluginRenderers={DocViewerRenderers}
          config={{
            header: {
              disableHeader: false,
              disableFileName: false,
              retainURLParams: false,
            },
            pdfZoom: {
              defaultZoom: 1.1, // 1 as default,
              zoomJump: 0.2, // 0.1 as default,
            },
          }}
          prefetchMethod="GET"
          requestHeaders={{
            "Access-Control-Allow-Origin": "*",
            AllowedOrigins: "*",
          }}

          // source={{
          //   header: {
          //      'Access-Control-Allow-Origin': '*'
          //   }
          // }}
          // theme={{
          //   primary: "#5296d8",
          //   secondary: "#ffffff",
          //   tertiary: "#5296d899",
          //   textPrimary: "#ffffff",
          //   textSecondary: "#5296d8",
          //   textTertiary: "#00000099",
          //   disableThemeScrollbar: false,
          // }}
        />
        {/* <DocViewer
          documents={docs}
          initialActiveDocument={docs[1]}
          pluginRenderers={DocViewerRenderers}
          config={{
            noRenderer: {
              overrideComponent: ({ document, fileName }) => {
                const fileText = fileName || document?.fileType || "";
                console.log(document);
                if (fileText) {
                  return <div>no renderer for {fileText}</div>;
                }
                return <div>no renderer</div>;
              },
            },
            loadingRenderer: {
              overrideComponent: ({ document, fileName }) => {
                const fileText = fileName || document?.fileType || "";
                if (fileText) {
                  return <div>loading ({fileText})</div>;
                }
                return <div>loading</div>;
              },
            },
            csvDelimiter: ",",
            pdfZoom: {
              defaultZoom: 1.1,
              zoomJump: 0.2,
            },
          }}
          // language="pl"
        /> */}
      </IonContent>
    </IonModal>
  );
};

export default FileViewer;
