import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Dashboard from "./pages/Home/Dashboard";
import EditResume from "./pages/ResumeUpdate/EditResume";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/resume/:resumeId" element={<EditResume />} />
      </Routes>
      <Toaster
        toastOptions={{ className: "", style: { fontSize: "13px" } }}
      ></Toaster>
    </>
  );
}

export default App;
