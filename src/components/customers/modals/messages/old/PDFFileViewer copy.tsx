import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
// import PDFViewer from 'pdf-viewer-reactjs'
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
import { useWindowWidth } from "@wojtekmaj/react-hooks";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack5";
// https://github.com/prc5/react-zoom-pan-pinch
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";
//-- Support for annotations
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
//-- Support for text layer
import "react-pdf/dist/esm/Page/TextLayer.css";
import { pdfjs } from "react-pdf";
import axios from "axios";
import axiosInstance from "../../../../../lib/axios";

const PDFFileViewer: React.FC<any> = ({ isOpen, onClose, data }) => {
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
  // pdfjs.GlobalWorkerOptions.workerSrc = `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`
  const [numPages, setNumPages] = useState<any>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  // const [scale, setScale] = useState<number>(1);
  const [fileName, setFileName] = useState<string>("");

  const width: any = useWindowWidth();
  const transformComponentRef = useRef<ReactZoomPanPinchRef>(null!);

  const Control = ({ zoomIn, zoomOut, resetTransform }: any) => (
    <>
      <button onClick={() => zoomIn()}>+</button>
      <button onClick={() => zoomOut()}>-</button>
      <button onClick={() => resetTransform()}>x</button>
      <a
        href="https://apichat.tividad.com/uploads/ADONIS-TIVIDAD-CV.pdf?1675234738823"
        download
      >
        DOWNLOAD
      </a>
    </>
  );

  const [pdf, setPdf] = useState<any>(null);
  useEffect(() => { 
    const file = `${process.env.REACT_APP_CHAT_SERVER}/file`;
    axios
      .get(file, {
        params: { fileName: "ADONIS-TIVIDAD-CV.pdf" },
        responseType: "arraybuffer",
      })
      .then((res) => {
        console.log("PdfView res>>>>", res);
        const file = new Blob([res.data], { type: "application/pdf" });
        setPdf(URL.createObjectURL(file));
      })
      .catch((err) => console.log(err));
  }, []);
   
  const getBase64 = async (url: any) => {
    const myInit: any = {
      method: "GET",
      mode: "no-cors",
      headers: { "Content-Type": "application/pdf" },
    };

    // const myRequest = new Request(url, myInit);
    // fetch(myRequest)

    fetch(url, myInit)
      .then(function (response: any) {
        console.log("response 1 >>>>>", response);
        return response;
      })
      .then(function (response: any) {
        console.log("response 2 >>>>>", response);

        // const base64 = window.Buffer.from(response.data, "binary").toString("base64");
        // console.log("base64 >>>", base64);
      })
      .catch(function (e) {
        console.log(e);
      });

    // const { data } = await axiosInstance.get(url);
    // axios.get(url).then((res: any) => {
    //   console.log("res >>>", res)
    // });

    // axios(url, {
    //   method: 'GET',
    //   // mode: 'no-cors',
    //   headers: {
    //     'Access-Control-Allow-Origin': '*',
    //     'Content-Type': 'application/json',
    //   },
    //   withCredentials: true,
    //   // credentials: 'same-origin',
    // }).then(res => {
    //   console.log("res >>>", res)
    // })

    return axios
      .get(url, {
        responseType: "arraybuffer",
      })
      .then((response) => {
        const base64 = Buffer.from(response.data, "binary").toString("base64");
        console.log("base64 >>>", base64);
      });
  };

  function onDocumentLoadSuccess({ numPages }: { numPages: any }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offSet: any) {
    setPageNumber((prevPageNumber) => prevPageNumber + offSet);
  }

  function changePageBack() {
    changePage(-1);
  }

  function changePageNext() {
    changePage(+1);
  }

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

            <IonLabel className="at-pad-10-left"> PDF Viewer</IonLabel>
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
        {pdf && (
          <TransformWrapper
            initialScale={1}
            // initialPositionX={200}
            // initialPositionY={100}
            ref={transformComponentRef}
          >
            {(utils: any) => (
              <>
                <Control {...utils} />
                <TransformComponent>
                  <Document
                    file={pdf}
                    onLoadSuccess={onDocumentLoadSuccess}
                    // options={{
                    //   cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
                    //   cMapPacked: true,
                    // }}
                  >
                    {Array.from(new Array(numPages), (el, index) => (
                      <Page
                        key={`page_${index + 1}`}
                        pageNumber={index + 1}
                        // scale={.9}
                        width={Math.min(width, 800)} // width: 90vw; max-width: 400px
                      />
                    ))}
                  </Document>
                </TransformComponent>
              </>
            )}
          </TransformWrapper>
        )}

        {/*  
        <p>
          Page {pageNumber} of {numPages}
        </p> */}
        {/* <>{console.log("width >>>>", width)}</> */}
      </IonContent>
    </IonModal>
  );
};

export default PDFFileViewer;
