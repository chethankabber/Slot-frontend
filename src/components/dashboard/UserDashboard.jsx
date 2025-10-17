import React, { useContext } from 'react';
import { Container, Row, Col, Card, Badge, Table, Button, Alert } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';
import { FaBox, FaClock, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const stats = {
    myItems: 3,
    returnable: 2,
    nonReturnable: 1,
    overdue: 1,
    totalSlots: 36,
    systemOccupied: 22,
    systemAvailable: 14
  };

  const myItems = [
    { 
      slot: 'BoxA-05', 
      item: 'Laptop', 
      addedDate: '2025-10-10', 
      returnDate: '2025-10-20', 
      returnable: true,
      status: 'active'
    },
    { 
      slot: 'BoxB-08', 
      item: 'USB Drive', 
      addedDate: '2025-10-12', 
      returnDate: null, 
      returnable: false,
      status: 'active'
    },
    { 
      slot: 'BoxC-03', 
      item: 'Charger', 
      addedDate: '2025-10-05', 
      returnDate: '2025-10-13', 
      returnable: true,
      status: 'overdue'
    }
  ];

  return (
    <Container fluid className="dashboard-modern py-4">
      {/* Header */}
      <div className="dashboard-header mb-4">
        <div>
          <h1 className="dashboard-title">My Dashboard</h1>
          <p className="dashboard-subtitle">Welcome, {user?.name}!</p>
        </div>
      </div>

      {/* Alert for Overdue */}
      {stats.overdue > 0 && (
        <Alert variant="danger" className="mb-4">
          <FaExclamationTriangle className="me-2" />
          <strong>Attention!</strong> You have {stats.overdue} overdue item(s). Please return them as soon as possible.
        </Alert>
      )}

      {/* Personal Stats */}
      <Row className="g-4 mb-4">
        <Col lg={3} md={6}>
          <div className="metric-card gradient-blue">
            <div className="metric-icon"><FaBox /></div>
            <div className="metric-content">
              <h3 className="metric-value">{stats.myItems}</h3>
              <p className="metric-label">My Items</p>
              <small className="metric-detail">Currently holding</small>
            </div>
          </div>
        </Col>

        <Col lg={3} md={6}>
          <div className="metric-card gradient-green">
            <div className="metric-icon"><FaClock /></div>
            <div className="metric-content">
              <h3 className="metric-value">{stats.returnable}</h3>
              <p className="metric-label">Returnable</p>
              <small className="metric-detail">Must return</small>
            </div>
          </div>
        </Col>

        <Col lg={3} md={6}>
          <div className="metric-card gradient-orange">
            <div className="metric-icon"><FaCheckCircle /></div>
            <div className="metric-content">
              <h3 className="metric-value">{stats.nonReturnable}</h3>
              <p className="metric-label">Non-Returnable</p>
              <small className="metric-detail">Permanent</small>
            </div>
          </div>
        </Col>

        <Col lg={3} md={6}>
          <div className="metric-card gradient-red">
            <div className="metric-icon"><FaExclamationTriangle /></div>
            <div className="metric-content">
              <h3 className="metric-value">{stats.overdue}</h3>
              <p className="metric-label">Overdue</p>
              <small className="metric-detail">Urgent action needed</small>
            </div>
          </div>
        </Col>
      </Row>

      {/* System Overview */}
      <Row className="g-4 mb-4">
        <Col>
          <Card className="system-overview-card">
            <Card.Body>
              <h5 className="mb-4 text-center">System Overview</h5>
              <Row className="text-center">
                <Col md={4}>
                  <div className="system-stat">
                    <div className="system-stat-value">{stats.totalSlots}</div>
                    <div className="system-stat-label">Total Slots</div>
                    <small className="text-muted">(3 Boxes × 12)</small>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="system-stat">
                    <div className="system-stat-value text-danger">{stats.systemOccupied}</div>
                    <div className="system-stat-label">Occupied</div>
                    <small className="text-muted">Currently in use</small>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="system-stat">
                    <div className="system-stat-value text-success">{stats.systemAvailable}</div>
                    <div className="system-stat-label">Available</div>
                    <small className="text-muted">Ready to use</small>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* My Active Items Table */}
      <Row className="g-4 mb-4">
        <Col>
          <Card className="activity-card">
            <Card.Header className="activity-header">
              <h5 className="mb-0">My Active Items</h5>
            </Card.Header>
            <Card.Body>
              <Table hover responsive>
                <thead>
                  <tr>
                    <th>Slot ID</th>
                    <th>Item Name</th>
                    <th>Added Date</th>
                    <th>Return Date</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {myItems.map((item, index) => (
                    <tr key={index} className={item.status === 'overdue' ? 'table-danger' : ''}>
                      <td><strong>{item.slot}</strong></td>
                      <td>{item.item}</td>
                      <td>{item.addedDate}</td>
                      <td>{item.returnDate || 'N/A'}</td>
                      <td>
                        <Badge bg={item.returnable ? 'success' : 'secondary'}>
                          {item.returnable ? 'Returnable' : 'Non-Returnable'}
                        </Badge>
                      </td>
                      <td>
                        {item.status === 'overdue' ? (
                          <Badge bg="danger">Overdue</Badge>
                        ) : (
                          <Badge bg="success">Active</Badge>
                        )}
                      </td>
                      <td>
                        {item.returnable && (
                          <Button size="sm" variant="warning">
                            Mark as Returned
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Quick Actions */}
      <Row className="g-4">
        <Col>
          <Card className="quick-actions-card">
            <Card.Header className="activity-header">
              <h5 className="mb-0">Quick Actions</h5>
            </Card.Header>
            <Card.Body>
              <Row className="g-3">
                <Col md={3} sm={6}>
                  <button 
                    className="action-button blue-action"
                    onClick={() => navigate('/boxes')}
                  >
                    <FaBox className="me-2" />
                    Add New Item
                  </button>
                </Col>
                <Col md={3} sm={6}>
                  <button 
                    className="action-button green-action"
                    onClick={() => navigate('/boxes')}
                  >
                    <FaCheckCircle className="me-2" />
                    View All Slots
                  </button>
                </Col>
                <Col md={3} sm={6}>
                  <button 
                    className="action-button orange-action"
                    onClick={() => navigate('/history')}
                  >
                    <FaClock className="me-2" />
                    My History
                  </button>
                </Col>
                <Col md={3} sm={6}>
                  <button className="action-button purple-action">
                    Request Extension
                  </button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserDashboard;