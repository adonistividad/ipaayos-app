import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { AuthProvider } from "./contexts/AuthProvider";
import App from "./App";

// alert(process.env.NODE_ENV)
//-- Best Practices for React Data Security, Logins, Passwords, JWTs
//-- https://www.youtube.com/watch?v=3QaFEu-KkR8
if (process.env.NODE_ENV === "production") {
  disableReactDevTools();
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
