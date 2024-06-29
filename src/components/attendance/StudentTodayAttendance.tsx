import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { TutorialContextType } from "../../types";
import { useAuthContext } from "../../hooks/useAuthContext";
import axios from "axios";

const StudentTodayAttendance = () => {
  const { tutorialId } = useOutletContext<TutorialContextType>();
  const { state } = useAuthContext();
  const [isAttended, setIsAttended] = useState(false);
  const [attendanceCode, setAttendanceCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    // Fetch the current attendance status from the server
    const fetchAttendanceStatus = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/attendance/student/${tutorialId}/attended/${state.user.id}`,
          {
            headers: { Authorization: `Bearer ${state.user.tokens.accessToken}` },
          }
        );
        console.log(res.data);
        const attended = await res.data.data;
        setIsAttended(attended);
      } catch (error) {
        console.error('Error fetching attendance status:', error);
      }
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
      const response = await axios.post(`${BASE_URL}/api/attendance/student/${tutorialId}/mark`, {
          studentId: state.user.id,
          attendanceCode: attendanceCode,
        },
        {
          headers: { Authorization: `Bearer ${state.user.tokens.accessToken}` },
        }
      )

      setIsAttended(true);
      setErrorMessage('');
    } catch (error) {
      console.error('Error submitting attendance code:', error);
      setErrorMessage('An error occurred, you might have submitted the wrong code. Please try again.');
    }
  };

  return (
    <div className="w-full p-6 text-center border border-gray-300 rounded-lg bg-white shadow-md">
      <div className="my-4 text-lg text-gray-600">
        {isAttended ? 'You are marked as attended.' : 'You are not marked as attended.'}
      </div>
      {!isAttended && (
        <div className="flex flex-col items-center">
          <input
            type="text"
            value={attendanceCode}
            onChange={handleInputChange}
            placeholder="Enter attendance code"
            className="p-2 mb-4 border border-gray-300 rounded w-full max-w-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSubmit}
            disabled={!attendanceCode}
            className={`px-4 py-2 font-semibold text-white rounded ${attendanceCode ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed'}`}
          >
            Submit
          </button>
          {errorMessage && <div className="mt-4 text-red-500">{errorMessage}</div>}
        </div>
      )}
    </div>
  );
}

export default StudentTodayAttendance;