import React, { useState, useEffect } from 'react';

const SelectButton = ({ }) => {
  const planes = ['C150L', 'C172B', 'C172P', 'C182T', 'PA28-235'];
  const [selectedPlane, setSelectedPlane] = useState('');

  const handlePlaneSelect = (plane) => {
    setSelectedPlane(plane);
  };

  useEffect(() => {
    if (selectedPlane) {
      window.location.href = `/avion/${selectedPlane}`;
    }
  },[selectedPlane]);

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
      {selectedPlane && (
        <div className="plane-name">
          {selectedPlane}
        </div>
      )}
    </div>
  );
};

export default SelectButton;



