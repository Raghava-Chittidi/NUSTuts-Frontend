import { useParams } from "react-router-dom";
import { IoDocumentText } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "@nextui-org/react";
import { useState } from "react";

const WeekFilesPage = () => {
  const FILES = [1, 2, 3, 4, 5];
  const params = useParams();
  const [show, setShow] = useState<boolean>(true);
  console.log(params.id);

  return (
    <div className="w-full pl-10 p-5 space-y-5">
      <div className="flex justify-between items-center font-bold text-blue-950">
        <span className="pl-2">Filename</span>
        <div className="flex items-center space-x-12">
          <span>Uploaded on</span>
          <span className="pr-2">Actions</span>
        </div>
      </div>
      {FILES.map((file, index) => (
        <div key={index}>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4 pl-2 my-2">
              <IoDocumentText size={23} className="text-gray-500" />
              <Link
                onClick={() => {}}
                className="cursor-pointer hover:underline text-xs md:text-sm lg:text-base"
              >
                Tutorial_1_Homework.pdf
              </Link>
            </div>
            <div className="flex items-center space-x-10 text-xs md:text-sm lg:text-base">
              <div className="flex">
                <span>May 20 2024</span>
              </div>
              <div className="flex space-x-2">
                <div className="w-8 h-8">
                  <FaTrash
                    className="rounded-lg p-1 cursor-pointer hover:bg-red-600 hover:bg-opacity-15 duration-400 text-red-600"
                    size={25}
                  />
                </div>
                <div className="w-8 h-8">
                  {show ? (
                    <FaEyeSlash
                      className="rounded-lg p-1 cursor-pointer hover:bg-green-600 hover:bg-opacity-15 duration-400 text-green-600"
                      size={28}
                      onClick={() => setShow(false)}
                    />
                  ) : (
                    <FaEye
                      className="rounded-lg p-1 cursor-pointer hover:bg-green-600 hover:bg-opacity-15 duration-400 text-green-600"
                      size={28}
                      onClick={() => setShow(true)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <hr className="w-full border-gray-300" />
        </div>
      ))}
    </div>
  );
};

export default WeekFilesPage;
