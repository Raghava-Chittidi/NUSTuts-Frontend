import { getCurrentAY, getCurrentSem } from "../../util/util";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import axios from "axios";
import ModuleTutorialListItem from "../../components/modules/ModuleTutorialListItem";
import { FetchedTutorial } from "../../types";
import PrivateRoute from "../../components/PrivateRoute";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";

const ModuleTutorialsPage = () => {
  const { state } = useAuthContext();
  const { moduleCode } = useParams();
  const [classNo, setClassNo] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  // Reference: We are using nusmods API
  const { data, isLoading: loading } = useSWR(
    `https://api.nusmods.com/v2/${getCurrentAY()}/modules/${moduleCode}.json`,
    (url: string) => axios.get(url).then((res) => res.data)
  );

  useEffect(() => {
    const sendRequest = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `${BASE_URL}/api/requests/${state?.user.id}/${moduleCode}`,
          {
            headers: {
              Authorization: `Bearer ${state.user.tokens.accessToken}`,
            },
          }
        );
        console.log(res.data);
        setClassNo(res.data.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };

    sendRequest();
  }, []);

  if (loading || isLoading) {
    return <LoadingSpinner />;
  }

  const curSem =
    data?.semesterData.find((sem: any) => sem.semester === getCurrentSem()) ||
    [];

  const tutorials: FetchedTutorial[] = curSem.timetable.filter(
    (tutorial: FetchedTutorial) => tutorial.lessonType === "Tutorial"
  );

  return (
    <PrivateRoute userType="student">
      <div className="w-full text-center space-y-5 py-5">
        <h1 className="font-bold text-xl">
          Showing all tutorials for {moduleCode}:
        </h1>
        <div className="flex flex-col w-full items-center space-y-5 mt-5">
          {tutorials.length === 0 ? (
            <p>
              This module does not have any tutorials. It may only have
              lectures, recitations or labs.
            </p>
          ) : (
            tutorials.map((tutorial: FetchedTutorial, index: number) => (
              <ModuleTutorialListItem
                key={index}
                tutorial={tutorial}
                moduleCode={moduleCode!}
                show={!classNo.includes(tutorial.classNo)}
              />
            ))
          )}
        </div>
      </div>
    </PrivateRoute>
  );
};

export default ModuleTutorialsPage;
