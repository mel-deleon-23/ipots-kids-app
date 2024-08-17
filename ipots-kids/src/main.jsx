import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  // NOTE FROM ERKO AND EDERES:
  // Replace clientId with your own client id from here https://console.cloud.google.com/apis/credentials
  // follow this guide to setup using react https://muhammedsahad.medium.com/react-js-a-step-by-step-guide-to-google-authentication-926d0d85edbd
  <GoogleOAuthProvider clientId="PUT YOUR CLIENT ID HERE">
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GoogleOAuthProvider>
);
