import { useEffect, useState } from "react";
import AllMessages from "../../components/discussion/AllMessages";
import SendMessage from "../../components/discussion/SendMessage";
import { useAuthContext } from "../../hooks/useAuthContext";
import LoadingSpinner from "../../components/LoadingSpinner";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Message } from "../../types";

const DiscussionPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { isLoggingIn, isLoggedIn, state } = useAuthContext();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const params = useParams();

  useEffect(() => {
    const sendRequest = async () => {
      try {
      } catch (error) {}
      const res = await axios.get(`/api/messages/${params.tutorialId}`, {
        headers: { Authorization: `Bearer ${state.user.tokens.accessToken}` },
      });
      setMessages(res.data.data.messages);
      setIsLoading(false);
    };

    if (isLoggedIn) {
      sendRequest();
    }
  }, [isLoggedIn]);

  if (isLoggingIn || isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full p-5 pt-0 overflow-hidden">
      <AllMessages messages={messages} />
      <SendMessage setMessages={setMessages} />
    </div>
  );
};

export default DiscussionPage;
