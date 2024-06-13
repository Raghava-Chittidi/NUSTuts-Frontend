import { Outlet } from "react-router-dom";
import { Sidebar } from "../../components/Sidebar";
import { useTutorial } from "../../hooks/useTutorial";
import { useAuthContext } from "../../hooks/useAuthContext";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useEffect } from "react";

const TutorialPage = () => {
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
      <Outlet />
    </div>
  );
};

export default TutorialPage;
