import { useState } from "react";
import AllMessages from "../../components/discussion/AllMessages";
import SendMessage from "../../components/discussion/SendMessage";
import { useAuthContext } from "../../hooks/useAuthContext";
import LoadingSpinner from "../../components/LoadingSpinner";

const MESSAGES = [
  {
    sender: "Raghava",
    message:
      "Aenean vitae condimentum libero, sit amet luctus enim. Proin condimentum eleifend sollicitudi Nulla et magna ligula.",
  },
  {
    sender: "Tommy",
    message:
      "Proin porttitor, sapien id dignissim varius, lorem nisl auctor nulla, at aliquam massa ante sit amet enim. Duis porta ante et efficitur congue",
  },
  {
    sender: "Raghava",
    message:
      "Nulla et magna liguurabitur commodo nec tellus a porta. Donec dignissim pulvinar risus eu consectetur. Etiam sit amet libero tristique libero auctor ultrices sit amet at urna.",
  },
  {
    sender: "Jimmy",
    message:
      "Proin porttitor, sapien id dignissim varius, loreamet enim. Duis porta ante et efficitur congue",
  },
  {
    sender: "Jimmy",
    message: "Proin porttitor, sapien id dignissim varius, lorem nisl",
  },
  {
    sender: "Raghava",
    message:
      "Aenean vitae condimentum libero, sit amet luctus enim. Proin condimentum eleifend sollicitudi Nulla et magna ligula.",
  },
  {
    sender: "Tommy",
    message:
      "Proin porttitor, sapien id dignissim varius, lorem nisl auctor nulla, at aliquam massa ante sit amet enim. Duis porta ante et efficitur congue",
  },
  {
    sender: "Raghava",
    message:
      "Nulla et magna liguurabitur commodo nec tellus a porta. Donec dignissim pulvinar risus eu consectetur. Etiam sit amet libero tristique libero auctor ultrices sit amet at urna.",
  },
  {
    sender: "Jimmy",
    message:
      "Proin porttitor, sapien id dignissim varius, loreamet enim. Duis porta ante et efficitur congue",
  },
  {
    sender: "Jimmy",
    message: "Proin porttitor, sapien id dignissim varius, lorem nisl",
  },
  {
    sender: "Raghava",
    message:
      "Aenean vitae condimentum libero, sit amet luctus enim. Proin condimentum eleifend sollicitudi Nulla et magna ligula.",
  },
  {
    sender: "Tommy",
    message:
      "Proin porttitor, sapien id dignissim varius, lorem nisl auctor nulla, at aliquam massa ante sit amet enim. Duis porta ante et efficitur congue",
  },
  {
    sender: "Raghava",
    message:
      "Nulla et magna liguurabitur commodo nec tellus a porta. Donec dignissim pulvinar risus eu consectetur. Etiam sit amet libero tristique libero auctor ultrices sit amet at urna.",
  },
  {
    sender: "Jimmy",
    message:
      "Proin porttitor, sapien id dignissim varius, loreamet enim. Duis porta ante et efficitur congue",
  },
  {
    sender: "Jimmy",
    message: "Proin porttitor, sapien id dignissim varius, lorem nisl",
  },
];

const DiscussionPage = () => {
  const [messages, setMessages] = useState<any[]>(MESSAGES);
  const { isLoggingIn } = useAuthContext();

  if (isLoggingIn) {
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
