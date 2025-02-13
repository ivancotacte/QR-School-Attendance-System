import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Feedback from './pages/Feedback';

function App() {
  return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>
  );
}

export default App;