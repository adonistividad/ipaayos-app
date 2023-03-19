import React, {useState} from "react";
import FileViewer from "react-file-viewer";
import { IonButton } from "@ionic/react";
const pdfile =
  "https://apichat.tividad.com/uploads/ADONIS-TIVIDAD-CV.pdf?1675085235521";
const type = "pdf";

const ReactFileViewer = () => {
  const [view, setView] = useState(false);

  const handleView = () => {
    setView(!view);
  };

  const onError = (e) => {
    // Logger.logError(e, "error in file-viewer");
  };

  return (
    <>
      {/* <button onClick={handleView}>View</button> */}
      <IonButton onClick={handleView}>PDF</IonButton>
      {view && (
        <FileViewer
          fileType={type}
          filePath={pdfile}
          // errorComponent={CustomErrorComponent}
          onError={onError}
        />
      )}
    </>
  );
};

export default ReactFileViewer;
