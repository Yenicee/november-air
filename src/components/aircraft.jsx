import React, { useState } from 'react';

const SelectButton = () => {
    const [selectedModel, setSelectedModel] = useState(null);

    const handleModelSelect = (model) => {
      setSelectedModel(model);
    };
  
    return (
        <label>
        Select a plane :
        <select>
          <option value="apple">SELECT AIRCRAFT</option>
          <option value="banana">C172B</option>
          <option value="banana">C172P</option>
          <option value="banana">C182T</option>
          <option value="banana">PA28-235</option>
        </select>
      </label>
    );
  };

export default SelectButton;
