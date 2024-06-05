import { Button, Card } from "@nextui-org/react";
import { RxCross2 } from "react-icons/rx";
import { IoCheckmark } from "react-icons/io5";
import { strToColour } from "../../util/util";
import { Avatar } from "@nextui-org/react";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";

const RequestListItem = ({
  name,
  email,
  id,
  removeRequestFromListHandler,
}: {
  name: string;
  email: string;
  id: number;
  removeRequestFromListHandler: (id: number) => void;
}) => {
  const { state } = useAuthContext();
  const acceptRequestHandler = async () => {
    try {
      const res = await axios.patch(`/api/requests/${id}/accept`, null, {
        headers: { Authorization: `Bearer ${state.user.tokens.accessToken}` },
      });
      console.log(res.data);
      removeRequestFromListHandler(id);
    } catch (error) {
      console.log(error);
    }
  };

  const rejectRequestHandler = async () => {
    try {
      const res = await axios.patch(`/api/requests/${id}/reject`, null, {
        headers: { Authorization: `Bearer ${state.user.tokens.accessToken}` },
      });
      console.log(res.data);
      removeRequestFromListHandler(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="py-4 h-fit flex flex-row justify-between items-center p-5 w-[90%] sm:w-4/5 lg:w-2/3 xl:w-[45%] text-xs lg:text-base">
      <Avatar
        className="text-xl text-white"
        style={{ backgroundColor: strToColour(name) }}
        name={`${name[0].toUpperCase()}`}
      />
      <div className="flex flex-col items-center">
        <div className="text-left">
          <p>Name: {name}</p>
          <p>Email: {email}</p>
        </div>
      </div>
      <p className="hidden sm:block">has requested to join</p>
      <div className="space-x-2 sm:space-x-4 flex items-center">
        <Button
          color="danger"
          title="Reject Request"
          className="text-white"
          size="sm"
          onClick={rejectRequestHandler}
        >
          <RxCross2 className="text-base md:text-lg lg:text-xl" />
        </Button>
        <Button
          color="success"
          title="Accept Request"
          className="text-white"
          size="sm"
          onClick={acceptRequestHandler}
        >
          <IoCheckmark size={22} />
        </Button>
      </div>
    </Card>
  );
};

export default RequestListItem;
