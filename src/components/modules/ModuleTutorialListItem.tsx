import { Card, Tooltip } from "@nextui-org/react";
import { BsPersonAdd } from "react-icons/bs";
import { strToColour } from "../../util/util";
import { FetchedTutorial } from "../../types";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useState } from "react";
import { toast } from "react-toastify";

const ModuleTutorialListItem = ({
  tutorial,
  moduleCode,
  show,
}: {
  tutorial: FetchedTutorial;
  moduleCode: string;
  show: boolean;
}) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { state } = useAuthContext();

  // A student can only request to join a specific tutorial once
  const [display, setDisplay] = useState<boolean>(show);

  // Sends a request indicating that the student wants to join this tutorial
  const requestToJoinTutorialHandler = async () => {
    try {
      setDisplay(false);
      const res = await axios.post(
        `${BASE_URL}/api/requests`,
        {
          studentId: state.user.id,
          moduleCode,
          classNo: tutorial.classNo,
        },
        {
          headers: { Authorization: `Bearer ${state.user.tokens.accessToken}` },
        }
      );
      console.log(res.data);
      toast.success("Request sent successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Request could not be sent!");
    }
  };

  return (
    <Card className="py-4 h-fit flex flex-row justify-between items-center p-5 w-[90%] sm:w-4/5 lg:w-2/3 xl:w-[45%] text-xs sm:text-base">
      <div
        className="text-xs text-white rounded-md p-2 w-16 sm:w-24 sm:text-base text-center"
        style={{ backgroundColor: strToColour(moduleCode.slice(0, 2)) }}
      >
        {moduleCode}
      </div>
      <div className="w-1/4">
        <p>Tutorial No: {tutorial.classNo}</p>
        <p>Venue: {tutorial.venue}</p>
      </div>
      <div className="w-1/4">
        <p>Day: {tutorial.day}</p>
        <p>
          Time: {tutorial.startTime} - {tutorial.endTime}
        </p>
      </div>
      <div className="w-8 h-8">
        {display && (
          <Tooltip showArrow={true} content="Request to join tutorial">
            <div className="rounded-full p-1 cursor-pointer hover:bg-amber-600 hover:bg-opacity-15 duration-400 text-amber-600">
              <BsPersonAdd size={22} onClick={requestToJoinTutorialHandler} />
            </div>
          </Tooltip>
        )}
      </div>
    </Card>
  );
};

export default ModuleTutorialListItem;
