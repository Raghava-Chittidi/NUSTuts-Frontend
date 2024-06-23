import { Button } from "@nextui-org/react";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useState } from "react";
import Countdown from "../../components/attendance/Countdown";
import { AttendanceString } from "../../types";

const AttendancePage = () => {
  const { state } = useAuthContext();
  const [attendanceString, setAttendanceString] = useState<AttendanceString>();

  const generateHandler = async () => {
    try {
      const res = await axios.get(
        `/api/attendance/${state.user.tutorial?.ID}`,
        {
          headers: { Authorization: `Bearer ${state.user.tokens.accessToken}` },
        }
      );
      console.log("attendance code", res.data.data.attendanceString);
      setAttendanceString(res.data.data.attendanceString);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex w-full items-center justify-center">
      {attendanceString ? (
        <div className="flex flex-col items-center justify-center w-full space-y-5">
          <Countdown />
          <div className="text-[6rem]">{attendanceString.code}</div>
        </div>
      ) : (
        <Button
          size="lg"
          className="text-3xl px-10 py-8"
          onClick={generateHandler}
          variant="ghost"
          color="primary"
        >
          Generate attendance code
        </Button>
      )}
    </div>
  );
};

export default AttendancePage;
