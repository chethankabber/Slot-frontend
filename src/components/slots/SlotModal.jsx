import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col, Badge } from 'react-bootstrap';
import { toast } from 'react-toastify';

const SlotModal = ({ show, onHide, slot, modalType }) => {
  const [formData, setFormData] = useState({
    itemName: '',
    returnable: true,
    expectedReturnDate: '',
    notes: ''
  });

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success(`Item "${formData.itemName}" added to ${slot.slotId}`);
    onHide();
  };

  const handleRemove = () => {
    toast.info(`Item removed from ${slot.slotId}`);
    onHide();
  };

  const handleMarkReturned = () => {
    toast.success(`Item marked as returned from ${slot.slotId}`);
    onHide();
  };

  // Add Item Modal
  if (modalType === 'add') {
    return (
      <Modal show={show} onHide={onHide} centered size="lg">
        <Modal.Header closeButton className="modal-header-modern">
          <Modal.Title>Add Item to {slot.slotId}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Item Name *</Form.Label>
              <Form.Control
                type="text"
                name="itemName"
                value={formData.itemName}
                onChange={handleChange}
                placeholder="Enter item name"
                className="input-modern"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="switch"
                name="returnable"
                label="Is this item returnable?"
                checked={formData.returnable}
                onChange={handleChange}
                className="switch-modern"
              />
            </Form.Group>

            {formData.returnable && (
              <Form.Group className="mb-3">
                <Form.Label>Expected Return Date</Form.Label>
                <Form.Control
                  type="date"
                  name="expectedReturnDate"
                  value={formData.expectedReturnDate}
                  onChange={handleChange}
                  className="input-modern"
                />
              </Form.Group>
            )}

            <Form.Group className="mb-3">
              <Form.Label>Notes (Optional)</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Add any notes..."
                className="input-modern"
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button type="submit" className="btn-modern-primary">
                Add Item
              </Button>
              <Button variant="secondary" onClick={onHide}>
                Cancel
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  // View Details Modal
  if (modalType === 'details') {
    return (
      <Modal show={show} onHide={onHide} centered size="lg">
        <Modal.Header closeButton className="modal-header-modern">
          <Modal.Title>Slot Details: {slot.slotId}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Row className="mb-3 detail-row">
            <Col xs={6} className="detail-label">Status:</Col>
            <Col xs={6}>
              <Badge bg={slot.status === 'occupied' ? 'danger' : 'success'} className="detail-badge">
                {slot.status}
              </Badge>
            </Col>
          </Row>

          {slot.status === 'occupied' && (
            <>
              <Row className="mb-3 detail-row">
                <Col xs={6} className="detail-label">Item Name:</Col>
                <Col xs={6} className="detail-value">{slot.itemName}</Col>
              </Row>

              <Row className="mb-3 detail-row">
                <Col xs={6} className="detail-label">Type:</Col>
                <Col xs={6}>
                  <Badge bg={slot.returnable ? 'success' : 'secondary'} className="detail-badge">
                    {slot.returnable ? '🔄 Returnable' : '🔒 Non-Returnable'}
                  </Badge>
                </Col>
              </Row>

              <Row className="mb-3 detail-row">
                <Col xs={6} className="detail-label">Added By:</Col>
                <Col xs={6} className="detail-value">{slot.addedBy}</Col>
              </Row>

              <Row className="mb-3 detail-row">
                <Col xs={6} className="detail-label">Added Date:</Col>
                <Col xs={6} className="detail-value">{slot.addedDate}</Col>
              </Row>

              {slot.returnable && slot.expectedReturnDate && (
                <Row className="mb-3 detail-row">
                  <Col xs={6} className="detail-label">Expected Return:</Col>
                  <Col xs={6} className="detail-value">{slot.expectedReturnDate}</Col>
                </Row>
              )}
            </>
          )}

          <div className="d-grid gap-2 mt-4">
            {slot.status === 'occupied' && slot.returnable && (
              <Button variant="success" onClick={handleMarkReturned} className="btn-modal-action">
                Mark as Returned
              </Button>
            )}
            {slot.status === 'occupied' && (
              <Button variant="danger" onClick={handleRemove} className="btn-modal-action">
                Remove Item
              </Button>
            )}
            <Button variant="secondary" onClick={onHide}>
              Close
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    );
  }

  return null;
};

export default SlotModal;