import { Outlet, useParams } from "react-router-dom";
import { Sidebar } from "../../components/sidebar/Sidebar";
import { useTutorial } from "../../hooks/useTutorial";
import { useAuthContext } from "../../hooks/useAuthContext";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useEffect } from "react";
import { TutorialContextType } from "../../types";

const TutorialPage = () => {
  const { tutorialId } = useParams();
  const { isLoggingIn } = useAuthContext();
  const { isLoading, validateTutorialId } = useTutorial();

  useEffect(() => {
    if (!isLoggingIn) {
      validateTutorialId();
    }
  }, [isLoggingIn]);

  if (isLoggingIn || isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex w-full overflow-hidden max-h-[calc(100vh-65px)]">
      <Sidebar />
      <Outlet context={{ tutorialId: Number(tutorialId) } satisfies TutorialContextType} />
    </div>
  );
};

export default TutorialPage;
