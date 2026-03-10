import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    if (formData.password.length < 6) {
      return setError('Password must be at least 6 characters');
    }

    setLoading(true);

    const result = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password
    });
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'flex-end', 
        justifyContent: 'center',
        backgroundColor: '#f8f9fa',
        padding: '10px 10px 20px 10px', 
        overflow: 'auto'
      }}
    >
      <div style={{ width: '100%', maxWidth: '350px' }}>
        <Card className="shadow-sm border-0">
          <Card.Body className="p-3">
            <h3 className="text-center mb-3">Register</h3>
            
            {error && <Alert variant="danger" className="py-2 small">{error}</Alert>}
            
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-2">
                <Form.Label className="small mb-1">Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter name"
                  size="sm"
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label className="small mb-1">Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter email"
                  size="sm"
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label className="small mb-1">Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Min 6 characters"
                  size="sm"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="small mb-1">Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Confirm password"
                  size="sm"
                />
              </Form.Group>

              <Button 
                disabled={loading} 
                className="w-100 py-1"
                type="submit"
                variant="primary"
                size="sm"
              >
                {loading ? 'Registering...' : 'Register'}
              </Button>
            </Form>

            <div className="text-center mt-2 small">
              <Link to="/login" className="text-decoration-none">
                Already have an account? Login
              </Link>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default Register;