import React, { useState } from 'react';
import { Row, Col, Alert, Badge } from 'react-bootstrap';
import SlotCard from './SlotCard';
import SlotModal from './SlotModal';

const SlotGrid = ({ slots, boxName, boxColor }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');

  const occupiedCount = slots.filter(s => s.status === 'occupied').length;
  const availableCount = slots.filter(s => s.status === 'available').length;
  const returnableCount = slots.filter(s => s.returnable === true).length;

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
    if (slot.status === 'available') {
      setModalType('add');
    } else {
      setModalType('details');
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedSlot(null);
    setModalType('');
  };

  return (
    <div className="slot-grid-v2">
      {/* Summary Alert */}
      <Alert 
        variant="light" 
        className="summary-alert"
        style={{ borderLeft: `4px solid ${boxColor}` }}
      >
        <div className="d-flex justify-content-between align-items-center flex-wrap">
          <div>
            <strong style={{ color: boxColor }}>{boxName} Summary:</strong>
          </div>
          <div className="summary-badges">
            <Badge bg="success" className="me-2 summary-badge">
              ✓ {availableCount} Available
            </Badge>
            <Badge bg="danger" className="me-2 summary-badge">
              ✗ {occupiedCount} Occupied
            </Badge>
            <Badge bg="warning" text="dark" className="summary-badge">
              🔄 {returnableCount} Returnable
            </Badge>
          </div>
          <div className="occupancy-percentage">
            <small className="text-muted">
              Occupancy: <strong>{((occupiedCount / slots.length) * 100).toFixed(1)}%</strong>
            </small>
          </div>
        </div>
      </Alert>

      {/* Slot Grid */}
      <Row className="g-3 mb-4">
        {slots.map(slot => (
          <Col key={slot.slotId} xs={6} sm={4} md={3} lg={2}>
            <SlotCard 
              slot={slot} 
              onClick={() => handleSlotClick(slot)}
              boxColor={boxColor}
            />
          </Col>
        ))}
      </Row>

      {/* Legend */}
      <div className="legend-section">
        <h6 className="legend-title">Legend:</h6>
        <Row className="g-3">
          <Col md={4}>
            <div className="legend-item">
              <div className="legend-box legend-available"></div>
              <span>Available Slot</span>
            </div>
          </Col>
          <Col md={4}>
            <div className="legend-item">
              <div className="legend-box legend-occupied"></div>
              <span>Occupied Slot</span>
            </div>
          </Col>
          <Col md={4}>
            <div className="legend-item">
              <span className="legend-icon">🔄</span>
              <span>Returnable Item</span>
            </div>
          </Col>
        </Row>
      </div>

      {/* Modal */}
      {showModal && selectedSlot && (
        <SlotModal
          show={showModal}
          onHide={handleCloseModal}
          slot={selectedSlot}
          modalType={modalType}
        />
      )}
    </div>
  );
};

export default SlotGrid;