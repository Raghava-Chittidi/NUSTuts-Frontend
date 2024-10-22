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
import FilesPage from "./pages/files/FilesPage";
import WeekFilesPage from "./pages/files/WeekFilesPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DiscussionPage from "./pages/discussion/DiscussionPage";
import BookConsultationPage from "./pages/consultations/BookConsultationPage";
import ViewConsultationPage from "./pages/consultations/ViewConsultationPage";
import AttendancePage from "./pages/attendance/AttendancePage";
import ViewAttendancePage from "./pages/attendance/ViewAttendancePage";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const { isLoggedIn, isLoggingIn } = useAuthContext();

  // Application routes
  const router = createBrowserRouter([
    {
      path: "/",
      element: isLoggingIn ? (
        <LoadingSpinner />
      ) : isLoggedIn ? (
        <Layout />
      ) : (
        <Homepage />
      ),
      children: [
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
          path: "/tutorial/:tutorialId",
          element: <TutorialPage />,
          children: [
            {
              path: "discussion",
              element: <DiscussionPage />,
            },
            {
              path: "files",
              element: <FilesPage />,
            },
            {
              path: "files/weeks/:week",
              element: <WeekFilesPage />,
            },
            {
              path: "consultations/book",
              element: <BookConsultationPage />,
            },
            {
              path: "consultations/view",
              element: <ViewConsultationPage />,
            },
            {
              path: "attendance/today",
              element: <AttendancePage />,
            },
            {
              path: "attendance/view",
              element: <ViewAttendancePage />,
            },
          ],
        },
      ],
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
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
