import React, { useState } from 'react';
import CrearInput from './input';

const SelectButton = () => {
  const [selectedPlane, setSelectedPlane] = useState('');
  const [temperature, setTemperature] = useState(-80);
  const [elevation, setElevation] = useState(-1400);
  const [windDirection, setWindDirection] = useState(0);
  const [windIntensity, setWindIntensity] = useState(0);
  const [radioFrequency, setRadioFrequency] = useState(118.0);
  const [radioAids, setRadioAids] = useState(530);



    return (
        <label>
        Select a plane :
        <select onChange={(e) => setSelectedPlane(e.target.value)}>
    <option value="">Plane</option>
    <option value="C150L">C150L</option>
    <option value="C172B">C172B</option>
    <option value="C172P">C172P</option>
    <option value="C182T">C182T</option>
    <option value="PA28-235">PA28-235</option>
    </select>
      </label>
    );
  };

export default SelectButton;
