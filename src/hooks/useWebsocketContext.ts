import { useContext } from "react";
import { WebsocketContext } from "../context/WebsocketContext";

export const useWebsocketContext = () => {
  const context = useContext(WebsocketContext);

  if (!context) {
    throw new Error(
      "useWebsocketContext must be used within an WebsocketContextProvider"
    );
  }

  return context;
};
