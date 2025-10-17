import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar as BSNavbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';
import { FaBox, FaUser, FaSignOutAlt, FaBars } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  const getRoleColor = (role) => {
    switch(role) {
      case 'admin': return '#ff6b6b';
      case 'manager': return '#ffa500';
      case 'user': return '#4ecdc4';
      default: return '#95a5a6';
    }
  };   

  return (
    <BSNavbar className="modern-navbar shadow-lg" variant="dark" expand="lg">
      <Container fluid>
        <BSNavbar.Brand as={Link} to="/dashboard" className="brand-logo ">
          <img src="/logo01.png" alt="i logo" className="auth-icon m-2" style={{width: 75, height: 55}} />
          <span className="brand-text">GANDEEVAN TECHNOLOGIES</span>
        </BSNavbar.Brand>
        
        <BSNavbar.Toggle aria-controls="navbar-nav">
          <FaBars />
        </BSNavbar.Toggle>
        
        <BSNavbar.Collapse id="navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/dashboard" className="nav-item-modern">
              Dashboard
            </Nav.Link>
            
            <Nav.Link as={Link} to="/boxes" className="nav-item-modern">
              Slots
            </Nav.Link>
            
            {(user.role === 'admin' || user.role === 'manager') && (
              <Nav.Link as={Link} to="/analytics" className="nav-item-modern">
                Analytics
              </Nav.Link>
            )}
            
            <Nav.Link as={Link} to="/history" className="nav-item-modern">
              History
            </Nav.Link>
            
            {user.role === 'admin' && (
              <Nav.Link as={Link} to="/users" className="nav-item-modern">
                Users
              </Nav.Link>
            )}
            
            <Dropdown align="end" className="ms-3">
              <Dropdown.Toggle 
                variant="transparent" 
                className="user-dropdown"
                style={{ borderLeft: `3px solid ${getRoleColor(user.role)}` }}
              >
                <FaUser className="me-2" />
                {user.name}
              </Dropdown.Toggle>
              
              <Dropdown.Menu className="dropdown-modern">
                <Dropdown.Item disabled className="text-center">
                  <small style={{ color: getRoleColor(user.role) }}>
                    {user.role.toUpperCase()}
                  </small>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout} className="text-danger">
                  <FaSignOutAlt className="me-2" />
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
};

export default Navbar;