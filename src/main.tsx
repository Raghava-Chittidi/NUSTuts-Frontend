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
