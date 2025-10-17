import React from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const SlotCard = ({ slot, onClick, boxColor }) => {
  const isOccupied = slot.status === 'occupied';

  return (
    <div 
      className={`slot-card-v2 ${isOccupied ? 'slot-occupied-v2' : 'slot-available-v2'}`}
      onClick={onClick}
      style={{
        borderColor: isOccupied ? '#f44336' : '#4caf50'
      }}
    >
      <div className="slot-status-icon" style={{ color: isOccupied ? '#f44336' : '#4caf50' }}>
        {isOccupied ? <FaTimesCircle size={24} /> : <FaCheckCircle size={24} />}
      </div>
      
      <div className="slot-id-v2">{slot.slotId}</div>
      
      {isOccupied && (
        <>
          <div className="slot-item-name">{slot.itemName}</div>
          <div className="slot-item-type">
            {slot.returnable ? '🔄 Returnable' : '🔒 Non-Returnable'}
          </div>
        </>
      )}

      {!isOccupied && (
        <div className="slot-click-hint">
          <small>Click to add</small>
        </div>
      )}
    </div>
  );
};

export default SlotCard;