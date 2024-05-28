import Layout from "./components/Layout";
import Homepage from "./pages/Homepage";
import ModuleTutorialsPage from "./pages/ModuleTutorialsPage";
import ModulesPage from "./pages/ModulesPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
  // Render ModulesPage with dummy modules array, to be replaced with real data in future
  {
    path: "/modules",
    element: <ModulesPage modules={modules} />,
  },
  {
    path: "/modules/:moduleCode/tutorials",
    element: <ModuleTutorialsPage />,
  },
]);

function App() {
  return (
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  );
}

export default App;
