import { Button, Textarea } from "@nextui-org/react";
import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

const SendMessage = ({
  setMessages,
}: {
  setMessages: React.Dispatch<React.SetStateAction<any[]>>;
}) => {
  const { state } = useAuthContext();
  const [value, setValue] = useState<string>("");

  const sendHandler = () => {
    if (value.length === 0) {
      return;
    }

    const newMessage = {
      sender: state.user.name,
      message: value,
    };
    setMessages((prevState) => [...prevState, newMessage]);
    setValue("");
  };

  return (
    <div className="flex w-[81%] absolute bottom-3">
      <div className="w-full flex items-center space-x-2 max-h-32">
        <Textarea
          placeholder="Type your message here..."
          // style={{ backgroundColor: "rgb(148 163 184)" }}
          maxRows={5}
          className="rounded-lg max-h-32 px-2"
          size="lg"
          color="primary"
          value={value}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setValue(event.currentTarget.value)
          }
        />
        <Button className="" color="primary" onClick={sendHandler}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default SendMessage;
