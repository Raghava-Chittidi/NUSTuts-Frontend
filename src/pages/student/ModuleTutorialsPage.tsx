import { getCurrentAY, getCurrentSem } from "../../util/util";
import { useParams } from "react-router-dom";
import { Spinner } from "@nextui-org/react";
import useSWR from "swr";
import axios from "axios";
import ModuleTutorialListItem from "../../components/modules/ModuleTutorialListItem";
import { FetchedTutorial } from "../../types";

const ModuleTutorialsPage = () => {
  const { moduleCode } = useParams();
  // Reference: We are using nusmods API
  const { error, data, isLoading } = useSWR(
    `https://api.nusmods.com/v2/${getCurrentAY()}/modules/${moduleCode}.json`,
    (url: string) => axios.get(url).then((res) => res.data)
  );

  if (isLoading || !data) {
    return <Spinner />;
  }

  return (
    <div className="w-full text-center space-y-5 py-5">
      <h1 className="font-bold text-xl">
        Showing all tutorials for {moduleCode}:
      </h1>
      <div className="flex flex-col w-full items-center space-y-5 mt-5">
        {data?.semesterData[getCurrentSem() - 1]?.timetable
          .filter(
            (tutorial: FetchedTutorial) => tutorial.lessonType === "Tutorial"
          )
          .map((tutorial: FetchedTutorial, index: number) => (
            <ModuleTutorialListItem
              key={index}
              tutorial={tutorial}
              moduleCode={moduleCode!}
            />
          ))}
      </div>
    </div>
  );
};

export default ModuleTutorialsPage;
