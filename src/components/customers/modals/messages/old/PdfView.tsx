import axios from "axios";
import React, { useEffect, useState } from "react";

const PdfView = () => {
  const [pdf, setPdf] = useState<any>(null);
  useEffect(() => {
    // `${process.env.REACT_APP_CHAT_SERVER}
    // alert(process.env.REACT_APP_CHAT_SERVER);
    // const file="https://api.ipaayos.tividad.com/public/ADONIS-TIVIDAD-CV.pdf";
    // const file = `${process.env.REACT_APP_CHAT_SERVER}/uploads/ADONIS-TIVIDAD-CV.pdf`;
    // const file = "/uploads/ADONIS-TIVIDAD-CV.pdf";
    // const file = `http://localhost:5002/pdf`;
    const file = `${process.env.REACT_APP_CHAT_SERVER}/pdf`;
    axios
      .get(file, { responseType: "arraybuffer" })
      .then((res) => {
        console.log("PdfView res>>>>", res);
        const file = new Blob([res.data], { type: "application/pdf" });
        setPdf(URL.createObjectURL(file));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {pdf ? (
        <embed src={pdf} type="application/pdf" width="100%" height="500px" />
      ) : (
        <p>Loading PDF...</p>
      )}
    </div>
  );
};

export default PdfView;
