import { useEffect, useState } from "react";
import AllMessages from "../../components/discussion/AllMessages";
import SendMessage from "../../components/discussion/SendMessage";
import { useAuthContext } from "../../hooks/useAuthContext";
import LoadingSpinner from "../../components/LoadingSpinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Message } from "../../types";
import { useWebsocketContext } from "../../hooks/useWebsocketContext";
import { toast } from "react-toastify";

const DiscussionPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { state } = useAuthContext();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { conn } = useWebsocketContext();
  const params = useParams();
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  // Listens for message events and sets messages to include the new messages
  useEffect(() => {
    if (conn === null) {
      navigate(`/tutorial/${params.tutorialId}/discussion`);
      return;
    }

    conn.onmessage = (message) => {
      const msg: Message = JSON.parse(message.data);
      state.user.name === msg.sender &&
      state.user.role.userType === msg.userType
        ? (msg.type = "self")
        : (msg.type = "other");
      setMessages((prevState) => [...prevState, msg]);
    };

    conn.onclose = () => {};
    conn.onerror = () => {};
    conn.onopen = () => {};
  }, [conn, messages]);

  // Fetch tutorial message history from the server
  useEffect(() => {
    const sendRequest = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/messages/${params.tutorialId}`,
          {
            headers: {
              Authorization: `Bearer ${state.user.tokens.accessToken}`,
            },
          }
        );

        // Maps messages to include a type field to differentiate between self and other messages
        const allMessages = res.data.data.messages.map((message: any) => {
          return {
            ...message,
            type: "self"
              ? message.senderId === state.user.id &&
                message.userType === state.user.role.userType
              : "other",
          };
        });
        setMessages(allMessages);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch messages!");
        setIsLoading(false);
      }
    };

    sendRequest();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full p-5 pt-0 overflow-hidden">
      <AllMessages messages={messages} />
      <SendMessage />
    </div>
  );
};

export default DiscussionPage;
