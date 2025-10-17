import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, InputGroup, Nav, Badge } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { FaSearch, FaUserCheck, FaUserClock, FaCheck, FaTimes } from 'react-icons/fa';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('pending');

  const [pendingUsers, setPendingUsers] = useState([
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'user', requestDate: '2025-10-12' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'manager', requestDate: '2025-10-13' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'user', requestDate: '2025-10-14' }
  ]);

  const [approvedUsers, setApprovedUsers] = useState([
    { id: 4, name: 'David Lee', email: 'david@example.com', role: 'manager', status: 'approved', approvedDate: '2025-10-10' },
    { id: 5, name: 'Eva Garcia', email: 'eva@example.com', role: 'user', status: 'approved', approvedDate: '2025-10-11' },
    { id: 6, name: 'Frank White', email: 'frank@example.com', role: 'user', status: 'approved', approvedDate: '2025-10-09' }
  ]);

  const handleApprove = (userId) => {
    const user = pendingUsers.find(u => u.id === userId);
    if (user) {
      setPendingUsers(pendingUsers.filter(u => u.id !== userId));
      setApprovedUsers([...approvedUsers, { 
        ...user, 
        status: 'approved', 
        approvedDate: new Date().toISOString().split('T')[0] 
      }]);
      toast.success(`${user.name} has been approved!`);
    }
  };

  const handleReject = (userId) => {
    const user = pendingUsers.find(u => u.id === userId);
    if (user) {
      setPendingUsers(pendingUsers.filter(u => u.id !== userId));
      toast.error(`${user.name} has been rejected.`);
    }
  };

  const getRoleBadgeColor = (role) => {
    const colors = {
      admin: 'danger',
      manager: 'warning',
      user: 'info'
    };
    return colors[role] || 'secondary';
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const filteredPendingUsers = pendingUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredApprovedUsers = approvedUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container fluid className="dashboard-modern py-4">
      {/* Header */}
      <div className="dashboard-header mb-4">
        <div>
          <h1 className="dashboard-title">
            <FaUserCheck className="me-2" />
            User Management
          </h1>
          <p className="dashboard-subtitle">Manage user registrations and permissions</p>
        </div>
      </div>

      {/* Search Bar */}
      <Card className="search-card mb-4">
        <Card.Body>
          <InputGroup className="search-input-group">
            <InputGroup.Text className="search-icon">
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input-modern"
            />
          </InputGroup>
        </Card.Body>
      </Card>

      {/* Tabs */}
      <Card className="users-card">
        <Card.Header className="users-tabs-header">
          <Nav variant="pills" className="users-nav-pills">
            <Nav.Item>
              <Nav.Link 
                active={activeTab === 'pending'}
                onClick={() => setActiveTab('pending')}
                className="users-nav-link"
              >
                <FaUserClock className="me-2" />
                Pending Approvals ({pendingUsers.length})
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
                active={activeTab === 'approved'}
                onClick={() => setActiveTab('approved')}
                className="users-nav-link"
              >
                <FaUserCheck className="me-2" />
                Approved Users ({approvedUsers.length})
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>

        <Card.Body className="p-4">
          {activeTab === 'pending' ? (
            filteredPendingUsers.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">
                  <FaUserClock />
                </div>
                <h5 className="empty-title">No Pending Users</h5>
                <p className="empty-description">All registrations have been reviewed.</p>
              </div>
            ) : (
              <Row className="g-3">
                {filteredPendingUsers.map(user => (
                  <Col key={user.id} lg={6}>
                    <div className="user-card">
                      <div className="d-flex align-items-center gap-3">
                        <div className="user-avatar">
                          {getInitials(user.name)}
                        </div>
                        <div className="user-info">
                          <div className="user-name">{user.name}</div>
                          <div className="user-email">{user.email}</div>
                          <small className="text-muted">Requested: {user.requestDate}</small>
                        </div>
                        <div className="ms-auto">
                          <Badge bg={getRoleBadgeColor(user.role)} className="user-role-badge">
                            {user.role.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                      <div className="approval-buttons mt-3">
                        <button 
                          className="btn-approve"
                          onClick={() => handleApprove(user.id)}
                        >
                          <FaCheck className="me-2" />
                          Approve
                        </button>
                        <button 
                          className="btn-reject"
                          onClick={() => handleReject(user.id)}
                        >
                          <FaTimes className="me-2" />
                          Reject
                        </button>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            )
          ) : (
            filteredApprovedUsers.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">
                  <FaUserCheck />
                </div>
                <h5 className="empty-title">No Approved Users</h5>
                <p className="empty-description">No users have been approved yet.</p>
              </div>
            ) : (
              <Row className="g-3">
                {filteredApprovedUsers.map(user => (
                  <Col key={user.id} lg={6}>
                    <div className="user-card approved-user-card">
                      <div className="d-flex align-items-center gap-3">
                        <div className="user-avatar">
                          {getInitials(user.name)}
                        </div>
                        <div className="user-info">
                          <div className="user-name">{user.name}</div>
                          <div className="user-email">{user.email}</div>
                          <small className="text-muted">Approved: {user.approvedDate}</small>
                        </div>
                        <div className="ms-auto text-end">
                          <Badge bg={getRoleBadgeColor(user.role)} className="user-role-badge mb-2">
                            {user.role.toUpperCase()}
                          </Badge>
                          <br />
                          <Badge bg="success">
                            <FaCheck className="me-1" />
                            Active
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            )
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UserManagement;