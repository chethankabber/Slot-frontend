import React, { useState } from 'react';
import { Container, Row, Col, Card, Nav } from 'react-bootstrap';
import SlotGrid from './SlotGrid';
import { FaBox } from 'react-icons/fa';

const BoxView = () => {
  const [activeBox, setActiveBox] = useState('BoxA');

  // Generate slots for each box
  const generateSlots = (boxId) => {
    const slots = [];
    for (let i = 1; i <= 12; i++) {
      const slotNumber = i.toString().padStart(2, '0');
      const slotId = `${boxId}-${slotNumber}`;
      
      // Mock some occupied slots
      const isOccupied = Math.random() > 0.5;
      
      slots.push({
        slotId,
        boxId,
        slotNumber: i,
        status: isOccupied ? 'occupied' : 'available',
        itemName: isOccupied ? `Item ${i}` : null,
        returnable: isOccupied ? Math.random() > 0.3 : null,
        addedBy: isOccupied ? 'user@slot.com' : null,
        addedDate: isOccupied ? '2025-10-10' : null,
        expectedReturnDate: isOccupied ? '2025-10-20' : null
      });
    }
    return slots;
  };

  const boxesData = {
    BoxA: { slots: generateSlots('BoxA'), color: '#ff6b6b' },
    BoxB: { slots: generateSlots('BoxB'), color: '#4ecdc4' },
    BoxC: { slots: generateSlots('BoxC'), color: '#ffa500' }
  };

  return (
    <Container fluid className="py-4">
      <div className="dashboard-header mb-4">
        <div>
          <h1 className="dashboard-title">
            <FaBox className="me-2" />
            Boxes & Slots Management
          </h1>
          <p className="dashboard-subtitle">View and manage all storage slots</p>
        </div>
      </div>

      <Card className="box-view-card">
        <Card.Header className="box-tabs-header">
          <Nav variant="pills" className="box-nav-pills">
            <Nav.Item>
              <Nav.Link 
                active={activeBox === 'BoxA'}
                onClick={() => setActiveBox('BoxA')}
                className="box-nav-link"
                style={{ 
                  background: activeBox === 'BoxA' ? boxesData.BoxA.color : 'transparent',
                  color: activeBox === 'BoxA' ? 'white' : '#4a5568'
                }}
              >
                📦 Box A
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
                active={activeBox === 'BoxB'}
                onClick={() => setActiveBox('BoxB')}
                className="box-nav-link"
                style={{ 
                  background: activeBox === 'BoxB' ? boxesData.BoxB.color : 'transparent',
                  color: activeBox === 'BoxB' ? 'white' : '#4a5568'
                }}
              >
                📦 Box B
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
                active={activeBox === 'BoxC'}
                onClick={() => setActiveBox('BoxC')}
                className="box-nav-link"
                style={{ 
                  background: activeBox === 'BoxC' ? boxesData.BoxC.color : 'transparent',
                  color: activeBox === 'BoxC' ? 'white' : '#4a5568'
                }}
              >
                📦 Box C
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>

        <Card.Body className="p-4">
          <SlotGrid 
            slots={boxesData[activeBox].slots} 
            boxName={activeBox}
            boxColor={boxesData[activeBox].color}
          />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default BoxView;