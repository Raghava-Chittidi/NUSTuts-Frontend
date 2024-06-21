import { Button, Textarea } from "@nextui-org/react";
import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useWebsocketContext } from "../../hooks/useWebsocketContext";
import { IoMdSend } from "react-icons/io";

const SendMessage = () => {
  const { state } = useAuthContext();
  const { conn } = useWebsocketContext();
  const [value, setValue] = useState<string>("");
  const params = useParams();
  const navigate = useNavigate();

  const sendHandler = async () => {
    if (value.trim().length === 0) {
      return;
    }

    if (conn === null) {
      navigate("/");
      return;
    }

    const newMessage = {
      sender: state.user.name,
      senderId: state.user.id,
      content: value.trim(),
      tutorialId: params.tutorialId,
      userType: state.user.role.userType,
      type: "self",
    };

    conn.send(value);
    setValue("");

    try {
      await axios.post(
        `/api/messages/${params.tutorialId}`,
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
