import Dashboard from "./components/Dashboard";
import SolvedProblems from "./components/SolvedProblems";

function App() {
  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
      <Dashboard />
      <SolvedProblems />
    </div>
  );
}

export default App;
