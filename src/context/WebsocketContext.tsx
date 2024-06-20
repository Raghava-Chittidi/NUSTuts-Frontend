import { ReactNode, createContext, useState } from "react";

type Conn = WebSocket | null;

export const WebsocketContext = createContext<{
  conn: Conn;
  setConn: (c: Conn) => void;
}>({
  conn: null,
  setConn: () => {},
});

const WebsocketProvider = ({ children }: { children: ReactNode }) => {
  const [conn, setConn] = useState<Conn>(null);

  return (
    <WebsocketContext.Provider value={{ conn, setConn }}>
      {children}
    </WebsocketContext.Provider>
  );
};

export default WebsocketProvider;
