import { Card, CardBody, Spinner } from "@nextui-org/react";
import { UserCircleIcon, AcademicCapIcon, UserGroupIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

const ChooseUserType = () => {
    const navigate = useNavigate();


  return (
    <div className="bg-gradient-to-b from-[#411d70] to-[#19118b] h-screen flex flex-col items-center p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
        <div
          onClick={() => navigate("/studentLogin")}
          className="p-5 text-center bg-[#1f1f38] text-gray-400 cursor-pointer hover:bg-[#2c2c6c] hover:text-white rounded-lg shadow-lg transition-colors"
        >
          <div className="mb-4 flex justify-center">
            <AcademicCapIcon className="h-10 w-10 text-white" />
          </div>
          <h2 className="mb-2 text-lg text-white">Student</h2>
          <p className="text-gray-400">
            Login as a student to explore module tutorials and access your tutorials' materials.
          </p>
        </div>
        <div
          onClick={() => navigate("/taLogin")}
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
