import React, { useState, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaUser, FaLock, FaArrowRight } from 'react-icons/fa';

const Login = () => {
  const { user, login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  if (user) return <Navigate to="/dashboard" />;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData.email, formData.password);
  };

  const quickLogin = (role) => {
    const credentials = {
      admin: { email: 'admin@slot.com', password: 'password123' },
      manager: { email: 'manager@slot.com', password: 'password123' },
      user: { email: 'user@slot.com', password: 'password123' }
    };
    setFormData(credentials[role]);
  };
   
  return (
    <div className="auth-container-v2">
      <Container>
        <Row className="justify-content-center align-items-center min-vh-100 ">
          <Col lg={5} md={7}>
            <div className="auth-card-modern">
              <div className="auth-header-modern">
                <img src="/logo01.png" alt="i logo" className="auth-icon mb-3" style={{width: 95, height: 75}} />
                <h1 className="auth-title">GANDEEVAN TECHNOLOGIES</h1>
                <p className="auth-subtitle">Sign in to continue</p>
              </div>

              <div className="quick-login-section">
                <p className="quick-login-title">Quick Login</p>
                <div className="quick-login-buttons">
                  <button className="quick-btn admin-btn" onClick={() => quickLogin('admin')}>
                    Admin
                  </button>
                  <button className="quick-btn manager-btn" onClick={() => quickLogin('manager')}>
                    Manager
                  </button>
                  <button className="quick-btn user-btn" onClick={() => quickLogin('user')}>
                    User
                  </button>
                </div>
              </div>

              <Form onSubmit={handleSubmit}>
                <div className="input-group-modern">
                  <div className="input-icon">
                    <FaUser />
                  </div>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email address"
                    className="input-modern"
                    required
                  />
                </div>

                <div className="input-group-modern">
                  <div className="input-icon">
                    <FaLock />
                  </div>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="input-modern"
                    required
                  />
                </div>

                <Button type="submit" className="btn-modern-primary w-100">
                  Sign In
                  <FaArrowRight className="ms-2" />
                </Button>

                <div className="auth-footer-modern">
                  <p className="text-white">
                    Don't have an account?{' '}
                    <Link to="/register" className="auth-link">
                      Register here
                    </Link>
                  </p>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
