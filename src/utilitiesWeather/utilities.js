

 

<body>

  <div class="title-container">
        <h2 class="title">PLAN YOUR FLIGHT</h2>
        <div class="button-container">
            <button id="markPointsBtn" onclick="enablePointSelection()">Marcar puntos</button>
            <button id="generateListBtn" onclick="generatePointList()">Generar lista de puntos</button>
        </div>
    </div>
    <div id="map"></div>
    <ul id="pointList"></ul>





 <script >

        var map;
        var markers = [];
        var pointSelectionEnabled = false;
        var pointCounter = 1;
        var altitudeCounter = 1;

        function initMap() {
            map = L.map('map').setView([20, 10], 3);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
                maxZoom: 18
            }).addTo(map);

            map.on('click', function(event) {
                if (pointSelectionEnabled) {
                    addMarker(event.latlng);
                }
            });
        }

        function addMarker(location) {
            var marker = L.marker(location).addTo(map);
            markers.push(marker);

            var inputOverlay = createInputOverlay(marker);
            marker.bindPopup(inputOverlay, {
                closeButton: false, // Deshabilitar el botón de cierre
                autoClose: false, // Mantener abierto el popup
                closeOnClick: false // No cerrar al hacer clic en el mapa
            }).openPopup();
            currentPoint = marker;
        }

        function updatePointName(marker, name) {
            var pointList = document.getElementById('pointList');
            var markerIndex = markers.indexOf(marker);
            if (markerIndex > -1) {
                var listItem = pointList.children[markerIndex];
                var manualInputCell1 = listItem.querySelector('.manual-input-1');
                var manualInputCell2 = listItem.querySelector('.manual-input-2');

                manualInputCell1.textContent = name;
                manualInputCell2.textContent = name;

                currentPoint = null; // Reinicia la variable currentPoint después de actualizar los campos
            }
        }

        function enablePointSelection() {
            pointSelectionEnabled = true;
            document.getElementById('markPointsBtn').disabled = true;
        }

        function calculateDistance(latlng1, latlng2) {
            var lat1 = latlng1.lat;
            var lon1 = latlng1.lng;
            var lat2 = latlng2.lat;
            var lon2 = latlng2.lng;

            // Conversión de grados a radianes
            var radlat1 = Math.PI * lat1 / 180;
            var radlat2 = Math.PI * lat2 / 180;
            var radlon1 = Math.PI * lon1 / 180;
            var radlon2 = Math.PI * lon2 / 180;

            // Fórmula de Haversine
            var dlon = radlon2 - radlon1;
            var dlat = radlat2 - radlat1;
            var a = Math.sin(dlat / 2) * Math.sin(dlat / 2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.sin(dlon / 2) * Math.sin(dlon / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = 6371 * c; // Radio de la Tierra en kilómetros

            return d / 1.8532;
        }

         function calculateBearing(latlng1, latlng2) {
            var lat1 = latlng1.lat * (Math.PI / 180);
            var lon1 = latlng1.lng * (Math.PI / 180);
            var lat2 = latlng2.lat * (Math.PI / 180);
            var lon2 = latlng2.lng * (Math.PI / 180);   

            var dLon = lon2 - lon1;

            var y = Math.sin(dLon) * Math.cos(lat2);
            var x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
            var bearing = Math.atan2(y, x);
            bearing = bearing * (180 / Math.PI); // Convertir a grados

            // Asegurar que el rumbo esté en el rango de 0 a 360 grados
            bearing = (bearing + 360) % 360;

            return bearing;
        }

        function drawLineBetweenPoints() {
            var numMarkers = markers.length;
            if (numMarkers > 1) {
                for (var i = 0; i < numMarkers - 1; i++) {
                    var currentMarker = markers[i];
                    var nextMarker = markers[i + 1];

                    var line = L.polyline([currentMarker.getLatLng(), nextMarker.getLatLng()], {
                        color: 'red'
                    }).addTo(map);
                }
            }
        }

        function generatePointList() {
            var pointList = document.getElementById('pointList');
            pointList.innerHTML = '';

            var numMarkers = markers.length;
            if (numMarkers > 0) {
                // Crear la tabla
                var table = document.createElement('table');
                table.style.borderCollapse = 'collapse'; // Colapsar los bordes de la tabla

                // Encabezados de columna
                var thead = document.createElement('thead');
                var headerRow = document.createElement('tr');
                var manualInputHeader1 = document.createElement('th');
                manualInputHeader1.textContent = 'FROM';
                var manualInputHeader2 = document.createElement('th');
                manualInputHeader2.textContent = 'TO';
                var distanceHeader = document.createElement('th');
                distanceHeader.textContent = 'DIST';
                var altitudeHeader = document.createElement('th');
                altitudeHeader.textContent = 'COURSE';

                headerRow.appendChild(manualInputHeader1);
                headerRow.appendChild(manualInputHeader2);
                headerRow.appendChild(distanceHeader);
                headerRow.appendChild(altitudeHeader);
                thead.appendChild(headerRow);
                table.appendChild(thead);

                // Cuerpo de la tabla
                var tbody = document.createElement('tbody');
                for (var i = 0; i < numMarkers - 1; i++) {
                    var currentMarker = markers[i];
                    var nextMarker = markers[(i + 1) % numMarkers];

                    var distance = calculateDistance(currentMarker.getLatLng(), nextMarker.getLatLng());
                    var bearing = calculateBearing(currentMarker.getLatLng(), nextMarker.getLatLng());

                    var row = document.createElement('tr');

                    // Celda de entrada manual 1
                    var manualInputCell1 = document.createElement('td');
                    manualInputCell1.style.border = '1px solid black'; // Agregar borde a la celda
                    manualInputCell1.className = 'manual-input-1';
                    var input1 = document.createElement('input');
                    input1.type = 'text';
                    input1.maxLength = 4; // Limitar a 4 caracteres
                    input1.value = 'Point ' + (i + 1);
                    input1.style.width = '50px'; // Definir ancho del input
                    input1.readOnly = true; // Hacer el input de solo lectura
                    manualInputCell1.appendChild(input1);
                    row.appendChild(manualInputCell1);

                    // Celda de entrada manual 2
                    var manualInputCell2 = document.createElement('td');
                    manualInputCell2.style.border = '1px solid black'; // Agregar borde a la celda
                    manualInputCell2.className = 'manual-input-2';
                    var input2 = document.createElement('input');
                    input2.type = 'text';
                    input2.maxLength = 4; // Limitar a 4 caracteres
                    input2.value = 'Point ' + (i + 2);
                    input2.style.width = '50px'; // Definir ancho del input
                    input2.readOnly = true; // Hacer el input de solo lectura
                    manualInputCell2.appendChild(input2);
                    row.appendChild(manualInputCell2);

                    // Celda de distancia
                    var distanceCell = document.createElement('td');
                    distanceCell.textContent = distance.toFixed(2); // Mostrar distancia con 2 decimales
                    row.appendChild(distanceCell);

                    // Celda de rumbo
                    var bearingCell = document.createElement('td');
                    bearingCell.textContent = bearing.toFixed(0); // Mostrar rumbo sin decimales
                    row.appendChild(bearingCell);

                    tbody.appendChild(row);

                    pointCounter++;
                    altitudeCounter++;
                }
                table.appendChild(tbody);
                pointList.appendChild(table);
            }

            drawLineBetweenPoints();
            pointSelectionEnabled = false;
            document.getElementById('markPointsBtn').disabled = false;
        }

        document.addEventListener('DOMContentLoaded', function() {
            initMap();
        });
    </script>
      
  <label for="numFilas">NUMBER OF LEGS</label>
  <input type="number" id="numFilas">
  <button onclick="crearEstructura()">GENERATE</button>

  <div id="contenedor"></div>

  <script>

    function crearInput(id, placeholder, maxLength) {
      var input = document.createElement("input");
      input.type = "text";
      input.id = id;
      input.name = id;
      input.placeholder = placeholder;
      if (maxLength) {
        input.maxLength = maxLength;
      }
      return input;
    }

    function limitarRumbo(event) {
      const input = event.target;
      const value = input.value.replace(/\D/g, ""); // Eliminar todos los caracteres no numéricos

      if (value.length === 1 && value >= "0" && value <= "9") {
        // Un solo dígito del 0 al 9
        input.value = value;
      } else if (value.length === 2 && value >= "00" && value <= "99") {
        // Dos dígitos del 0 al 9
        input.value = value;
      } else if (value.length === 3) {
        const firstDigit = parseInt(value.charAt(0));
        const secondDigit = parseInt(value.charAt(1));
        const thirdDigit = parseInt(value.charAt(2));

        if (firstDigit === 3 && secondDigit === 6 && thirdDigit === 0) {
          // Primer dígito es 3, segundo dígito es 6, tercer dígito es 0
          input.value = value;
        } else if (
          firstDigit === 3 &&
          secondDigit >= 1 &&
          secondDigit <= 5 &&
          thirdDigit >= 0 &&
          thirdDigit <= 9
        ) {
          // Primer dígito es 3, segundo dígito del 1 al 5, tercer dígito del 0 al 9
          input.value = value;
        } else if (
          firstDigit >= 0 &&
          firstDigit <= 2 &&
          secondDigit >= 0 &&
          secondDigit <= 9 &&
          thirdDigit >= 0 &&
          thirdDigit <= 9
        ) {
          // Primer dígito del 0 al 2, segundo y tercer dígito del 0 al 9
          input.value = value;
        } else {
          // Valor inválido, no se permite seguir escribiendo
          input.value = input.value.slice(0, value.length - 1);
        }
      } else {
        // Valor inválido, no se permite seguir escribiendo
        input.value = input.value.slice(0, value.length - 1);
      }
    }

    function limitTo180(event) {
      const input = event.target;
      const value = input.value.replace(/\D/g, ""); // Eliminar todos los caracteres no numéricos

      // Limitar a tres dígitos
      const truncatedValue = value.slice(0, 3);

      const firstDigit = parseInt(truncatedValue.charAt(0));
      const secondDigit = parseInt(truncatedValue.charAt(1));
      const thirdDigit = parseInt(truncatedValue.charAt(2));

      if (isNaN(firstDigit)) {
        input.value = ""; // Campo vacío o sin números
      } else if (firstDigit === 1) {
        if (isNaN(secondDigit)) {
          input.value = "1"; // Solo el primer dígito es 1
        } else if (secondDigit === 8) {
          if (isNaN(thirdDigit)) {
            input.value = "18"; // Segundo dígito es 8, tercer dígito puede ser del 0 al 9
          } else if (thirdDigit === 0) {
            input.value = "180"; // Tercer dígito solo puede ser 0
          } else {
            // Tercer dígito inválido, eliminar
            input.value = truncatedValue.slice(0, 2); // Limitar a 2 dígitos
          }
        } else if (secondDigit >= 0 && secondDigit <= 7) {
          if (isNaN(thirdDigit) || (thirdDigit >= 0 && thirdDigit <= 9)) {
            input.value = truncatedValue; // Tercer dígito puede ser del 0 al 9
          } else {
            // Tercer dígito inválido, eliminar
            input.value = truncatedValue.slice(0, 2); // Limitar a 2 dígitos
          }
        } else {
          // Segundo dígito inválido, eliminar
          input.value = truncatedValue.slice(0, 1); // Limitar a 1 dígito
        }
      } else if (firstDigit === 0) {
        if (isNaN(secondDigit) || (secondDigit >= 0 && secondDigit <= 9)) {
          if (isNaN(thirdDigit) || (thirdDigit >= 0 && thirdDigit <= 9)) {
            input.value = truncatedValue; // Segundo y tercer dígito pueden ser del 0 al 9
          } else {
            // Tercer dígito inválido, eliminar
            input.value = truncatedValue.slice(0, 2); // Limitar a 2 dígitos
          }
        } else {
          // Segundo dígito inválido, eliminar
          input.value = truncatedValue.slice(0, 1); // Limitar a 1 dígito
        }
      } else if (firstDigit >= 2 && firstDigit <= 9) {
        if (isNaN(secondDigit)) {
          input.value = truncatedValue; // Primer dígito del 2 al 9
        } else if (secondDigit >= 0 && secondDigit <= 9) {
          if (!isNaN(thirdDigit)) {
            input.value = truncatedValue.slice(0, 2); // Segundo dígito del 0 al 9, tercer dígito inválido, eliminar
          }
        } else {
          // Segundo dígito inválido, eliminar
          input.value = truncatedValue.slice(0, 1); // Limitar a 1 dígito
        }
      } else {
        input.value = ""; // Primer dígito inválido, eliminar
      }
    }

    //LIMITAR NUMERO DEL 0 AL 35
    function limitTo35() {
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

    function validatePositiveNumber() {
      const inputElement = document.getElementById("dist");
      const inputValue = inputElement.value.trim();

      // Verificar si el valor ingresado es un número positivo
      if (!/^[0-9]+(\.[0-9]*)?$/.test(inputValue)) {
        // Si no es un número positivo, limpiar el valor del input
        inputElement.value = "";
      }
    }

    //TEMPERATURAS DE 50 GRADOS A -80 GRADOS
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

     //ALTITUDES DE 500 FT A 40000 FT
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

    function crearEstructura() {
      const numFilas = parseInt(document.getElementById("numFilas").value);

      if (isNaN(numFilas) || numFilas <= 0) {
        alert("Ingrese un número válido mayor a 0.");
        return;
      }

      const contenedor = document.getElementById("contenedor");
      contenedor.innerHTML = "";

      for (let i = 0; i < numFilas; i++) {
        var navLogContainer = document.createElement("div");
        navLogContainer.className = "NAV-LOG";

        var checkPointsContainer = document.createElement("div");
        checkPointsContainer.className = "check-points-container";
        var fromInput = crearInput(`from-${i}`, "FROM");
        var toInput = crearInput(`to-${i}`, "TO");
        checkPointsContainer.appendChild(fromInput);
        checkPointsContainer.appendChild(toInput);

        var arrowContainer = document.createElement("div");
        arrowContainer.className = "arrow-container";
        var arrowP = document.createElement("p");
        arrowP.id = "arrow";
        arrowP.name = "arrow";
        arrowP.style.fontSize = "30px";
        arrowP.style.marginTop = "0px";
        arrowP.style.marginBottom = "0px";
        arrowP.textContent = "➤";
        arrowContainer.appendChild(arrowP);

        var distTCContainer = document.createElement("div");
        distTCContainer.className = "dist-tc-container";
        var distInput = crearInput(`dist-${i}`, "Dist nm");
        distInput.oninput = validatePositiveNumber;
        var tcInput = crearInput(`tc-${i}`, "TC");
        tcInput.oninput = limitarRumbo;
        distTCContainer.appendChild(distInput);
        distTCContainer.appendChild(tcInput);

        var altContainer = document.createElement("div");
        altContainer.className = "alt-container";
        var altitudeOption = document.createElement("select");
        altitudeOption.id = "altitude-option";
        var defaultAltOption = document.createElement("option");
        defaultAltOption.value = "";
        defaultAltOption.disabled = true;
        defaultAltOption.selected = true;
        defaultAltOption.textContent = "Alt";
        altitudeOption.appendChild(defaultAltOption);
        for (let altitude = 500; altitude <= 19500; altitude += 500) {
          var altOption = document.createElement("option");
          altOption.value = `A${altitude}-option`;
          altOption.textContent = `${altitude} FT`;
          altitudeOption.appendChild(altOption);
        }
        for (let altitude = 20000; altitude <= 40000; altitude += 1000) {
          var altOption = document.createElement("option");
          altOption.value = `A${altitude}-option`;
          altOption.textContent = `${altitude} FT`;
          altitudeOption.appendChild(altOption);
        }
        altContainer.appendChild(altitudeOption);

        var altimeterOption = document.createElement("select");
        altimeterOption.id = "altimeter-option";
        var defaultAltimeterOption = document.createElement("option");
        defaultAltimeterOption.value = "";
        defaultAltimeterOption.disabled = true;
        defaultAltimeterOption.selected = true;
        defaultAltimeterOption.textContent = "ALT";
        altimeterOption.appendChild(defaultAltimeterOption);

        var qnhOption = document.createElement("option");
        qnhOption.value = "qnh-option";
        qnhOption.textContent = "QNH";
        altimeterOption.appendChild(qnhOption);

        var qneOption = document.createElement("option");
        qneOption.value = "qne-option";
        qneOption.textContent = "QNE";
        altimeterOption.appendChild(qneOption);

        altContainer.appendChild(altimeterOption);

        var windContainer = document.createElement("div");
        windContainer.className = "wind-container";
        var windDirInput = crearInput(`wind-dir-${i}`, "DIR");
        var windIntInput = crearInput(`wind-int-${i}`, "INT");
        windIntInput.oninput = limitTo35;
        windContainer.appendChild(windDirInput);
        windContainer.appendChild(windIntInput);

        var tempContainer = document.createElement("div");
        tempContainer.className = "temp-container";
        var tempOption = document.createElement("select");
        tempOption.id = "temp-option";
        var defaultTempOption = document.createElement("option");
        defaultTempOption.value = "";
        defaultTempOption.disabled = true;
        defaultTempOption.selected = true;
        defaultTempOption.textContent = "Temp";
        tempOption.appendChild(defaultTempOption);
        for (let temp = 50; temp >= -80; temp--) {
          var tempItem = document.createElement("option");
          tempItem.value = `M${temp}-option`;
          tempItem.textContent = `${temp}°C`;
          tempOption.appendChild(tempItem);
        }
        tempContainer.appendChild(tempOption);

        var isogonicLineContainer = document.createElement("div");
        isogonicLineContainer.className = "isogonic-line-container";
        var isogonicLineInput = crearInput(`isogonic-line-${i}`, "ISO LINE");
        isogonicLineInput.oninput = limitTo180;
        isogonicLineContainer.appendChild(isogonicLineInput);

        var isogonicLineOption = document.createElement("select");
        isogonicLineOption.id = "isogonic-line-option";
        var defaultIsogonicLineOption = document.createElement("option");
        defaultIsogonicLineOption.value = "";
        defaultIsogonicLineOption.disabled = true;
        defaultIsogonicLineOption.selected = true;
        defaultIsogonicLineOption.textContent = "VAR";
        isogonicLineOption.appendChild(defaultIsogonicLineOption);

        var westOption = document.createElement("option");
        westOption.value = "west-option";
        westOption.textContent = "WEST VAR";
        isogonicLineOption.appendChild(westOption);

        var eastOption = document.createElement("option");
        eastOption.value = "east-option";
        eastOption.textContent = "EAST VAR";
        isogonicLineOption.appendChild(eastOption);

        isogonicLineContainer.appendChild(isogonicLineOption);

        var tasContainer = document.createElement("div");
        tasContainer.className = "tas-container";
        var tasInput = crearInput(`tas-${i}`, "TAS");
        tasInput.readOnly = true;
        tasContainer.appendChild(tasInput);

        var mcWcaContainer = document.createElement("div");
        mcWcaContainer.className = "mc-wca-container";
        var mcInput = crearInput(`mc-${i}`, "MC");
        mcInput.readOnly = true;
        var wcaInput = crearInput(`wca-${i}`, "WCA");
        wcaInput.readOnly = true;
        mcWcaContainer.appendChild(mcInput);
        mcWcaContainer.appendChild(wcaInput);

        var mhDevContainer = document.createElement("div");
        mhDevContainer.className = "mh-dev-container";
        var mhInput = crearInput(`mh-${i}`, "MH");
        mhInput.readOnly = true;
        var devInput = crearInput(`dev-${i}`, "DEV");
        devInput.readOnly = true;
        mhDevContainer.appendChild(mhInput);
        mhDevContainer.appendChild(devInput);

        var chContainer = document.createElement("div");
        chContainer.className = "ch-container";
        var chInput = crearInput(`ch-${i}`, "CH");
        chInput.readOnly = true;
        chContainer.appendChild(chInput);

        var legRemContainer = document.createElement("div");
        legRemContainer.className = "leg-rem-container";
        var legInput = crearInput(`leg-${i}`, "LEG");
        legInput.readOnly = true;
        var remInput = crearInput(`rem-${i}`, "REM");
        remInput.readOnly = true;
        legRemContainer.appendChild(legInput);
        legRemContainer.appendChild(remInput);

        var gsContainer = document.createElement("div");
        gsContainer.className = "gs-container";
        var gsInput = crearInput(`gs-${i}`, "GS EST");
        gsInput.readOnly = true;
        var gsActInput = crearInput(`gs-act-${i}`, "GS ACT");
        gsActInput.readOnly = true;
        gsContainer.appendChild(gsInput);
        gsContainer.appendChild(gsActInput);

        var eteAteContainer = document.createElement("div");
        eteAteContainer.className = "ete-ate-container";
        var eteInput = crearInput(`ete-${i}`, "ETE");
        eteInput.readOnly = true;
        var ateInput = crearInput(`ate-${i}`, "ATE");
        ateInput.readOnly = true;
        eteAteContainer.appendChild(eteInput);
        eteAteContainer.appendChild(ateInput);

        var etaAtaContainer = document.createElement("div");
        etaAtaContainer.className = "eta-ata-container";
        var etaInput = crearInput(`eta-${i}`, "ETA");
        etaInput.readOnly = true;
        var ataInput = crearInput(`ata-${i}`, "ATA");
        ataInput.readOnly = true;
        etaAtaContainer.appendChild(etaInput);
        etaAtaContainer.appendChild(ataInput);

        var fuelRemContainer = document.createElement("div");
        fuelRemContainer.className = "fuel-rem-container";
        var fuelInput = crearInput(`fuel-${i}`, "FUEL");
        fuelInput.oninput = validatePositiveNumber;
        var remFuelInput = crearInput(`rem-fuel-${i}`, "REM");
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
    }


