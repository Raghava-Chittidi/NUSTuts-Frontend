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
import PrivateRoute from "./components/PrivateRoute";

// Dummy modules data
const modules = [
  {
    code: "CS1101S",
    name: "Programming Methodology I",
  },
  {
    code: "MA1522",
    name: "Linear Algebra",
  },
  {
    code: "MA1521",
    name: "Calculus",
  },
  {
    code: "IS1128",
    name: "Programming Methodology I",
  },
  {
    code: "GEA1000",
    name: "Programming Methodology I",
  },
];

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
    element: <ModulesPage modules={modules} />,
  },
  {
    path: "/modules/:moduleCode/tutorials",
    element: <ModuleTutorialsPage />,
  },
  {
    path: "/requests",
    element: <RequestPage />,
  },
]);

function App() {
  const user = useAuthContext().state.user;
  console.log("user: ", user);
  return user ? (
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  ): (
    <RouterProvider router={router} />
  );
}

export default App;
