import Layout from "./components/Layout";
import ChooseUserType from "./pages/ChooseUserType";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import ModuleTutorialsPage from "./pages/student/ModuleTutorialsPage";
import ModulesPage from "./pages/student/ModulesPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import StudentSignUpPage from "./pages/student/StudentSignUpPage";
import { RequestPage } from "./pages/ta/RequestPage";
import { useAuthContext } from "./hooks/useAuthContext";
import TutorialPage from "./pages/tutorial/TutorialPage";
import FilesPage from "./pages/tutorial/FilesPage";
import WeekFilesPage from "./pages/tutorial/WeekFilesPage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * A browser router containing routes.
 * Add new routes here as needed.
 */
const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/login",
    element: <ChooseUserType />,
  },
  {
    path: "/student/login",
    element: <LoginPage userType="Student" />,
  },
  {
    path: "/ta/login",
    element: <LoginPage userType="Teaching Assistant" />,
  },
  {
    path: "/student/signup",
    element: <StudentSignUpPage />,
  },
  // Render ModulesPage with dummy modules array, to be replaced with real data in future
  {
    path: "/modules",
    element: <ModulesPage />,
  },
  {
    path: "/modules/:moduleCode/tutorials",
    element: <ModuleTutorialsPage />,
  },
  {
    path: "/requests",
    element: <RequestPage />,
  },
  {
    path: "/tutorial",
    element: <TutorialPage />,
    children: [
      {
        path: "/tutorial/files",
        element: <FilesPage />,
      },
      {
        path: "/tutorial/files/weeks/:week",
        element: <WeekFilesPage />,
      },
    ],
  },
]);

function App() {
  const user = useAuthContext().state.user;
  return user ? (
    <Layout>
      <RouterProvider router={router} />
      <ToastContainer />
    </Layout>
  ) : (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
