import { Outlet } from "react-router-dom";
import { Sidebar } from "../../components/Sidebar";

const TutorialPage = () => {
  return (
    <div className="flex w-full overflow-hidden max-h-[calc(100vh-65px)]">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default TutorialPage;
