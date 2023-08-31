import React from "react";

const CrearInput =({label, min, max, step, value, onChange}) => {
 
  const handleInputChange = (event) => {
    const newValue = parseFloat(event.target.value);
    let validValue = newValue; // Por defecto, asumimos que el valor es válido
  
    if (label === "Pressure") {
      if (newValue < 948) {
        validValue = 948;
      } else if (newValue > 1050) {
        validValue = 1050;
      }
    } else if (label === "Temperature") {
      if (newValue < -80) {
        validValue = -80;
      } else if (newValue > 50) {
        validValue = 50;
      }
    } else if (label === "Elevation") {
      if (newValue < -1400) {
        validValue = -1400;
      } else if (newValue > 14000) {
        validValue = 14000;
      }
    } else if (label === "WindDirection") {
      if (newValue < 0) {
        validValue = 0;
      } else if (newValue > 360) {
        validValue = 360;
      }
    } else if (label === "WindIntensity") {
      if (newValue < 0) {
        validValue = 0;
      } else if (newValue > 40) {
        validValue = 40;
      }
    } else if (label === "RadioFrequency") {
      if (newValue < 118.0) {
        validValue = 118.0;
      } else if (newValue > 118.925) {
        validValue = 118.925;
      }
    } else if (label === "RadioAids") {
      if (newValue < 530) {
        validValue = 530;
      } else if (newValue > 1700) {
        validValue = 1700;
      }
    }
  
    onChange(validValue);
  };
    
    
  return (
    <div>
      <label>{label}</label>
      <input
        type="number"
        name={label}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

  export default CrearInput;