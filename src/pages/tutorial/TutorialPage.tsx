import { Outlet, useParams } from "react-router-dom";
import { Sidebar } from "../../components/sidebar/Sidebar";
import { useTutorial } from "../../hooks/useTutorial";
import { useAuthContext } from "../../hooks/useAuthContext";
import LoadingSpinner from "../../components/LoadingSpinner";
import { TutorialContextType } from "../../types";
import { useEffect } from "react";
import axios from "axios";
import { useWebsocketContext } from "../../hooks/useWebsocketContext";

const TutorialPage = () => {
  const { state } = useAuthContext();
  const { tutorialId } = useParams();
  const { isLoading, validateTutorialId } = useTutorial();
  const { setConn, conn } = useWebsocketContext();
  let once = false;
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  // Joins the discussion for the tutorial by connecting websocket to the server with tutorialId as the room
  const joinDiscussionHandler = async () => {
    try {
      await axios.post(
        `${BASE_URL}/api/ws/${tutorialId}/create`,
        {},
        {
          headers: { Authorization: `Bearer ${state.user.tokens.accessToken}` },
        }
      );

      // Change path and protocol based on env variable (for dev vs deployment)
      const path: string = BASE_URL.split("//")[1];
      const websocketProtocol = path.includes("localhost") ? "ws" : "wss";
      if (!conn) {
        const ws = new WebSocket(
          `${websocketProtocol}://${path}/api/public/ws/${tutorialId}/join?userId=${state.user.id}&name=${state.user.name}&userType=${state.user.role.userType}`
        );
        if (ws.OPEN) {
          setConn(ws);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Check if user can visit this tutorial page
  useEffect(() => {
    validateTutorialId();
    if (!once) {
      // User should only join the discussion once
      joinDiscussionHandler();
      once = true;
    }
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex w-full overflow-hidden max-h-[calc(100vh-65px)]">
      <Sidebar />
      <Outlet
        context={
          { tutorialId: Number(tutorialId) } satisfies TutorialContextType
        }
      />
    </div>
  );
};

export default TutorialPage;
