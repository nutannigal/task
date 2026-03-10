import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import NavigationBar from './components/Navbar.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import TaskManager from './TaskManager.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

function AppContent() {
  const { user } = useAuth();

  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <TaskManager />
            </PrivateRoute>
          } 
        />
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;