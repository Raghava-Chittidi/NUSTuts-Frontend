import { useNavigate, useParams } from "react-router-dom";
import { IoDocumentText } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import FileUpload from "./FileUpload";
import { useAuthContext } from "../../hooks/useAuthContext";
import LoadingSpinner from "../../components/LoadingSpinner";

const WeekFilesPage = () => {
  const FILES = [1, 2, 3, 4, 5];
  const params = useParams();
  const navigate = useNavigate();
  const { isLoggingIn, isLoggedIn, state } = useAuthContext();
  const [show, setShow] = useState<boolean[]>([true, true, true, true, true]);
  console.log(params.id);

  console.log(isLoggingIn, isLoggedIn);

  useEffect(() => {
    if (!isLoggingIn && !isLoggedIn) {
      navigate("/");
    }
  }, [isLoggingIn]);

  if (isLoggingIn || !isLoggedIn) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full md:pl-10 p-2 md:p-5 space-y-5">
      <div className="flex justify-between items-center font-bold text-blue-950">
        <span className="pl-2">Filename</span>
        <div className="flex items-center space-x-8 md:space-x-10">
          <span>Uploaded on</span>
          {!isLoggingIn && state.user.role.userType === "teachingAssistant" && (
            <span className="pr-2">Actions</span>
          )}
        </div>
      </div>
      {FILES.map((file, index) => (
        <div key={index}>
          <div className="flex justify-between items-center">
            <div className="flex items-center sm:space-x-4 pl-2 my-2">
              <IoDocumentText
                size={23}
                className="text-gray-500 hidden sm:block"
              />
              <Link
                onClick={() => {}}
                className="cursor-pointer hover:underline text-xs md:text-sm lg:text-base"
              >
                Tutorial_1_Homework.pdf
              </Link>
            </div>
            <div className="flex items-center space-x-10 text-xs md:text-sm lg:text-base">
              <span>May 20 2024</span>
              {!isLoggingIn &&
                state.user.role.userType === "teachingAssistant" && (
                  <div className="flex space-x-0 sm:space-x-1 items-center">
                    <div className="w-8 h-8 flex items-center">
                      <Modal
                        title="Warning!"
                        body="This action is irreversible! Are you sure you want to delete this file?"
                        component={
                          <FaTrash
                            title="Delete file"
                            className="rounded-lg p-1 cursor-pointer hover:bg-red-600 hover:bg-opacity-15 duration-400 text-red-600 text-xl sm:text-2xl"
                          />
                        }
                      />
                    </div>
                    <div className="w-8 h-8 flex items-center">
                      {!show[index] ? (
                        <FaEyeSlash
                          title="Unprivate file"
                          className="rounded-lg p-1 cursor-pointer hover:bg-green-600 hover:bg-opacity-15 duration-400 text-green-600 text-xl sm:text-2xl"
                          onClick={() =>
                            setShow((prevState) => {
                              const newState = [...prevState];
                              prevState[index] = true;
                              return newState;
                            })
                          }
                        />
                      ) : (
                        <FaEye
                          title="Private file"
                          className="rounded-lg p-1 cursor-pointer hover:bg-green-600 hover:bg-opacity-15 duration-400 text-green-600 text-xl sm:text-2xl"
                          onClick={() =>
                            setShow((prevState) => {
                              const newState = [...prevState];
                              prevState[index] = false;
                              return newState;
                            })
                          }
                        />
                      )}
                    </div>
                  </div>
                )}
            </div>
          </div>
          <hr className="w-full border-gray-300" />
        </div>
      ))}
      {!isLoggingIn && state.user.role.userType === "teachingAssistant" && (
        <div>
          <FileUpload />
        </div>
      )}
    </div>
  );
};

export default WeekFilesPage;
