import React, { useContext } from 'react';
import { Container, Row, Col, Card, Badge, ProgressBar } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';
import { FaBox, FaCheckCircle, FaTimesCircle, FaUsers, FaClock, FaChartLine } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const stats = {
    totalSlots: 36,
    occupied: 22,
    available: 14,
    returnable: 18,
    pendingUsers: 3,
    totalUsers: 15,
    boxes: [
      { name: 'Box A', total: 12, occupied: 8, available: 4, color: '#ff6b6b' },
      { name: 'Box B', total: 12, occupied: 7, available: 5, color: '#4ecdc4' },
      { name: 'Box C', total: 12, occupied: 7, available: 5, color: '#ffa500' }
    ]
  };

  const recentActivity = [
    { user: 'person1', action: 'Added item to BoxA-05', time: '2 mins ago', type: 'success' },
    { user: 'ABXD', action: 'Returned item from BoxB-12', time: '15 mins ago', type: 'info' },
    { user: 'Rajahulli', action: 'Removed item from BoxC-03', time: '1 hour ago', type: 'warning' }
  ];

  return (
    <Container fluid className="dashboard-modern py-4">
      {/* Header */}
      <div className="dashboard-header mb-4">
        <div>
          <h1 className="dashboard-title">Super Admin Dashboard</h1>
        
        </div>
        <div className="dashboard-date">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      {/* Main Stats Cards */}
      <Row className="g-4 mb-4">
        <Col lg={3} md={6}>
          <div className="metric-card gradient-blue">
            <div className="metric-icon">
              <FaBox />
            </div>
            <div className="metric-content">
              <h3 className="metric-value">{stats.totalSlots}</h3>
              <p className="metric-label">Total Slots</p>
              <small className="metric-detail">3 Boxes × 12 Slots</small>
            </div>
          </div>
        </Col>

        <Col lg={3} md={6}>
          <div className="metric-card gradient-red">
            <div className="metric-icon">
              <FaTimesCircle />
            </div>
            <div className="metric-content">
              <h3 className="metric-value">{stats.occupied}</h3>
              <p className="metric-label">Occupied</p>
              <small className="metric-detail">
                {((stats.occupied / stats.totalSlots) * 100).toFixed(1)}% Full
              </small>
            </div>
          </div>
        </Col>

        <Col lg={3} md={6}>
          <div className="metric-card gradient-green">
            <div className="metric-icon">
              <FaCheckCircle />
            </div>
            <div className="metric-content">
              <h3 className="metric-value">{stats.available}</h3>
              <p className="metric-label">Available</p>
              <small className="metric-detail">Ready to use</small>
            </div>
          </div>
        </Col>

        <Col lg={3} md={6}>
          <div className="metric-card gradient-orange">
            <div className="metric-icon">
              <FaUsers />
            </div>
            <div className="metric-content">
              <h3 className="metric-value">{stats.pendingUsers}</h3>
              <p className="metric-label">Pending</p>
              <small className="metric-detail">Awaiting approval</small>
            </div>
          </div>
        </Col>
      </Row>

      {/* Box Overview */}
      <Row className="g-4 mb-4">
        {stats.boxes.map((box, index) => (
          <Col lg={4} md={6} key={index}>
            <Card className="box-card">
              <Card.Body>
                <div className="box-header" style={{ borderLeftColor: box.color }}>
                  <h4>{box.name}</h4>
                  <Badge bg="secondary">{box.total} Slots</Badge>
                </div>
                
                <div className="box-stats">
                  <div className="box-stat">
                    <span className="box-stat-value" style={{ color: '#dc3545' }}>
                      {box.occupied}
                    </span>
                    <span className="box-stat-label">Occupied</span>
                  </div>
                  <div className="box-stat">
                    <span className="box-stat-value" style={{ color: '#28a745' }}>
                      {box.available}
                    </span>
                    <span className="box-stat-label">Available</span>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="d-flex justify-content-between mb-2">
                    <small>Occupancy</small>
                    <small className="fw-bold">
                      {((box.occupied / box.total) * 100).toFixed(1)}%
                    </small>
                  </div>
                  <ProgressBar 
                    now={(box.occupied / box.total) * 100}
                    variant={box.occupied / box.total > 0.7 ? 'danger' : 'success'}
                    style={{ height: '8px' }}
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Recent Activity & Quick Actions */}
      <Row className="g-4">
        <Col lg={8}>
          <Card className="activity-card">
            <Card.Header className="activity-header">
              <div className="d-flex align-items-center">
                <FaClock className="me-2" />
                <h5 className="mb-0">Recent Activity</h5>
              </div>
            </Card.Header>
            <Card.Body>
              {recentActivity.map((activity, index) => (
                <div key={index} className="activity-item">
                  <div className={`activity-indicator ${activity.type}`}></div>
                  <div className="activity-content">
                    <p className="activity-text">
                      <strong>{activity.user}</strong> {activity.action}
                    </p>
                    <small className="activity-time">{activity.time}</small>
                  </div>
                </div>
              ))}
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
                Manage Slots
              </button>
              <button 
                className="action-button green-action"
                onClick={() => navigate('/users')}
              >
                <FaUsers className="me-2" />
                User Management
              </button>
              <button 
                className="action-button orange-action"
                onClick={() => navigate('/history')}
              >
                <FaClock className="me-2" />
                View History
              </button>
              <button 
                className="action-button purple-action"
                onClick={() => navigate('/analytics')}
              >
                <FaChartLine className="me-2" />
                Analytics Report
              </button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;