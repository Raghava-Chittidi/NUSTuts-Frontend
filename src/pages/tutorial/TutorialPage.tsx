import { Outlet } from "react-router-dom";
import { Sidebar } from "../../components/sidebar/Sidebar";

const TutorialPage = () => {
  return (
    <div className="flex w-full">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default TutorialPage;
