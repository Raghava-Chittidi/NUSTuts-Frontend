import { Button, Textarea } from "@nextui-org/react";
import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import axios from "axios";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useWebsocketContext } from "../../hooks/useWebsocketContext";
import { IoMdSend } from "react-icons/io";
import { TutorialContextType } from "../../types";
import { toast } from "react-toastify";

const SendMessage = () => {
  const { state } = useAuthContext();
  const { conn } = useWebsocketContext();
  const [value, setValue] = useState<string>("");
  const { tutorialId } = useOutletContext<TutorialContextType>();
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const sendHandler = async () => {
    if (value.trim().length === 0) {
      return;
    }

    if (conn === null) {
      navigate("/");
      return;
    }

    /* 
      New message to be sent through the websocket connection and received by this user in the backend
      who then broadcasts the message to all the other users in the same room (tutorial)
    */
    const newMessage = {
      sender: state.user.name,
      senderId: state.user.id,
      content: value.trim(),
      tutorialId: tutorialId,
      userType: state.user.role.userType,
      type: "self",
    };

    conn.send(value);
    setValue("");

    // Upload sent message into the db
    try {
      await axios.post(
        `${BASE_URL}/api/messages/${tutorialId}`,
        {
          senderId: state.user.id,
          userType: newMessage.userType,
          content: newMessage.content,
        },
        {
          headers: { Authorization: `Bearer ${state.user.tokens.accessToken}` },
        }
      );
    } catch (error) {
      toast.error("Failed to send message!");
      console.log(error);
    }
  };

  return (
    <div className="flex w-[80%] absolute bottom-3 px-3">
      <div className="w-full flex items-center space-x-2 max-h-32">
        <Textarea
          placeholder="Type your message here..."
          maxRows={3}
          className="rounded-lg max-h-32 px-2"
          color="primary"
          size="lg"
          value={value}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setValue(event.currentTarget.value)
          }
        />
        <Button
          startContent={<IoMdSend size={28} />}
          size="md"
          color="primary"
          onClick={sendHandler}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default SendMessage;
