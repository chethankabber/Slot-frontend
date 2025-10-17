import React, { useState } from 'react';
import { Container, Card, Form, Row, Col, Button, Badge } from 'react-bootstrap';
import { FaHistory, FaFilter, FaDownload, FaClock } from 'react-icons/fa';
import { toast } from 'react-toastify';

const HistoryLog = () => {
  const [filterBox, setFilterBox] = useState('all');
  const [filterAction, setFilterAction] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const historyData = [
    {
      id: 1,
      timestamp: '2025-10-16 10:30 AM',
      user: 'John Doe',
      action: 'add_item',
      slotId: 'BoxA-05',
      itemName: 'Laptop',
      type: 'success',
      description: 'Added Laptop to BoxA-05'
    },
    {
      id: 2,
      timestamp: '2025-10-16 09:15 AM',
      user: 'Jane Smith',
      action: 'return_item',
      slotId: 'BoxB-12',
      itemName: 'Projector',
      type: 'info',
      description: 'Returned Projector from BoxB-12'
    },
    {
      id: 3,
      timestamp: '2025-10-15 04:45 PM',
      user: 'Mike Johnson',
      action: 'remove_item',
      slotId: 'BoxC-03',
      itemName: 'Camera',
      type: 'warning',
      description: 'Removed Camera from BoxC-03'
    },
    {
      id: 4,
      timestamp: '2025-10-15 02:20 PM',
      user: 'Admin',
      action: 'approve_user',
      slotId: null,
      itemName: null,
      type: 'success',
      description: 'Approved new user registration'
    },
    {
      id: 5,
      timestamp: '2025-10-15 11:00 AM',
      user: 'Sarah Williams',
      action: 'add_item',
      slotId: 'BoxA-08',
      itemName: 'USB Drive',
      type: 'success',
      description: 'Added USB Drive to BoxA-08'
    }
  ];

  const getActionLabel = (action) => {
    const labels = {
      add_item: 'Added Item',
      remove_item: 'Removed Item',
      return_item: 'Returned Item',
      approve_user: 'Approved User',
      reject_user: 'Rejected User'
    };
    return labels[action] || action;
  };

  const filteredHistory = historyData.filter(item => {
    const matchesBox = filterBox === 'all' || (item.slotId && item.slotId.startsWith(filterBox));
    const matchesAction = filterAction === 'all' || item.action === filterAction;
    const matchesSearch = 
      item.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.itemName && item.itemName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.slotId && item.slotId.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesBox && matchesAction && matchesSearch;
  });

  const handleExport = () => {
    toast.success('Exporting history report...');
  };

  return (
    <Container fluid className="dashboard-modern py-4">
      {/* Header */}
      <div className="dashboard-header mb-4">
        <div>
          <h1 className="dashboard-title">
            <FaHistory className="me-2" />
            Activity History
          </h1>
          <p className="dashboard-subtitle">Track all system activities and changes</p>
        </div>
        <Button className="btn-modern-primary" onClick={handleExport}>
          <FaDownload className="me-2" />
          Export Report
        </Button>
      </div>

      {/* Filters */}
      <Card className="filter-section mb-4">
        <Card.Body>
          <div className="filter-title">
            <FaFilter className="me-2" />
            Filter History
          </div>
          <Row className="g-3">
            <Col md={4}>
              <Form.Control
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-modern"
              />
            </Col>
            <Col md={4}>
              <Form.Select
                value={filterBox}
                onChange={(e) => setFilterBox(e.target.value)}
                className="input-modern"
              >
                <option value="all">All Boxes</option>
                <option value="BoxA">Box A</option>
                <option value="BoxB">Box B</option>
                <option value="BoxC">Box C</option>
              </Form.Select>
            </Col>
            <Col md={4}>
              <Form.Select
                value={filterAction}
                onChange={(e) => setFilterAction(e.target.value)}
                className="input-modern"
              >
                <option value="all">All Actions</option>
                <option value="add_item">Add Item</option>
                <option value="remove_item">Remove Item</option>
                <option value="return_item">Return Item</option>
                <option value="approve_user">Approve User</option>
              </Form.Select>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Timeline */}
      <Card className="history-card-v2">
        <Card.Header className="activity-header">
          <div className="d-flex align-items-center justify-content-between">
            <h5 className="mb-0">
              <FaClock className="me-2" />
              Activity Timeline
            </h5>
            <Badge bg="secondary">{filteredHistory.length} Events</Badge>
          </div>
        </Card.Header>
        <Card.Body className="p-4">
          {filteredHistory.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <FaHistory />
              </div>
              <h5 className="empty-title">No History Found</h5>
              <p className="empty-description">No matching records found with the current filters.</p>
            </div>
          ) : (
            <div className="history-timeline">
              {filteredHistory.map(item => (
                <div key={item.id} className="timeline-item">
                  <div className={`timeline-dot ${item.type}`}></div>
                  <div className="timeline-content">
                    <div className="timeline-header">
                      <div className="timeline-action">
                        <Badge bg={item.type === 'success' ? 'success' : item.type === 'warning' ? 'warning' : 'info'}>
                          {getActionLabel(item.action)}
                        </Badge>
                      </div>
                      <div className="timeline-time">
                        <FaClock className="me-1" />
                        {item.timestamp}
                      </div>
                    </div>
                    <div className="timeline-details">
                      <strong>{item.user}</strong> {item.description}
                      {item.slotId && (
                        <div className="mt-1">
                          <Badge bg="secondary" className="me-2">Slot: {item.slotId}</Badge>
                          {item.itemName && <Badge bg="primary">Item: {item.itemName}</Badge>}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default HistoryLog;