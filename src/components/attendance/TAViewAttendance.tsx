import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useOutletContext } from "react-router-dom";
import { AttendanceListsView, TutorialContextType } from "../../types";
import LoadingSpinner from "../../components/LoadingSpinner";
import axios from "axios";
import AttendanceDisplay from "../../components/attendance/AttendanceDisplay";

const TAViewAttendance = () => {
  const { state } = useAuthContext();
  const { tutorialId } = useOutletContext<TutorialContextType>();
  // State to store the attendance list of students for the tutorial, grouped by date,
  // sorted from most recent to oldest
  const [attendanceList, setAttendanceList] = useState<AttendanceListsView[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  // Fetch the attendance list of students for the tutorial
  useEffect(() => {
    const fetchAttendanceList = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/attendance/${tutorialId}/list/all`,
          {
            headers: {
              Authorization: `Bearer ${state.user.tokens.accessToken}`,
            },
          }
        );
        setAttendanceList(response.data.data.attendanceLists);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAttendanceList();
  }, []);

  return isLoading ? (
    <LoadingSpinner />
  ) : attendanceList.length > 0 ? (
    <div className="p-14 pt-6 h-screen w-full overflow-y-auto">
      {attendanceList.map((attendanceGroup) => (
        <div key={attendanceGroup.date} className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">
            {attendanceGroup.date}
          </h2>
          <AttendanceDisplay attendances={attendanceGroup.attendance} />
        </div>
      ))}
    </div>
  ) : (
    <div className="p-14 pt-6 h-screen w-full flex items-center justify-center">
      <p className="text-xl font-semibold">No attendance found</p>
    </div>
  );
};

export default TAViewAttendance;
