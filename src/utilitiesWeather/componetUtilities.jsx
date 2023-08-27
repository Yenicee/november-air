import React, { useEffect, useState } from 'react';
import L from 'leaflet';

function Map() {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [pointSelectionEnabled, setPointSelectionEnabled] = useState(false);
  const [pointCounter, setPointCounter] = useState(1);
  const [altitudeCounter, setAltitudeCounter] = useState(1);

  useEffect(() => {
    const initMap = () => {
      const map = L.map('map').setView([20, 10], 3);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        maxZoom: 18
      }).addTo(map);

      map.on('click', function(event) {
        if (pointSelectionEnabled) {
          addMarker(event.latlng);
        }
      });

      setMap(map);
    };

    initMap();

    return () => {
      map.off('click');
      map.remove();
    };
  }, [pointSelectionEnabled]);

  const addMarker = (location) => {
    const marker = L.marker(location).addTo(map);
    setMarkers(prevMarkers => [...prevMarkers, marker]);

    const inputOverlay = createInputOverlay(marker);
    marker.bindPopup(inputOverlay, {
      closeButton: false,
      autoClose: false,
      closeOnClick: false
    }).openPopup();

    setCurrentPoint(marker);
  };

  const generatePointList = () => {
    const pointList = document.getElementById('pointList');
    pointList.innerHTML = '';

    const numMarkers = markers.length;
    if (numMarkers > 0) {
      const table = document.createElement('table');
      table.style.borderCollapse = 'collapse';

      const thead = document.createElement('thead');
      const headerRow = document.createElement('tr');
      const manualInputHeader1 = document.createElement('th');
      manualInputHeader1.textContent = 'FROM';
      const manualInputHeader2 = document.createElement('th');
      manualInputHeader2.textContent = 'TO';
      const distanceHeader = document.createElement('th');
      distanceHeader.textContent = 'DIST';
      const altitudeHeader = document.createElement('th');
      altitudeHeader.textContent = 'COURSE';

      headerRow.appendChild(manualInputHeader1);
      headerRow.appendChild(manualInputHeader2);
      headerRow.appendChild(distanceHeader);
      headerRow.appendChild(altitudeHeader);
      thead.appendChild(headerRow);
      table.appendChild(thead);

      const tbody = document.createElement('tbody');
      for (let i = 0; i < numMarkers - 1; i++) {
        const currentMarker = markers[i];
        const nextMarker = markers[(i + 1) % numMarkers];

        const distance = calculateDistance(currentMarker.getLatLng(), nextMarker.getLatLng());
        const bearing = calculateBearing(currentMarker.getLatLng(), nextMarker.getLatLng());

        const row = document.createElement('tr');

        const manualInputCell1 = document.createElement('td');
        manualInputCell1.style.border = '1px solid black';
        manualInputCell1.className = 'manual-input-1';
        const input1 = document.createElement('input');
        input1.type = 'text';
        input1.maxLength = 4;
        input1.value = 'Point ' + (i + 1);
        input1.style.width = '50px';
        input1.readOnly = true;
        manualInputCell1.appendChild(input1);
        row.appendChild(manualInputCell1);

        const manualInputCell2 = document.createElement('td');
        manualInputCell2.style.border = '1px solid black';
        manualInputCell2.className = 'manual-input-2';
        const input2 = document.createElement('input');
        input2.type = 'text';
        input2.maxLength = 4;
        input2.value = 'Point ' + (i + 2);
        input2.style.width = '50px';
        input2.readOnly = true;
        manualInputCell2.appendChild(input2);
        row.appendChild(manualInputCell2);

        const distanceCell = document.createElement('td');
        distanceCell.textContent = distance.toFixed(2);
        row.appendChild(distanceCell);

        const bearingCell = document.createElement('td');
        bearingCell.textContent = bearing.toFixed(0);
        row.appendChild(bearingCell);

        tbody.appendChild(row);

        setPointCounter(prevCounter => prevCounter + 1);
        setAltitudeCounter(prevCounter => prevCounter + 1);
      }
      table.appendChild(tbody);
      pointList.appendChild(table);
    }

    drawLineBetweenPoints();
    setPointSelectionEnabled(false);
    document.getElementById('markPointsBtn').disabled = false;
  };

  const calculateDistance = (latlng1, latlng2) => {
    const lat1 = latlng1.lat;
    const lon1 = latlng1.lng;
    const lat2 = latlng2.lat;
    const lon2 = latlng2.lng;

    const radlat1 = Math.PI * lat1 / 180;
    const radlat2 = Math.PI * lat2 / 180;
    const radlon1 = Math.PI * lon1 / 180;
    const radlon2 = Math.PI * lon2 / 180;

    const dlon = radlon2 - radlon1;
    const dlat = radlat2 - radlat1;
    const a = Math.sin(dlat / 2) * Math.sin(dlat / 2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.sin(dlon / 2) * Math.sin(dlon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = 6371 * c;

    return d / 1.8532;
  };

  const calculateBearing = (latlng1, latlng2) => {
    const lat1 = latlng1.lat * (Math.PI / 180);
    const lon1 = latlng1.lng * (Math.PI / 180);
    const lat2 = latlng2.lat * (Math.PI / 180);
    const lon2 = latlng2.lng * (Math.PI / 180);

    const dLon = lon2 - lon1;

    const y = Math.sin(dLon) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
    let bearing = Math.atan2(y, x);
    bearing = bearing * (180 / Math.PI);

    bearing = (bearing + 360) % 360;

    return bearing;
  };


const [markers, setMarkers] = useState([]);

  const initMap = () => {
    const map = L.map('map').setView([20, 10], 3);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 18
    }).addTo(map);

    setMap(map);
  };

  const addMarker = (location) => {
    const marker = L.marker(location).addTo(map);
    setMarkers(prevMarkers => [...prevMarkers, marker]);

    const inputOverlay = createInputOverlay(marker);
    marker.bindPopup(inputOverlay, {
      closeButton: false,
      autoClose: false,
      closeOnClick: false
    }).openPopup();
  };

  const generatePointList = () => {
    const pointList = document.getElementById('pointList');
    pointList.innerHTML = '';

    const numMarkers = markers.length;
    if (numMarkers > 0) {
      const table = document.createElement('table');
      table.style.borderCollapse = 'collapse';

      const thead = document.createElement('thead');
      const headerRow = document.createElement('tr');
      const manualInputHeader1 = document.createElement('th');
      manualInputHeader1.textContent = 'FROM';
      const manualInputHeader2 = document.createElement('th');
      manualInputHeader2.textContent = 'TO';
      const distanceHeader = document.createElement('th');
      distanceHeader.textContent = 'DIST';
      const altitudeHeader = document.createElement('th');
      altitudeHeader.textContent = 'COURSE';

      headerRow.appendChild(manualInputHeader1);
      headerRow.appendChild(manualInputHeader2);
      headerRow.appendChild(distanceHeader);
      headerRow.appendChild(altitudeHeader);
      thead.appendChild(headerRow);
      table.appendChild(thead);

      const tbody = document.createElement('tbody');
      for (let i = 0; i < numMarkers - 1; i++) {
        const currentMarker = markers[i];
        const nextMarker = markers[(i + 1) % numMarkers];

        const distance = calculateDistance(currentMarker.getLatLng(), nextMarker.getLatLng());
        const bearing = calculateBearing(currentMarker.getLatLng(), nextMarker.getLatLng());

        const row = document.createElement('tr');

        const manualInputCell1 = document.createElement('td');
        manualInputCell1.style.border = '1px solid black';
        manualInputCell1.className = 'manual-input-1';
        const input1 = document.createElement('input');
        input1.type = 'text';
        input1.maxLength = 4;
        input1.value = 'Point ' + (i + 1);
        input1.style.width = '50px';
        input1.readOnly = true;
        manualInputCell1.appendChild(input1);
        row.appendChild(manualInputCell1);

        const manualInputCell2 = document.createElement('td');
        manualInputCell2.style.border = '1px solid black';
        manualInputCell2.className = 'manual-input-2';
        const input2 = document.createElement('input');
        input2.type = 'text';
        input2.maxLength = 4;
        input2.value = 'Point ' + (i + 2);
        input2.style.width = '50px';
        input2.readOnly = true;
        manualInputCell2.appendChild(input2);
        row.appendChild(manualInputCell2);

        const distanceCell = document.createElement('td');
        distanceCell.textContent = distance.toFixed(2);
        row.appendChild(distanceCell);

        const bearingCell = document.createElement('td');
        bearingCell.textContent = bearing.toFixed(0);
        row.appendChild(bearingCell);

        tbody.appendChild(row);
      }
      table.appendChild(tbody);
      pointList.appendChild(table);
    }
  };

  const calculateDistance = (latlng1, latlng2) => {
    const lat1 = latlng1.lat;
    const lon1 = latlng1.lng;
    const lat2 = latlng2.lat;
    const lon2 = latlng2.lng;

    const radlat1 = Math.PI * lat1 / 180;
    const radlat2 = Math.PI * lat2 / 180;
    const radlon1 = Math.PI * lon1 / 180;
    const radlon2 = Math.PI * lon2 / 180;

    const dlon = radlon2 - radlon1;
    const dlat = radlat2 - radlat1;
    const a = Math.sin(dlat / 2) * Math.sin(dlat / 2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.sin(dlon / 2) * Math.sin(dlon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = 6371 * c;

    return d / 1.8532;
  };

  const calculateBearing = (latlng1, latlng2) => {
    const lat1 = latlng1.lat * (Math.PI / 180);
    const lon1 = latlng1.lng * (Math.PI / 180);
    const lat2 = latlng2.lat * (Math.PI / 180);
    const lon2 = latlng2.lng * (Math.PI / 180);

    const dLon = lon2 - lon1;

    const y = Math.sin(dLon) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
    let bearing = Math.atan2(y, x);
    bearing = bearing * (180 / Math.PI);

    bearing = (bearing + 360) % 360;

    return bearing;
  };

  return (
    <div>
      <button id="markPointsBtn" onClick={() => setPointSelectionEnabled(true)}>Enable Point Selection</button>
      <button onClick={generatePointList}>Generate Point List</button>
      <div id="map" style={{ height: '400px' }}></div>
      <table id="pointList"></table>
    </div>
  );
}
import React from 'react';

function crearInput(id, placeholder, maxLength) {
  return (
    <input
      type="text"
      id={id}
      name={id}
      placeholder={placeholder}
      maxLength={maxLength}
    />
  );
}

function limitarRumbo(event) {
  const input = event.target;
  let value = input.value.replace(/\D/g, "");

  if (value.length === 1 && value >= "0" && value <= "9") {
    input.value = value;
  } else if (value.length === 2 && value >= "00" && value <= "99") {
    input.value = value;
  } else if (value.length === 3) {
    const firstDigit = parseInt(value.charAt(0));
    const secondDigit = parseInt(value.charAt(1));
    const thirdDigit = parseInt(value.charAt(2));

    if (firstDigit === 3 && secondDigit === 6 && thirdDigit === 0) {
      input.value = value;
    } else if (
      firstDigit === 3 &&
      secondDigit >= 1 &&
      secondDigit <= 5 &&
      thirdDigit >= 0 &&
      thirdDigit <= 9
    ) {
      input.value = value;
    } else if (
      firstDigit >= 0 &&
      firstDigit <= 2 &&
      secondDigit >= 0 &&
      secondDigit <= 9 &&
      thirdDigit >= 0 &&
      thirdDigit <= 9
    ) {
      input.value = value;
    } else {
      input.value = input.value.slice(0, value.length - 1);
    }
  } else {
    input.value = input.value.slice(0, value.length - 1);
  }
}

function limitarA180(event) {
    const input = event.target;
    let value = input.value.replace(/\D/g, "");
  
    const truncatedValue = value.slice(0, 3);
  
    const firstDigit = parseInt(truncatedValue.charAt(0));
    const secondDigit = parseInt(truncatedValue.charAt(1));
    const thirdDigit = parseInt(truncatedValue.charAt(2));
  
    if (isNaN(firstDigit)) {
      input.value = "";
    } else if (firstDigit === 1) {
      if (isNaN(secondDigit)) {
        input.value = "1";
      } else if (secondDigit === 8) {
        if (isNaN(thirdDigit)) {
          input.value = "18";
        } else if (thirdDigit === 0) {
          input.value = "180";
        } else {
          input.value = truncatedValue.slice(0, 2);
        }
      } else if (secondDigit >= 0 && secondDigit <= 7) {
        if (isNaN(thirdDigit) || (thirdDigit >= 0 && thirdDigit <= 9)) {
          input.value = truncatedValue;
        } else {
          input.value = truncatedValue.slice(0, 2);
        }
      } else {
        input.value = truncatedValue.slice(0, 1);
      }
    } else if (firstDigit === 0) {
      if (isNaN(secondDigit) || (secondDigit >= 0 && secondDigit <= 9)) {
        if (isNaN(thirdDigit) || (thirdDigit >= 0 && thirdDigit <= 9)) {
          input.value = truncatedValue;
        } else {
          input.value = truncatedValue.slice(0, 2);
        }
      } else {
        input.value = truncatedValue.slice(0, 1);
      }
    } else if (firstDigit >= 2 && firstDigit <= 9) {
      if (isNaN(secondDigit)) {
        input.value = truncatedValue;
      } else if (secondDigit >= 0 && secondDigit <= 9) {
        if (!isNaN(thirdDigit)) {
          input.value = truncatedValue.slice(0, 2);
        }
      } else {
        input.value = truncatedValue.slice(0, 1);
      }
    } else {
      input.value = "";
    }
  }

  function limitarA35() {
    const inputElement = document.getElementById("wind-int");
    const inputValue = inputElement.value.trim();
  
    // Verificar si el valor ingresado es un solo número o está vacío
    if (!/^[0-9]*$/.test(inputValue)) {
      // Si no cumple la condición, limpiar el valor del input
      inputElement.value = "";
      return;
    }
  
    // Obtener el primer número ingresado
    const firstDigit = parseInt(inputValue.charAt(0), 10);
  
    // Si el primer número es cero, uno o dos, permitir hasta dos dígitos
    if (firstDigit === 0 || firstDigit === 1 || firstDigit === 2) {
      // Limitar la longitud del valor a dos dígitos
      inputElement.value = inputValue.slice(0, 2);
    }
  
    // Si el primer número es tres, permitir hasta dos dígitos
    if (firstDigit === 3) {
      // Limitar la longitud del valor a dos dígitos
      inputElement.value = inputValue.slice(0, 2);
  
      // Obtener el segundo número ingresado
      const secondDigit = parseInt(inputValue.charAt(1), 10);
  
      // Si el segundo número es mayor a cinco o no es un número válido, eliminarlo del input
      if (secondDigit > 5 || isNaN(secondDigit)) {
        inputElement.value = inputValue.charAt(0);
      }
    }
  
    // Si el primer número es mayor a tres (4 al 9), limitar el valor a un solo dígito
    if (firstDigit > 3) {
      inputElement.value = inputValue.charAt(0);
    }
  }
  
  function validarNumeroPositivo() {
    const inputElement = document.getElementById("dist");
    const inputValue = inputElement.value.trim();
  
    // Verificar si el valor ingresado es un número positivo
    if (!/^[0-9]+(\.[0-9]*)?$/.test(inputValue)) {
      // Si no es un número positivo, limpiar el valor del input
      inputElement.value = "";
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    const selectElement = document.getElementById("temp-option");
  
    // Agregar opciones desde 50°C hasta -80°C en orden descendente
    for (let temp = 50; temp >= -80; temp--) {
      const option = document.createElement("option");
      option.value = `M${temp}-option`;
      option.textContent = `${temp}°C`;
      selectElement.appendChild(option);
    }
  });
  
  document.addEventListener("DOMContentLoaded", function () {
    const selectElement = document.getElementById("altitude-option");
  
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
  });

  function CrearEstructura() {
    const [numFilas, setNumFilas] = useState(0);
  
    const handleNumFilasChange = (event) => {
      const value = parseInt(event.target.value);
      setNumFilas(value);
    };
  
    const crearInput = (id, label) => {
      return (
        <div>
          <label htmlFor={id}>{label}</label>
          <input type="text" id={id} />
        </div>
      );
    };
  
    const validatePositiveNumber = (event) => {
      const value = parseFloat(event.target.value);
      if (isNaN(value) || value <= 0) {
        alert("Ingrese un número válido mayor a 0.");
      }
    };
  
    const limitarRumbo = (event) => {
      const value = parseInt(event.target.value);
      if (value < 0) {
        event.target.value = 0;
      } else if (value > 360) {
        event.target.value = 360;
      }
    };
  
    const limitarA35 = (event) => {
      const value = parseInt(event.target.value);
      if (value > 35) {
        event.target.value = 35;
      }
    };
  
    const limitarA180 = (event) => {
      const value = parseInt(event.target.value);
      if (value > 180) {
        event.target.value = 180;
      }
    };
  
    const handleFormSubmit = (event) => {
      event.preventDefault();
      if (isNaN(numFilas) || numFilas <= 0) {
        alert("Ingrese un número válido mayor a 0.");
        return;
      }
  
      // Lógica para crear la estructura
    };
  
    return (
      <div>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="numFilas">Número de Filas:</label>
          <input
            type="number"
            id="numFilas"
            value={numFilas}
            onChange={handleNumFilasChange}
          />
          <button type="submit">Crear Estructura</button>
        </form>
  
        {Array.from({ length: numFilas }).map((_, i) => (
          <div key={i} className="NAV-LOG">
            <div className="check-points-container">
              {crearInput(`from-${i}`, "DESDE")}
              {crearInput(`to-${i}`, "HASTA")}
            </div>
            <div className="arrow-container">
              <p id="arrow" name="arrow" style={{ fontSize: "30px", marginTop: "0px", marginBottom: "0px" }}>
                ➤
              </p>
            </div>
            <div className="dist-tc-container">
              {crearInput(`dist-${i}`, "Dist nm")}
              {crearInput(`tc-${i}`, "TC")}
            </div>
            <div className="alt-container">
              <select id={`altitude-option-${i}`}>
                <option value="" disabled selected>
                  Alt
                </option>
                {Array.from({ length: 40 }, (_, j) => (
                  <option key={j} value={`A${(j + 1) * 500}-option`}>
                    {(j + 1) * 500} FT
                  </option>
                ))}
                {Array.from({ length: 20 }, (_, j) => (
                  <option key={j} value={`A${20000 + (j + 1) * 1000}-option`}>
                    {20000 + (j + 1) * 1000} FT
                  </option>
                ))}
              </select>
              <select id={`altimeter-option-${i}`}>
                <option value="" disabled selected>
                  ALT
                </option>
                <option value="qnh-option">QNH</option>
                <option value="qne-option">QNE</option>
              </select>
            </div>
            <div className="wind-container">
              {crearInput(`wind-dir-${i}`, "DIR")}
              {crearInput(`wind-int-${i}`, "INT")}
            </div>
            <div className="temp-container">
              <select id={`temp-option-${i}`}>
                <option value="" disabled selected>
                  Temp
                </option>
                {Array.from({ length: 131 }, (_, j) => (
                  <option key={j} value={`M${50 - j}-option`}>
                    {50 - j}°C
                  </option>
                ))}
              </select>
            </div>
            <div className="isogonic-line-container">
              {crearInput(`isogonic-line-${i}`, "ISO LINE")}
              <select id={`isogonic-line-option-${i}`}>
                <option value="" disabled selected>
                  VAR
                </option>
                <option value="west-option">WEST VAR</option>
                <option value="east-option">EAST VAR</option>
              </select>
            </div>
            <div className="tas-container">
              {crearInput(`tas-${i}`, "TAS")}
            </div>
            <div className="mc-wca-container">
              {crearInput(`mc-${i}`, "MC")}
              {crearInput(`wca-${i}`, "WCA")}
            </div>
            <div className="mh-dev-container">
              {crearInput(`mh-${i}`, "MH")}
              {crearInput(`dev-${i}`, "DEV")}
            </div>
            <div className="ch-container">
              {crearInput(`ch-${i}`, "CH")}
            </div>
            <div className="leg-rem-container">
              {crearInput(`leg-${i}`, "LEG")}
              {crearInput(`rem-${i}`, "REM")}
            </div>
            <div className="gs-container">
              {crearInput(`gs-${i}`, "GS EST")}
              {crearInput(`gs-act-${i}`, "GS ACT")}
            </div>
            <div className="ete-ate-container">
              {crearInput(`ete-${i}`, "ETE")}
              {crearInput(`ate-${i}`, "ATE")}
            </div>
            <div className="eta-ata-container">
              {crearInput(`eta-${i}`, "ETA")}
              {crearInput(`ata-${i}`, "ATA")}
            </div>
            <div className="fuel-rem-container">
              {crearInput(`fuel-${i}`, "Fuel")}
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  function CrearEstructura() {
    const [numFilas, setNumFilas] = useState(0);
  
    const handleNumFilasChange = (event) => {
      const value = parseInt(event.target.value);
      setNumFilas(value);
    };
  
    const crearInput = (id, label) => {
      return (
        <div>
          <label htmlFor={id}>{label}</label>
          <input type="text" id={id} />
        </div>
      );
    };
  
    const validatePositiveNumber = (event) => {
      const value = parseFloat(event.target.value);
      if (isNaN(value) || value <= 0) {
        alert("Ingrese un número válido mayor a 0.");
      }
    };
  
    const limitarRumbo = (event) => {
      const value = parseInt(event.target.value);
      if (value < 0) {
        event.target.value = 0;
      } else if (value > 360) {
        event.target.value = 360;
      }
    };
  
    const limitarA35 = (event) => {
      const value = parseInt(event.target.value);
      if (value > 35) {
        event.target.value = 35;
      }
    };
  
    const limitarA180 = (event) => {
      const value = parseInt(event.target.value);
      if (value > 180) {
        event.target.value = 180;
      }
    };
  
    const handleFormSubmit = (event) => {
      event.preventDefault();
      if (isNaN(numFilas) || numFilas <= 0) {
        alert("Ingrese un número válido mayor a 0.");
        return;
      }
  
      const contenedor = document.getElementById("contenedor");
      contenedor.innerHTML = "";
  
      for (let i = 0; i < numFilas; i++) {
        const navLogContainer = document.createElement("div");
        navLogContainer.className = "NAV-LOG";
  
        const checkPointsContainer = document.createElement("div");
        checkPointsContainer.className = "check-points-container";
        const fromInput = crearInput(`from-${i}`, "FROM");
        const toInput = crearInput(`to-${i}`, "TO");
        checkPointsContainer.appendChild(fromInput);
        checkPointsContainer.appendChild(toInput);
  
        const arrowContainer = document.createElement("div");
        arrowContainer.className = "arrow-container";
        const arrowP = document.createElement("p");
        arrowP.id = "arrow";
        arrowP.name = "arrow";
        arrowP.style.fontSize = "30px";
        arrowP.style.marginTop = "0px";
        arrowP.style.marginBottom = "0px";
        arrowP.textContent = "➤";
        arrowContainer.appendChild(arrowP);
        const distTCContainer = document.createElement("div");
        distTCContainer.className = "dist-tc-container";
        const distInput = crearInput(`dist-${i}`, "Dist nm");
        distInput.oninput = validatePositiveNumber;
        const tcInput = crearInput(`tc-${i}`, "TC");
        tcInput.oninput = limitarRumbo;
        distTCContainer.appendChild(distInput);
        distTCContainer.appendChild(tcInput);
  
        const altContainer = document.createElement("div");
        altContainer.className = "alt-container";
        const altitudeOption = document.createElement("select");
        altitudeOption.id = "altitude-option";
        const defaultAltOption = document.createElement("option");
        defaultAltOption.value = "";
        defaultAltOption.disabled = true;
        defaultAltOption.selected = true;
        defaultAltOption.textContent = "Alt";
        altitudeOption.appendChild(defaultAltOption);
        for (let altitude = 500; altitude <= 19500; altitude += 500) {
          const altOption = document.createElement("option");
          altOption.value = `A${altitude}-option`;
          altOption.textContent = `${altitude} FT`;
          altitudeOption.appendChild(altOption);
        }
        for (let altitude = 20000; altitude <= 40000; altitude += 1000) {
          const altOption = document.createElement("option");
          altOption.value = `A${altitude}-option`;
          altOption.textContent = `${altitude} FT`;
          altitudeOption.appendChild(altOption);
        }
        altContainer.appendChild(altitudeOption);
  
        const altimeterOption = document.createElement("select");
        altimeterOption.id = "altimeter-option";
        const defaultAltimeterOption = document.createElement("option");
        defaultAltimeterOption.value = "";
        defaultAltimeterOption.disabled = true;
        defaultAltimeterOption.selected = true;
        defaultAltimeterOption.textContent = "ALT";
        altimeterOption.appendChild(defaultAltimeterOption);
  
        const qnhOption = document.createElement("option");
        qnhOption.value = "qnh-option";
        qnhOption.textContent = "QNH";
        altimeterOption.appendChild(qnhOption);
  
        const qneOption = document.createElement("option");
        qneOption.value = "qne-option";
        qneOption.textContent = "QNE";
        altimeterOption.appendChild(qneOption);
  
        altContainer.appendChild(altimeterOption);
  
        const windContainer = document.createElement("div");
        windContainer.className = "wind-container";
        const windDirInput = crearInput(`wind-dir-${i}`, "DIR");
        const windIntInput = crearInput(`wind-int-${i}`, "INT");
        windIntInput.oninput = limitarA35;
        windContainer.appendChild(windDirInput);
        windContainer.appendChild(windIntInput);
  
        const tempContainer = document.createElement("div");
        tempContainer.className = "temp-container";
        const tempOption = document.createElement("select");
        tempOption.id = "temp-option";
        const defaultTempOption = document.createElement("option");
        defaultTempOption.value = "";
        defaultTempOption.disabled = true;
        defaultTempOption.selected = true;
        defaultTempOption.textContent = "Temp";
        tempOption.appendChild(defaultTempOption);
        for (let temp = 50; temp >= -80; temp--) {
          const tempItem = document.createElement("option");
          tempItem.value = `M${temp}-option`;
          tempItem.textContent = `${temp}°C`;
          tempOption.appendChild(tempItem);
        }
        tempContainer.appendChild(tempOption);
  
        const isogonicLineContainer = document.createElement("div");
        isogonicLineContainer.className = "isogonic-line-container";
        const isogonicLineInput = crearInput(`isogonic-line-${i}`, "ISO LINE");
        isogonicLineInput.oninput = limitarA180;
        isogonicLineContainer.appendChild(isogonicLineInput);
  
        const isogonicLineOption = document.createElement("select");
        isogonicLineOption.id = "isogonic-line-option";
        const defaultIsogonicLineOption = document.createElement("option");
        defaultIsogonicLineOption.value = "";
        defaultIsogonicLineOption.disabled = true;
        defaultIsogonicLineOption.selected = true;
        defaultIsogonicLineOption.textContent = "VAR";
        isogonicLineOption.appendChild(defaultIsogonicLineOption);
  
        const westOption = document.createElement("option");
        westOption.value = "west-option";
        westOption.textContent = "WEST VAR";
        isogonicLineOption.appendChild(westOption);
  
        const eastOption = document.createElement("option");
        eastOption.value = "east-option";
        eastOption.textContent = "EAST VAR";
        isogonicLineOption.appendChild(eastOption);
  
        isogonicLineContainer.appendChild(isogonicLineOption);
  
        const tasContainer = document.createElement("div");
        tasContainer.className = "tas-container";
        const tasInput = crearInput(`tas-${i}`, "TAS");
        tasInput.readOnly = true;
        tasContainer.appendChild(tasInput);
  
        const mcWcaContainer = document.createElement("div");
        mcWcaContainer.className = "mc-wca-container";
        const mcInput = crearInput(`mc-${i}`, "MC");
        mcInput.readOnly = true;
        const wcaInput = crearInput(`wca-${i}`, "WCA");
        wcaInput.readOnly = true;
        mcWcaContainer.appendChild(mcInput);
        mcWcaContainer.appendChild(wcaInput);
  
        const mhDevContainer = document.createElement("div");
        mhDevContainer.className = "mh-dev-container";
        const mhInput = crearInput(`mh-${i}`, "MH");
        mhInput.readOnly = true;
        const devInput = crearInput(`dev-${i}`, "DEV");
        devInput.readOnly = true;
        mhDevContainer.appendChild(mhInput);
        mhDevContainer.appendChild(devInput);
  
        const chContainer = document.createElement("div");
        chContainer.className = "ch-container";
        const chInput = crearInput(`ch-${i}`, "CH");
        chInput.readOnly = true;
        chContainer.appendChild(chInput);
  
        const legRemContainer = document.createElement("div");
        legRemContainer.className = "leg-rem-container";
        const legInput = crearInput(`leg-${i}`, "LEG");
        legInput.readOnly = true;
        const remInput = crearInput(`rem-${i}`, "REM");
        remInput.readOnly = true;
        legRemContainer.appendChild(legInput);
        legRemContainer.appendChild(remInput);
  
        const gsContainer = document.createElement("div");
        gsContainer.className = "gs-container";
        const gsInput = crearInput(`gs-${i}`, "GS EST");
        gsInput.readOnly = true;
        const gsActInput = crearInput(`gs-act-${i}`, "GS ACT");
        gsActInput.readOnly = true;
        gsContainer.appendChild(gsInput);
        gsContainer.appendChild(gsActInput);
  
        const eteAteContainer = document.createElement("div");
        eteAteContainer.className = "ete-ate-container";
        const eteInput = crearInput(`ete-${i}`, "ETE");
        eteInput.readOnly = true;
        const ateInput = crearInput(`ate-${i}`, "ATE");
        ateInput.readOnly = true;
        eteAteContainer.appendChild(eteInput);
        eteAteContainer.appendChild(ateInput);
  
        const etaAtaContainer = document.createElement("div");
        etaAtaContainer.className = "eta-ata-container";
        const etaInput = crearInput(`eta-${i}`, "ETA");
        etaInput.readOnly = true;
        const ataInput = crearInput(`ata-${i}`, "ATA");
        ataInput.readOnly = true;
        etaAtaContainer.appendChild(etaInput);
        etaAtaContainer.appendChild(ataInput);
  
        const fuelRemContainer = document.createElement("div");
        fuelRemContainer.className = "fuel-rem-container";
        const fuelInput = crearInput(`fuel-${i}`, "FUEL");
        fuelInput.oninput = validatePositiveNumber;
        const remFuelInput = crearInput(`rem-fuel-${i}`, "REM");
        remFuelInput.readOnly = true;
        fuelRemContainer.appendChild(fuelInput);
        fuelRemContainer.appendChild(remFuelInput);
  
        navLogContainer.appendChild(checkPointsContainer);
        navLogContainer.appendChild(arrowContainer);
        navLogContainer.appendChild(distTCContainer);
        navLogContainer.appendChild(altContainer);
        navLogContainer.appendChild(windContainer);
        navLogContainer.appendChild(tempContainer);
        navLogContainer.appendChild(isogonicLineContainer);
        navLogContainer.appendChild(tasContainer);
        navLogContainer.appendChild(mcWcaContainer);
        navLogContainer.appendChild(mhDevContainer);
        navLogContainer.appendChild(chContainer);
        navLogContainer.appendChild(legRemContainer);
        navLogContainer.appendChild(gsContainer);
        navLogContainer.appendChild(eteAteContainer);
        navLogContainer.appendChild(etaAtaContainer);
        navLogContainer.appendChild(fuelRemContainer);
  
        contenedor.appendChild(navLogContainer);
      }
    };
  
    return (
      <div>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="numFilas">Número de Filas:</label>
          <input
            type="number"
            id="numFilas"
            value={numFilas}
            onChange={handleNumFilasChange}
          />
          <button type="submit">Crear Estructura</button>
        </form>
        <div id="contenedor"></div>
        <div id="pointList">
                <table style={{ borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th>FROM</th>
                            <th>TO</th>
                            <th>DIST</th>
                            <th>COURSE</th>
                            <th>ALT</th>
                             <th>ALT SET</th>
                             <th>PRESS</th>
                             <th>TEMP</th>
                             <th>WDIR</th>
                             <th>INT</th>
                             <th>ISO LINE</th>
                             <th>VAR</th>
                             <th>TAS</th>
                             <th>MC</th>
                             <th>WCA</th>
                             <th>MH</th>
                             <th>DEV</th>
                             <th>CH</th>
                             <th>LEGE</th>


                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            </div>
      </div>
    );
  }
  
 

export default Map;      








