import React, { useContext } from 'react';
import { Container, Row, Col, Card, Badge, Table, Button } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';
import { FaBox, FaCheckCircle, FaTimesCircle, FaHistory, FaExclamationTriangle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ManagerDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const stats = {
    totalSlots: 36,
    occupied: 22,
    available: 14,
    returnable: 18,
    myActions: 45
  };

  const overdueItems = [
    { slot: 'BoxA-03', item: 'Laptop', user: 'John Doe', daysOverdue: 4 },
    { slot: 'BoxB-07', item: 'Projector', user: 'Jane Smith', daysOverdue: 2 },
    { slot: 'BoxC-05', item: 'Camera', user: 'Mike Johnson', daysOverdue: 5 }
  ];

  const boxData = [
    { name: 'Box A', occupied: 8, available: 4, percentage: 66.7 },
    { name: 'Box B', occupied: 7, available: 5, percentage: 58.3 },
    { name: 'Box C', occupied: 7, available: 5, percentage: 58.3 }
  ];

  return (
    <Container fluid className="dashboard-modern py-4">
      {/* Header */}
      <div className="dashboard-header mb-4">
        <div>
          <h1 className="dashboard-title">Manager Dashboard</h1>
          <p className="dashboard-subtitle">Welcome, {user?.name}! </p>
        </div>
      </div>

      {/* Stats Row */}
      <Row className="g-4 mb-4">
        <Col lg={3} md={6}>
          <div className="metric-card gradient-blue">
            <div className="metric-icon"><FaBox /></div>
            <div className="metric-content">
              <h3 className="metric-value">{stats.totalSlots}</h3>
              <p className="metric-label">Total Slots</p>
              <small className="metric-detail">3 Boxes</small>
            </div>
          </div>
        </Col>

        <Col lg={3} md={6}>
          <div className="metric-card gradient-red">
            <div className="metric-icon"><FaTimesCircle /></div>
            <div className="metric-content">
              <h3 className="metric-value">{stats.occupied}</h3>
              <p className="metric-label">Occupied</p>
              <small className="metric-detail">Currently in use</small>
            </div>
          </div>
        </Col>

        <Col lg={3} md={6}>
          <div className="metric-card gradient-green">
            <div className="metric-icon"><FaCheckCircle /></div>
            <div className="metric-content">
              <h3 className="metric-value">{stats.available}</h3>
              <p className="metric-label">Available</p>
              <small className="metric-detail">Ready to assign</small>
            </div>
          </div>
        </Col>

        <Col lg={3} md={6}>
          <div className="metric-card gradient-orange">
            <div className="metric-icon"><FaHistory /></div>
            <div className="metric-content">
              <h3 className="metric-value">{stats.myActions}</h3>
              <p className="metric-label">My Actions</p>
              <small className="metric-detail">This month</small>
            </div>
          </div>
        </Col>
      </Row>

      {/* Box Overview - Visual Bars */}
      <Row className="g-4 mb-4">
        <Col>
          <Card className="box-card">
            <Card.Header className="activity-header">
              <h5 className="mb-0">Box Occupancy Overview</h5>
            </Card.Header>
            <Card.Body>
              {boxData.map((box, index) => (
                <div key={index} className="mb-4">
                  <div className="d-flex justify-content-between mb-2">
                    <strong>{box.name}</strong>
                    <span>
                      <Badge bg="danger" className="me-2">{box.occupied} Occupied</Badge>
                      <Badge bg="success">{box.available} Available</Badge>
                    </span>
                  </div>
                  <div className="progress-bar-modern">
                    <div 
                      className="progress-fill-modern"
                      style={{ 
                        width: `${box.percentage}%`,
                        background: box.percentage > 70 ? '#f5576c' : '#4facfe'
                      }}
                    >
                      <span className="progress-text">{box.percentage.toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Overdue Items & Quick Actions */}
      <Row className="g-4">
        <Col lg={8}>
          <Card className="activity-card">
            <Card.Header className="activity-header bg-danger">
              <div className="d-flex align-items-center">
                <FaExclamationTriangle className="me-2" />
                <h5 className="mb-0">⚠️ Overdue Returns</h5>
              </div>
            </Card.Header>
            <Card.Body>
              <Table hover responsive className="mb-0">
                <thead>
                  <tr>
                    <th>Slot ID</th>
                    <th>Item</th>
                    <th>User</th>
                    <th>Days Overdue</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {overdueItems.map((item, index) => (
                    <tr key={index}>
                      <td><strong>{item.slot}</strong></td>
                      <td>{item.item}</td>
                      <td>{item.user}</td>
                      <td>
                        <Badge bg="danger">{item.daysOverdue} days</Badge>
                      </td>
                      <td>
                        <Button size="sm" variant="warning">
                          Send Reminder
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="quick-actions-card">
            <Card.Header className="activity-header">
              <h5 className="mb-0">Quick Actions</h5>
            </Card.Header>
            <Card.Body>
              <button 
                className="action-button blue-action"
                onClick={() => navigate('/boxes')}
              >
                <FaBox className="me-2" />
                View All Slots
              </button>
              <button 
                className="action-button green-action"
                onClick={() => navigate('/boxes')}
              >
                <FaCheckCircle className="me-2" />
                Add New Item
              </button>
              <button 
                className="action-button orange-action"
                onClick={() => navigate('/history')}
              >
                <FaHistory className="me-2" />
                View History
              </button>
              <button 
                className="action-button purple-action"
                onClick={() => navigate('/analytics')}
              >
                Generate Report
              </button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ManagerDashboard;