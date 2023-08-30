import { useEffect, useState } from "react";

function CrearInput(id, placeholder, maxLength,name,type, value) {

  // Agregar opciones desde 500 FT hasta 19500 FT de 500 en 500
  for (let altitude = 500; altitude <= 19500; altitude += 500) {
    const option = document.createElement("option");
    option.value = `A${altitude}-option`;
    option.textContent = `${altitude} FT`;
    selectElement.appendChild(option);
  }

  // Agregar opciones desde 20000 FT en adelante de 1000 en 1000
  for (let altitude = 20000; altitude <= 40000; altitude += 1000) {
    const option = document.createElement("option");
    option.value = `A${altitude}-option`;
    option.textContent = `${altitude} FT`;
    selectElement.appendChild(option);
  }




    return (
      <input
        type="text"
        name={name}
        id={id}
        value={weatherData}
        onChange={null}
        placeholder={placeholder}
        maxLength={maxLength}
      />
    );
  }
  
  
  export default CrearInput;