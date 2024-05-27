import Layout from "./components/Layout";
import Homepage from "./pages/Homepage";
import ModulesPage from "./pages/ModulesPage";

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

function App() {
  return (
    <Layout>
      <Homepage />
    </Layout>
  );
}

export default App;
