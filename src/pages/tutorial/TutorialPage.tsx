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
  const { isLoggingIn, isLoggedIn, state } = useAuthContext();
  const { tutorialId } = useParams();
  const { isLoading, validateTutorialId } = useTutorial();
  const { setConn, conn } = useWebsocketContext();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  let once = false;

  const joinDiscussionHandler = async () => {
    try {
      await axios.post(
        `${BASE_URL}/api/ws/${tutorialId}/create`,
        {},
        {
          headers: { Authorization: `Bearer ${state.user.tokens.accessToken}` },
        }
      );

      if (!conn) {
        const ws = new WebSocket(
          `wss://nustuts-backend.onrender.com/api/public/ws/${tutorialId}/join?userId=${state.user.id}&name=${state.user.name}&userType=${state.user.role.userType}`
        );
        if (ws.OPEN) {
          setConn(ws);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isLoggingIn && isLoggedIn) {
      validateTutorialId();
      if (!once) {
        joinDiscussionHandler();
        once = true;
      }
    }
  }, [isLoggingIn, isLoggedIn]);

  if (isLoggingIn || isLoading) {
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
