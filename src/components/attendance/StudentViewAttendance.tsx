import { useEffect, useState } from "react";
import { StudentAttendance, TutorialContextType } from "../../types";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner";

const StudentViewAttendance = () => {
  const { tutorialId } = useOutletContext<TutorialContextType>();
  const { state } = useAuthContext();
  const [attendanceHistory, setAttendanceHistory] = useState<
    StudentAttendance[]
  >([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    // Fetch the attendance history from the server
    const fetchAttendanceHistory = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/attendance/student/${tutorialId}/attendance/${state.user.id}`,
          {
            headers: {
              Authorization: `Bearer ${state.user.tokens.accessToken}`,
            },
          }
        );
        setAttendanceHistory(response.data.data.attendance);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching attendance history:", error);
        setErrorMessage(
          "Failed to load attendance history. Please try again later."
        );
      }
    };

    fetchAttendanceHistory();
  }, []);

  return isLoading ? (
    <LoadingSpinner />
  ) : attendanceHistory.length > 0 ? (
    <div className="w-full p-6 text-center">
      {errorMessage ? (
        <div className="text-red-500">{errorMessage}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b-2 border-gray-300 text-sm leading-4">
                  Date
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-300 text-sm leading-4">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {attendanceHistory.map((record) => (
                <tr key={record.ID}>
                  <td className="py-2 px-4 border-b border-gray-300">
                    {record.date}
                  </td>
                  <td
                    className={`py-2 px-4 border-b border-gray-300 ${
                      record.present ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {record.present ? "Present" : "Absent"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  ) : (
    <div className="w-full p-6 text-center border border-gray-300 rounded-lg bg-white shadow-md">
      <p className="text-lg text-gray-600">No attendance history found</p>
    </div>
  );
};

export default StudentViewAttendance;
