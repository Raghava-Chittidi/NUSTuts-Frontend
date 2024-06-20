import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import App from "./App";
import "./index.css";
import { AuthContextProvider } from "./context/AuthContext";
import WebsocketProvider from "./context/WebsocketContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <AuthContextProvider>
        <WebsocketProvider>
          <App />
        </WebsocketProvider>
      </AuthContextProvider>
    </NextUIProvider>
  </React.StrictMode>
);
