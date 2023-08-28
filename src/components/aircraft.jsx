import React, { useState } from 'react';

const SelectButton = () => {
    const [selectedModel, setSelectedModel] = useState(null);

    return (
        <label>
        Select a plane :
        <select>
          <option value="">SELECT AIRCRAFT</option>
          <option value="">C172B</option>
          <option value="">C172P</option>
          <option value="">C182T</option>
          <option value="">PA28-235</option>
        </select>
      </label>
    );
  };

export default SelectButton;
