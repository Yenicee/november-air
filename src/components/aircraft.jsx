import React, { useState } from 'react';

const SelectButton = ({ onSelectPlane }) => {
  const planes = ['C150L', 'C172B', 'C172P', 'C182T', 'PA28-235'];

  return (
    <div>
      <label>
        Select a plane:
        <select onChange={(e) => onSelectPlane(e.target.value)}>
          <option value="">Plane</option>
          {planes.map((plane, index) => (
            <option key={index} value={plane}>
              {plane}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default SelectButton;
