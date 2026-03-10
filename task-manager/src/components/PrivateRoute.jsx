import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';  
import { Spinner, Container } from 'react-bootstrap';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Loading...</p>
      </Container>
    );
  }

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;