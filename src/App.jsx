import { Routes, Route, Navigate } from "react-router-dom";
import client from "./supabase/client";
import ai from "./gemma/ai";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/Profile";
import Upload from "./pages/Upload";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="*" element={<Navigate to="/login" replace />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
