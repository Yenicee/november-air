import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SelectButton = ({ onSelectPlane }) => {
  const planes = ['C150L', 'C172B', 'C172P', 'C182T', 'PA28-235'];
  const [selectedPlane, setSelectedPlane] = useState('');

  const handlePlaneSelect = (plane) => {
    setSelectedPlane(plane);
    onSelectPlane(plane);
  };

  return (
    <div>
      <label>
        Select a plane:
        <select onChange={(e) => handlePlaneSelect(e.target.value)}>
          <option value="">Plane</option>
          {planes.map((plane, index) => (
            <option key={index} value={plane}>
              {plane}
            </option>
          ))}
        </select>
      </label>
      {selectedPlane === 'C150L' && (
        <Link to="/avion/C150L">avion</Link>
      )}
      {selectedPlane === 'C182T' && (
        <Link to="/avion/C182T">otro avion</Link>
      )}
    </div>
  );
};

export default SelectButton;
