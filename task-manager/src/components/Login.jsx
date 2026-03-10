import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';  
import { Card, Form, Button, Alert, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  return (
    <Container 
      fluid 
      className="d-flex align-items-center justify-content-center"
      style={{ 
        minHeight: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        backgroundColor: '#f8f9fa'
      }}
    >
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <Card className="shadow-sm border-0">
          <Card.Body className="p-4">
            <h2 className="text-center mb-4">Login</h2>
            
            {error && <Alert variant="danger">{error}</Alert>}
            
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                />
              </Form.Group>

              <Button 
                disabled={loading} 
                className="w-100 py-2" 
                type="submit"
                variant="primary"
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </Form>

            <div className="text-center mt-3">
              <Link to="/register" className="text-decoration-none">
                Don't have an account? Register
              </Link>
            </div>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}

export default Login;