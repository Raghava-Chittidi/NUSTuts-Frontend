import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import App from "./App";
import "./index.css";
import ModulesPage from "./pages/ModulesPage";
import ChooseUserType from "./pages/ChooseUserType";
import LoginPage from "./pages/LoginPage";
import StudentSignUpPage from "./pages/student/StudentSignUpPage";

/** 
 * A browser router containing routes.
 * Add new routes here as needed.
 */
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/chooseUserType",
    element: <ChooseUserType />
  },
  {
    path: "/studentLogin",
    element: <LoginPage userType="Student" />
  },
  {
    path: "/taLogin",
    element: <LoginPage userType="Teaching Assistant" />
  },
  {
    path: "/studentSignUp",
    element: <StudentSignUpPage />
  },
  // Render ModulesPage with empty modules array, to be replaced with real data in future
  {
    path: "/modules",
    element: <ModulesPage modules={[]} />
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <RouterProvider router={router} />
    </NextUIProvider>
  </React.StrictMode>
);
