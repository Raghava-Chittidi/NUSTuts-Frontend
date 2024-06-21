import { Avatar } from "@nextui-org/react";
import { strToColour } from "../../util/util";
import { Message } from "../../types";
import { useAuthContext } from "../../hooks/useAuthContext";

const MessageItem = ({
  message,
  changed,
}: {
  message: Message;
  changed: boolean;
}) => {
  const { state } = useAuthContext();

  return (
    <div className={`${changed && "pt-5"}`}>
      <div
        className={`flex ${
          message.sender === state.user.name &&
          "flex-row-reverse space-x-reverse"
        } items-end space-x-4 w-full text-justify`}
      >
        {changed && (
          <Avatar
            name={message.sender.charAt(0).toUpperCase()}
            style={{ backgroundColor: strToColour(message.sender) }}
            color="primary"
            className="text-xl w-12 h-12 mb-[0.125rem]"
          />
        )}
        <div
          className={`flex flex-col ${
            message.sender === state.user.name
              ? "mr-16 items-end"
              : "ml-16 items-start"
          } max-w-[85%]`}
        >
          {changed && (
            <h1
              className={`${
                message.sender === state.user.name ? "text-right" : "text-left"
              } w-full text-sm pb-[0.1rem]`}
            >
              {message.sender}
            </h1>
          )}
          <div
            className={`${
              message.sender === state.user.name
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            } rounded-lg text-wrap px-4 py-2 w-fit`}
          >
            {message.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
