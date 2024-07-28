import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { TutorialContextType } from "../../types";
import { useAuthContext } from "../../hooks/useAuthContext";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner";
import { toast } from "react-toastify";

const StudentTodayAttendance = () => {
  const { tutorialId } = useOutletContext<TutorialContextType>();
  const { state } = useAuthContext();
  const [isAttended, setIsAttended] = useState<boolean>(false);
  const [attendanceCode, setAttendanceCode] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  // Message to display when attendance is not opened yet
  const [unopenedMessage, setUnopenedMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    // Fetch the current attendance status of student from the server
    const fetchAttendanceStatus = async () => {
      try {
        setUnopenedMessage("");
        const res = await axios.get(
          `${BASE_URL}/api/attendance/student/${tutorialId}/attended/${state.user.id}`,
          {
            headers: {
              Authorization: `Bearer ${state.user.tokens.accessToken}`,
            },
          }
        );
        console.log(res.data);
        const attended = await res.data.data;
        setIsAttended(attended);
      } catch (error) {
        // If the attendance is not opened by TA yet, display a message
        setUnopenedMessage(
          "Teaching Assistant has not opened attendance marking yet"
        );
        console.log(error);
      }
      setIsLoading(false);
    };

    fetchAttendanceStatus();
  }, []);

  const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    setAttendanceCode(event.currentTarget.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validate and submit the attendance code
    try {
      const res = await axios.post(
        `${BASE_URL}/api/attendance/student/${tutorialId}/mark`,
        {
          studentId: state.user.id,
          attendanceCode: attendanceCode,
        },
        {
          headers: { Authorization: `Bearer ${state.user.tokens.accessToken}` },
        }
      );

      // If the attendance code is correct and not expired, set the attendance status to true
      if (res.status == 200 && res.data.message === "Your attendance has been marked successfully!") {
        setIsAttended(true);
        setErrorMessage("");
        toast.success("Your attendance has been marked!");
      } else {
        // If the attendance code is incorrect or expired, display an error message
        setErrorMessage("Attendance code has expired or is incorrect.");
        toast.error("Failed to mark your attendance!");
      }
    } catch (error) {
      // If an error occurs while submitting the attendance code, display an error message
      console.log("Error submitting attendance code:", error);
      setErrorMessage(
        "An error occurred, you might have submitted the wrong code. Please try again."
      );
      toast.error("Failed to mark your attendance!");
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full p-6 text-center flex flex-col justify-center">
      <div className="my-4 text-lg ">
        {unopenedMessage
          ? "Teaching assistant has not opened attendance marking yet!"
          : isAttended
          ? "Your attendance has been marked."
          : "Your attendance has not been marked yet."}
      </div>
      {!isAttended && (
        <div className="flex flex-col items-center pb-14">
          <input
            type="text"
            value={attendanceCode}
            onChange={handleInputChange}
            placeholder="Enter attendance code"
            className="p-2 mb-4 border border-black rounded w-full max-w-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSubmit}
            disabled={!attendanceCode}
            className={`px-4 py-2 font-semibold text-white rounded ${
              attendanceCode
                ? "bg-green-500 hover:bg-green-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Submit
          </button>
          {errorMessage && (
            <div className="mt-4 text-red-500">{errorMessage}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentTodayAttendance;
