import React, { useState } from "react";
import io from "socket.io-client";

const chat_server: any = process.env.REACT_APP_CHAT_SERVER;
const socket: any = io(chat_server);

const FileUpload = () => {
  const [file, setFile] = useState<any>(null);
  const [percent, setPercent] = useState(0);

  const handleFileChange = (e: any) => {
    // setFile(e.target.files[0]);
    handleUpload(e.target.files[0]);
  };

  const handleUpload = async (file: any) => {
    if (!file) {
      return;
    }

    socket.emit("start-upload", { name: file.name });

    socket.on("ready", (data: any) => {
      console.log("ready  >>>>", data);
    });

    const chunkSize = (1024 * 1024) / 4; // .25MB
    const chunks = Math.ceil(file.size / chunkSize);
    let i = 0;

    socket.on("more-data", (data: any) => {
      if (i > chunks - 1) {
        socket.emit("end-upload", { name: file.name });
        return false;
      }
      console.log("more-data  >>>>", data);
      const start = i * chunkSize;
      const end = start + chunkSize;
      const chunk = file.slice(start, end);
      socket.emit("upload-chunk", { name: file.name, chunk });
      i++;
      setPercent((i / chunks) * 100);
    });

    /*
    // const chunkSize = 1024 * 1024; // 1MB
    const chunkSize = (1024 * 1024) / 4; // .25MB
    const chunks = Math.ceil(file.size / chunkSize);

    for (let i = 0; i < chunks; i++) {
      const start = i * chunkSize;
      const end = start + chunkSize;
      const chunk = file.slice(start, end);

      console.log(`[${i+1} / ${chunks}] Chunk ${end} sent to server. ${Date.now()}`);
      setStatus(`Chunk [${i+1}  / ${chunks}] sent to server.`)
      socket.emit("upload-chunk", { name: file.name, chunk });
      //   socket.emit("upload-chunk", { chunk });
    }
    socket.emit("end-upload", { name: file.name });
    */

    // // Create a FileReader
    // let reader:any = new FileReader();

    // // Read the file as a ArrayBuffer
    // reader.readAsArrayBuffer(file);

    // reader.onload = () => {
    //     // Get the ArrayBuffer data
    //     let data = new Uint8Array(reader.result);

    //     // Send the file data to the server in chunks
    //     for (let i = 0; i < data.length; i += 10000) {
    //         let chunk = data.slice(i, i + 10000);
    //         socket.emit('upload-file', { name: file.name, data: chunk });
    //     }

    //     setStatus('File uploaded successfully');
    // }
  };

  // const handleUpload = () => {
  //     if (!file) {
  //         return;
  //     }

  //     // Create a FileReader
  //     let reader:any = new FileReader();

  //     // Read the file as a ArrayBuffer
  //     reader.readAsArrayBuffer(file);

  //     reader.onload = () => {
  //         // Get the ArrayBuffer data
  //         let data = new Uint8Array(reader.result);

  //         // Send the file data to the server in chunks
  //         for (let i = 0; i < data.length; i += 10000) {
  //             let chunk = data.slice(i, i + 10000);
  //             socket.emit('upload-file', { name: file.name, data: chunk });
  //         }

  //         setStatus('File uploaded successfully');
  //     }
  // }

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {/* <button onClick={handleUpload}>Upload</button> */}
      <p style={{color:'gold'}}>{percent}%</p>
    </div>
  );
};

export default FileUpload;
