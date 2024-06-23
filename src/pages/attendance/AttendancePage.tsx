import { Button } from "@nextui-org/react";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEffect, useState } from "react";
import Countdown from "../../components/attendance/Countdown";
import { AttendanceString } from "../../types";
import { getRemainingSeconds } from "../../util/util";

const AttendancePage = () => {
  const { state } = useAuthContext();
  const [attendanceString, setAttendanceString] = useState<AttendanceString>();

  const getExistingAttendanceString = async () => {
    try {
      const res = await axios.get(
        `/api/attendance/${state.user.tutorial?.ID}`,
        {
          headers: { Authorization: `Bearer ${state.user.tokens.accessToken}` },
        }
      );
      const attendanceStringData = res.data.data;
      console.log(res.data);
      // Set attendance string if not expired, otherwise call generateHandler
      if (attendanceStringData) {
        console.log("attendance code not expired", attendanceStringData.attendanceString);
        setAttendanceString(attendanceStringData.attendanceString);
      } 
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  const generateHandler = async () => {
    try {
      const res = await axios.get(
        `/api/attendance/${state.user.tutorial?.ID}/generate`,
        {
          headers: { Authorization: `Bearer ${state.user.tokens.accessToken}` },
        }
      );
      const attendanceString = res.data.data.attendanceString;
      console.log("attendance code generated", attendanceString);
      setAttendanceString(res.data.data.attendanceString);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchAttendanceString = async () => {
      await getExistingAttendanceString();
    };
    fetchAttendanceString();
  }, []);
  
  return (
    <div className="flex w-full items-center justify-center">
      {attendanceString ? (
        <div className="flex flex-col items-center justify-center w-full space-y-5">
          <Countdown expiredTime={attendanceString.expiresAt} />
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
