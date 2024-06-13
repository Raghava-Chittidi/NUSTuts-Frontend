import { useEffect, useRef } from "react";
import MessageItem from "./MessageItem";
import { Message } from "../../types";

const AllMessages = ({ messages }: { messages: Message[] }) => {
  let alt = true;
  let changedSender = false;
  let previousSender: string | null = null;
  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    divRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={`h-[87.5%] max-h-[87.5%] space-y-1 overflow-y-scroll`}>
      {messages.map((message: any, index) => {
        if (message.sender != previousSender) {
          alt = !alt;
          changedSender = true;
        } else {
          changedSender = false;
        }
        previousSender = message.sender;

        return (
          <div key={index} ref={divRef}>
            <MessageItem message={message} alt={alt} changed={changedSender} />
          </div>
        );
      })}
    </div>
  );
};

export default AllMessages;
