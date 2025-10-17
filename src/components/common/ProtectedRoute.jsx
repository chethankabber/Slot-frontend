import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Container, Alert } from 'react-bootstrap';
import { FaExclamationTriangle } from 'react-icons/fa';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useContext(AuthContext);

  // If not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If roles are specified and user doesn't have required role
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <Container className="py-5">
        <Alert variant="danger" className="text-center">
          <FaExclamationTriangle size={50} className="mb-3" />
          <h4>Access Denied</h4>
          <p>
            You don't have permission to access this page.
          </p>
          <p className="mb-0">
            <strong>Required:</strong> {allowedRoles.join(' or ')} | 
            <strong> Your Role:</strong> {user.role}
          </p>
        </Alert>
      </Container>
    );
  }

  return children;
};

export default ProtectedRoute;