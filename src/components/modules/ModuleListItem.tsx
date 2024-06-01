import { Card } from "@nextui-org/react";
import { CiViewList } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa6";
import { strToColour } from "../../util/util";
import { useNavigate } from "react-router-dom";
import { Module } from "../../types";

export default function ModuleListItem({ module }: { module: Module }) {
  const navigate = useNavigate();
  return (
    <Card className="py-4 h-fit flex flex-row items-center p-5 space-x-4 w-[90%] sm:w-4/5 md:w-2/3 xl:w-1/2">
      <div
        className="text-base text-white rounded-md p-2 w-24"
        style={{ backgroundColor: strToColour(module.code.slice(0, 2)) }}
      >
        {module.code}
      </div>
      <div className="flex justify-between items-center w-full">
        <p className="text-base sm:text-lg lg:text-xl uppercase font-bold text-left">
          {module.name}
        </p>
        <div className="flex space-x-3 items-center">
          <div
            className="cursor-pointer hover:bg-amber-600 hover:bg-opacity-15 duration-400 rounded-full p-1 text-amber-600"
            title="View all tutorials"
          >
            <CiViewList
              size={24}
              onClick={() => navigate(`/modules/${module.code}/tutorials`)}
            />
          </div>
          <div
            className="cursor-pointer hover:bg-amber-600 hover:bg-opacity-15 duration-400 rounded-full p-1 text-amber-600"
            title="View current tutorial"
          >
            <FaArrowRight size={24} />
          </div>
        </div>
      </div>
    </Card>
  );
}
