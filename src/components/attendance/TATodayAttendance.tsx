import { Button } from "@nextui-org/react";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEffect, useState } from "react";
import Countdown from "../../components/attendance/Countdown";
import { Attendance, AttendanceString } from "../../types";
import AttendanceDisplay from "../../components/attendance/AttendanceDisplay";
import LoadingSpinner from "../../components/LoadingSpinner";

const TATodayAttendance = () => {
  const { state } = useAuthContext();
  const [isTimerUp, setIsTimerUp] = useState<boolean>(false);
  const [attendanceString, setAttendanceString] = useState<AttendanceString>();
  const [attendanceList, setAttendanceList] = useState<Attendance[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const getTodayAttendanceList = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/attendance/${state.user.tutorial?.ID}/list`,
        {
          headers: { Authorization: `Bearer ${state.user.tokens.accessToken}` },
        }
      );
      console.log(res.data);
      return res.data.data.attendances;
    } catch (error) {
      console.log(error);
      return [];
    }
  };
  const getExistingAttendanceString =
    async (): Promise<AttendanceString | null> => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/attendance/${state.user.tutorial?.ID}`,
          {
            headers: {
              Authorization: `Bearer ${state.user.tokens.accessToken}`,
            },
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
    };

  const generateHandler = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/attendance/${state.user.tutorial?.ID}/generate`,
        {
          headers: { Authorization: `Bearer ${state.user.tokens.accessToken}` },
        }
      );
      const attendanceString = res.data.data.attendanceString;
      console.log("attendance code generated", attendanceString);
      setAttendanceString(res.data.data.attendanceString);
      setIsTimerUp(true);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAttendanceStringOrAttendance = async () => {
    try {
      const attendanceString = await getExistingAttendanceString();
      if (attendanceString) {
        setAttendanceString(attendanceString);
        setIsTimerUp(true);
      } else {
        try {
          const attendanceList = await getTodayAttendanceList();
          setAttendanceList(attendanceList);
          setIsTimerUp(false);
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAttendanceStringOrAttendance();
    setIsLoading(false);
  }, [isTimerUp]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex w-full items-center justify-center min-h-screen pb-16">
      {isTimerUp && attendanceString ? (
        <div className="flex flex-col items-center justify-center w-full space-y-5">
          <Countdown
            expiredTime={attendanceString.expiresAt}
            handleTimerUp={() => setIsTimerUp(false)}
          />
          <div className="text-[3rem]">{attendanceString.code}</div>
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

export default TATodayAttendance;
