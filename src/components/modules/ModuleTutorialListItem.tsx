import { Card } from "@nextui-org/react";
import { BsPersonAdd } from "react-icons/bs";
import { strToColour } from "../../util/util";
import { FetchedTutorial } from "../../types";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useState } from "react";

const ModuleTutorialListItem = ({
  tutorial,
  moduleCode,
}: {
  tutorial: FetchedTutorial;
  moduleCode: string;
}) => {
  const { state } = useAuthContext();
  const [show, setShow] = useState<boolean>(true);
  const requestToJoinTutorialHandler = async () => {
    try {
      setShow(false);
      const res = await axios.post(
        "/api/requests",
        {
          studentId: state.user.id,
          moduleCode,
          classNo: tutorial.classNo,
        },
        { headers: { Authorization: "Bearer token" } }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
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
      <div
        className="rounded-full p-1 cursor-pointer hover:bg-amber-600 hover:bg-opacity-15 duration-400 text-amber-600"
        title="Request to join tutorial"
      >
        {show && (
          <BsPersonAdd size={22} onClick={requestToJoinTutorialHandler} />
        )}
      </div>
    </Card>
  );
};

export default ModuleTutorialListItem;
