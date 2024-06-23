import { Button } from "@nextui-org/react";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEffect, useState } from "react";
import Countdown from "../../components/attendance/Countdown";
import { Attendance, AttendanceString } from "../../types";
import { getRemainingSeconds } from "../../util/util";
import AttendanceDisplay from "../../components/attendance/AttendanceDisplay";

const AttendancePage = () => {
  const { state } = useAuthContext();
  const [attendanceString, setAttendanceString] = useState<AttendanceString>();
  const [attendanceList, setAttendanceList] = useState<Attendance[]>([]);

  const getTodayAttendanceList = async () => {
    try {
      const res = await axios.get(
        `/api/attendance/${state.user.tutorial?.ID}/list`,
        {
          headers: { Authorization: `Bearer ${state.user.tokens.accessToken}` },
        }
      );
      console.log(res.data);
      return res.data.data.attendances;
    } catch (error) {
      console.log(error);
      return []
    }
  }
  const getExistingAttendanceString = async (): Promise<AttendanceString | null> => {
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
        return attendanceStringData.attendanceString;
      } 
      return null;
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
    const fetchAttendanceStringOrAttendance = async () => {
      try {
        const attendanceString = await getExistingAttendanceString();
        if (attendanceString) {
          setAttendanceString(attendanceString);
        } else {
          try {
            const attendanceList = await getTodayAttendanceList();
            setAttendanceList(attendanceList);
          } catch (error) {
            console.log(error);
          }
        } 
      } catch (error) {
        console.log(error);
      }

    };
    fetchAttendanceStringOrAttendance();
  }, []);
  
  return (
    <div className="flex w-full items-center justify-center">
      {attendanceString ? (
        <div className="flex flex-col items-center justify-center w-full space-y-5">
          <Countdown expiredTime={attendanceString.expiresAt} />
          <div className="text-[6rem]">{attendanceString.code}</div>
        </div>
      ) : (
        <div className="flex flex-col items-center w-full space-y-5">
          {attendanceList.length > 0 && (
            <div className="w-full flex flex-col items-center">
              <h1 className="text-2xl font-bold">Session attendance</h1>
              <AttendanceDisplay attendances={attendanceList} />
            </div>
          )}
          <Button
            size="lg"
            className="text-3xl px-10 py-8 mt-5"
            onClick={generateHandler}
            variant="ghost"
            color="primary"
          >
            Generate attendance code
          </Button>
        </div>
      )}
    </div>
  );
};

export default AttendancePage;
