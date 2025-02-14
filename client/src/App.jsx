import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Feedback from './pages/Feedback';
import Profile from './pages/Profile';
import GenerateQRCode from './pages/GenerateQRCode';
import ClassPage from './pages/ClassPage';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/generate-qr" element={<GenerateQRCode />} />
      <Route path="/class" element={<ClassPage />} />
    </Routes>
  );
}

export default App;