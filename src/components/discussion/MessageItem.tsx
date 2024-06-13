import { Avatar } from "@nextui-org/react";
import { strToColour } from "../../util/util";
import { Message } from "../../types";

const MessageItem = ({
  message,
  alt,
  changed,
}: {
  message: Message;
  alt: boolean;
  changed: boolean;
}) => {
  return (
    <div
      className={`flex items-center space-x-4 ${
        alt ? "justify-end" : "justify-start"
      } ${changed && "pt-5"}`}
    >
      {alt && (
        <div
          className={`bg-gray-200 flex items-center rounded-lg py-2 px-5 max-w-[90%] text-wrap ${
            !changed && "mr-14"
          }`}
        >
          {message.content}
        </div>
      )}
      {changed && (
        <Avatar
          name={message.sender.charAt(0).toUpperCase()}
          style={{ backgroundColor: strToColour(message.sender) }}
          color="primary"
          className="text-xl"
          showFallback
        />
      )}
      {!alt && (
        <div
          className={`bg-gray-200 flex items-center rounded-lg py-2 px-5 max-w-[90%] text-wrap ${
            !changed && "ml-14"
          }`}
        >
          {message.content}
        </div>
      )}
    </div>
  );
};

export default MessageItem;