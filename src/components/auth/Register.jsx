import React, { useState, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaUser, FaLock, FaEnvelope, FaUserTag, FaArrowRight } from 'react-icons/fa';

const Register = () => {
  const { user, register } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user'
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
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    await register(formData.name, formData.email, formData.password, formData.role);
  };

  return (
    <div className="auth-container-v2">
      <Container>
        <Row className="justify-content-center align-items-center min-vh-100">
          <Col lg={5} md={7}>
            <div className="auth-card-modern">
              <div className="auth-header-modern">
                <img src="/logo01.png" alt="i logo" className="auth-icon mb-3" style={{width: 95, height: 75}} />
                <h1 className="auth-title">GANDEEVAN TECHNOLOGIES</h1>
                <p className="auth-subtitle">Create Account</p>
              </div>

              <Form onSubmit={handleSubmit}>
                <div className="input-group-modern">
                  <div className="input-icon">
                    <FaUser />
                  </div>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="input-modern"
                    required
                  />
                </div>

                <div className="input-group-modern">
                  <div className="input-icon">
                    <FaEnvelope />
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
                    <FaUserTag />
                  </div>
                  <Form.Select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="input-modern"
                  >
                    <option value="user">User</option>
                    <option value="manager">Manager</option>
                  </Form.Select>
                  <small className="text-muted mt-1 d-block">
                    Admin will review your registration
                  </small>
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
                    minLength="6"
                    required
                  />
                </div>

                <div className="input-group-modern">
                  <div className="input-icon">
                    <FaLock />
                  </div>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    className="input-modern"
                    minLength="6"
                    required
                  />
                </div>

                <Button type="submit" className="btn-modern-primary w-100">
                  Create Account
                  <FaArrowRight className="ms-2" />
                </Button>

                <div className="auth-footer-modern">
                  <p>
                    Already have an account?{' '}
                    <Link to="/login" className="auth-link">
                      Login here
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

export default Register;