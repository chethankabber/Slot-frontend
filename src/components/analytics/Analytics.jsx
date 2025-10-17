import React from 'react';
import { Container, Row, Col, Card, ProgressBar } from 'react-bootstrap';
import { FaChartBar, FaArrowUp, FaArrowDown } from 'react-icons/fa';

const Analytics = () => {
  const stats = {
    utilizationRate: 61.1,
    averageReturnTime: 8.5,
    currentOccupancy: 22,
    totalSlots: 36
  };

  const monthlyData = [
    { month: 'Jan', value: 50 },
    { month: 'Feb', value: 55 },
    { month: 'Mar', value: 61 },
    { month: 'Apr', value: 53 },
    { month: 'May', value: 67 },
    { month: 'Jun', value: 61 }
  ];

  const boxComparison = [
    { box: 'Box A', occupied: 8, total: 12, percentage: 66.7, color: '#ff6b6b' },
    { box: 'Box B', occupied: 7, total: 12, percentage: 58.3, color: '#4ecdc4' },
    { box: 'Box C', occupied: 7, total: 12, percentage: 58.3, color: '#ffa500' }
  ];

  return (
    <Container fluid className="dashboard-modern py-4">
      {/* Header */}
      <div className="dashboard-header mb-4">
        <div>
          <h1 className="dashboard-title">
            <FaChartBar className="me-2" />
            Analytics & Insights
          </h1>
          <p className="dashboard-subtitle">Visual overview of system performance</p>
        </div>
      </div>

      {/* Key Metrics */}
      <Row className="g-4 mb-4">
        <Col lg={3} md={6}>
          <div className="stat-box">
            <div className="stat-icon-large">
              <FaChartBar style={{ color: '#667eea' }} />
            </div>
            <div className="stat-number">{stats.utilizationRate}%</div>
            <div className="stat-description">Utilization Rate</div>
            <div className="stat-change positive">
              <FaArrowUp /> +8.5% from last month
            </div>
          </div>
        </Col>

        <Col lg={3} md={6}>
          <div className="stat-box">
            <div className="stat-icon-large">
              📅
            </div>
            <div className="stat-number">{stats.averageReturnTime}</div>
            <div className="stat-description">Avg Return Time (days)</div>
            <div className="stat-change negative">
              <FaArrowDown /> -2 days from last month
            </div>
          </div>
        </Col>

        <Col lg={3} md={6}>
          <div className="stat-box">
            <div className="stat-icon-large">
              📦
            </div>
            <div className="stat-number">{stats.currentOccupancy}/{stats.totalSlots}</div>
            <div className="stat-description">Current Occupancy</div>
            <div className="stat-change positive">
              <FaArrowUp /> +5 from last week
            </div>
          </div>
        </Col>

        <Col lg={3} md={6}>
          <div className="stat-box">
            <div className="stat-icon-large">
              🔄
            </div>
            <div className="stat-number">18</div>
            <div className="stat-description">Returnable Items</div>
            <div className="stat-change positive">
              <FaArrowUp /> +3 from last week
            </div>
          </div>
        </Col>
      </Row>

      {/* Monthly Trend - Simple Bar Visualization */}
      
      {/* Box Performance Comparison */}
      <Row className="g-4">
        <Col>
          <Card className="box-card">
            <Card.Header className="activity-header">
              <h5 className="mb-0">Box Performance Comparison</h5>
            </Card.Header>
            <Card.Body>
              <div className="comparison-container">
                {boxComparison.map((box, index) => (
                  <div key={index} className="comparison-item">
                    <div className="comparison-header">
                      <span className="comparison-label">{box.box}</span>
                      <span className="comparison-value">
                        {box.occupied}/{box.total} slots ({box.percentage.toFixed(1)}%)
                      </span>
                    </div>
                    <ProgressBar 
                      now={box.percentage}
                      variant={box.percentage > 70 ? 'danger' : box.percentage > 50 ? 'warning' : 'success'}
                      label={`${box.percentage.toFixed(1)}%`}
                      style={{ height: '30px' }}
                    />
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Summary Cards */}
      <Row className="g-4 mt-4">
        <Col md={4}>
          <Card className="summary-card-analytics">
            <Card.Body className="text-center">
              <div className="summary-icon">📊</div>
              <h3>Total Operations</h3>
              <h2 className="text-primary">245</h2>
              <p className="text-muted mb-0">This month</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="summary-card-analytics">
            <Card.Body className="text-center">
              <div className="summary-icon">⚡</div>
              <h3>Peak Usage</h3>
              <h2 className="text-success">89%</h2>
              <p className="text-muted mb-0">During May 2025</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="summary-card-analytics">
            <Card.Body className="text-center">
              <div className="summary-icon">👥</div>
              <h3>Active Users</h3>
              <h2 className="text-info">15</h2>
              <p className="text-muted mb-0">Currently registered</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Analytics;