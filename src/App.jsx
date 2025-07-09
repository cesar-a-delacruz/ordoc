import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import Upload from "./pages/upload/Upload";
import Document from "./pages/document/Document";
import Documents from "./pages/Documents";

function App() {
  return (
    <>
      <Routes>
        <Route path="*" element={<Navigate to="/login" replace />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/document" element={<Document />} />
      </Routes>
    </>
  );
}

export default App;
