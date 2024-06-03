import { getCurrentAY, getCurrentSem } from "../../util/util";
import { useParams } from "react-router-dom";
import { Spinner } from "@nextui-org/react";
import useSWR from "swr";
import axios from "axios";
import ModuleTutorialListItem from "../../components/modules/ModuleTutorialListItem";
import { FetchedTutorial } from "../../types";
import PrivateRoute from "../../components/PrivateRoute";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEffect, useState } from "react";

const ModuleTutorialsPage = () => {
  const { state } = useAuthContext();
  const { moduleCode } = useParams();
  const [classNo, setClassNo] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Reference: We are using nusmods API
  const {
    error,
    data,
    isLoading: loading,
  } = useSWR(
    `https://api.nusmods.com/v2/${getCurrentAY()}/modules/${moduleCode}.json`,
    (url: string) => axios.get(url).then((res) => res.data)
  );

  useEffect(() => {
    const sendRequest = async () => {
      const res = await axios.get(
        `/api/requests/${state?.user.id}/${moduleCode}`
      );
      setClassNo(res.data.data);
      setIsLoading(false);
    };

    if (state.user) {
      sendRequest();
    }
  }, [state.user, state.user?.tutorial]);

  if (loading || !data || isLoading) {
    return <Spinner />;
  }

  const curSem =
    data?.semesterData.find((sem: any) => sem.semester === getCurrentSem()) ||
    [];

  return (
    <PrivateRoute userType="student">
      <div className="w-full text-center space-y-5 py-5">
        <h1 className="font-bold text-xl">
          Showing all tutorials for {moduleCode}:
        </h1>
        <div className="flex flex-col w-full items-center space-y-5 mt-5">
          {curSem.timetable
            .filter(
              (tutorial: FetchedTutorial) => tutorial.lessonType === "Tutorial"
            )
            .map((tutorial: FetchedTutorial, index: number) => (
              <ModuleTutorialListItem
                key={index}
                tutorial={tutorial}
                moduleCode={moduleCode!}
                show={!classNo.includes(tutorial.classNo)}
              />
            ))}
        </div>
      </div>
    </PrivateRoute>
  );
};

export default ModuleTutorialsPage;
