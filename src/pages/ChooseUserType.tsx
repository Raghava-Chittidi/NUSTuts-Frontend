import { AcademicCapIcon, UserGroupIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

const ChooseUserType = () => {
  const { state, isLoggedIn, isLoggingIn } = useAuthContext();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const user = state.user;

  useEffect(() => {
    if (user) {
      navigate("/");
    } else if (!isLoggingIn && !isLoggedIn) {
      setIsLoading(false);
    }
  }, [user, isLoggingIn]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-gradient-to-b from-[#411d70] to-[#19118b] h-screen flex flex-col items-center p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 w-full max-w-6xl">
        <div
          onClick={() => navigate("/student/login")}
          className="p-5 text-center bg-[#1f1f38] text-gray-400 cursor-pointer hover:bg-[#2c2c6c] hover:text-white rounded-lg shadow-lg transition-colors"
        >
          <div className="mb-4 flex justify-center">
            <AcademicCapIcon className="h-10 w-10 text-white" />
          </div>
          <h2 className="mb-2 text-lg text-white">Student</h2>
          <p className="text-gray-400">
            Login as a student to explore module tutorials and access your
            tutorials' materials.
          </p>
        </div>
        <div
          onClick={() => navigate("/ta/login")}
          className="p-5 text-center bg-[#1f1f38] text-gray-400 cursor-pointer hover:bg-[#2c2c6c] hover:text-white rounded-lg shadow-lg transition-colors"
        >
          <div className="mb-4 flex justify-center">
            <UserGroupIcon className="h-10 w-10 text-white" />
          </div>
          <h2 className="mb-2 text-lg text-white">Teaching Assistant</h2>
          <p className="text-gray-400">
            Login as a teaching assistant to manage tutorials.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChooseUserType;
