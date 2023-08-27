import { useEffect, useState } from "react";

function CrearInput(id, placeholder, maxLength,name,type, value) {
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