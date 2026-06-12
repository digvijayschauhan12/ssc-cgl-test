import { Routes, Route } from "react-router-dom";
import TopNav from "./components/TopNav";
import Logo from "./components/Logo";
import HomeScreen from "./screens/HomeScreen";
import PyqScreen from "./screens/PyqScreen";
import SubjectSelect from "./screens/SubjectSelect";
import PracticeRun from "./screens/PracticeRun";

export default function App() {
  return (
    <div className="app">
      <TopNav />
      <main className="main">
        <div className="view">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/pyq" element={<PyqScreen />} />
            <Route path="/pyq/:tierId" element={<PyqScreen />} />
            <Route path="/practice" element={<SubjectSelect />} />
            <Route path="/practice/:subjectId" element={<PracticeRun />} />
          </Routes>
        </div>
        <footer className="footer">
          <Logo size={28} />
          <div className="footer-note">Practice archive for SSC CGL aspirants · Sample data for demo purposes</div>
        </footer>
      </main>
    </div>
  );
}
