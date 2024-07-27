import { Link } from "@nextui-org/react";
import { FaFolder } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

const FilesPage = () => {
  // Tutorial weeks
  const weeks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  const params = useParams();
  const navigate = useNavigate();

  // Render the list of files for each week
  return (
    <div className="w-full pl-10 p-5 space-y-5 overflow-y-scroll">
      {weeks.map((week, index) => (
        <div key={index}>
          <div className="flex items-center space-x-4 pl-2 my-2">
            <FaFolder size={23} className="text-gray-400" />
            <Link
              onPress={() =>
                navigate(`/tutorial/${params.tutorialId}/files/weeks/${week}`)
              }
              className="cursor-pointer hover:underline"
            >
              Week {week}
            </Link>
          </div>
          <hr className="w-full border-gray-300" />
        </div>
      ))}
    </div>
  );
};

export default FilesPage;
