import './styles.css';
import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import geolib from 'geolib';

const Home = () => {
    const [pointSelectionEnabled, setPointSelectionEnabled] = useState(false);
    const [selectedPoints, setSelectedPoints] = useState([]);
    const [distanceAndCourse, setDistanceAndCourse] = useState({
        distance: 0,
        bearing: 0,
    });

    let map = null; // Declarar map fuera del efecto useEffect

    const enablePointSelection = () => {
        setPointSelectionEnabled(!pointSelectionEnabled);
    };

    const handleMapClick = (e) => {
        if (!pointSelectionEnabled) return;

        const { lat, lng } = e.latlng;

        const newPoint = { lat, lng };
        setSelectedPoints([...selectedPoints, newPoint]);

        const marker = L.marker([lat, lng]).addTo(map);
        marker.bindPopup(`Lat: ${lat}<br>Lng: ${lng}`).openPopup();
    };

    // const handleWeatherChange = (field, value) => {
    //     setWeatherData({ ...weatherData, [field]: value });
    //};

    useEffect(() => {
        map = L.map('map').setView([51.505, -0.09], 13); // Asignar el valor a map 
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        if (pointSelectionEnabled) {
            map.on('click', handleMapClick);
        } else {
            map.off('click', handleMapClick);
        }

        return () => {
            map.remove();
        };
    }, [pointSelectionEnabled]);


    const calculateDistanceAndCourse = () => {
        if (selectedPoints.length < 2) {
            return; // No realizar cálculos si no hay suficientes puntos seleccionados
        }

        const lastPoint = selectedPoints[selectedPoints.length - 1];
        const secondToLastPoint = selectedPoints[selectedPoints.length - 2];

        if (!lastPoint.lat || !lastPoint.lng || !secondToLastPoint.lat || !secondToLastPoint.lng) {
            console.error("Algunos puntos no tienen coordenadas válidas.");
            return;
        }

        // Define la función calculateDistance
        function calculateDistance(latlng1, latlng2) {
            const R = 6371; // Radio de la Tierra en kilómetros
            const lat1 = latlng1.lat * (Math.PI / 180);
            const lon1 = latlng1.lng * (Math.PI / 180);
            const lat2 = latlng2.lat * (Math.PI / 180);
            const lon2 = latlng2.lng * (Math.PI / 180);

            const dLat = lat2 - lat1;
            const dLon = lon2 - lon1;

            const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1) * Math.cos(lat2) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);

            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

            const distance = R * c;
            return distance;
        }

        // Define la función calculateBearing
        function calculateBearing(latlng1, latlng2) {
            const lat1 = latlng1.lat * (Math.PI / 180);
            const lon1 = latlng1.lng * (Math.PI / 180);
            const lat2 = latlng2.lat * (Math.PI / 180);
            const lon2 = latlng2.lng * (Math.PI / 180);

            const y = Math.sin(lon2 - lon1) * Math.cos(lat2);
            const x = Math.cos(lat1) * Math.sin(lat2) -
                Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);

            let bearing = Math.atan2(y, x);
            bearing = (bearing * 180) / Math.PI; // Convertir a grados

            return (bearing + 360) % 360; // Asegurarse de que el rumbo esté en el rango de 0 a 360 grados
        }

        // Calcular distancia y rumbo utilizando las funciones de cálculo
        const latlng1 = { lat: secondToLastPoint.lat, lng: secondToLastPoint.lng };
        const latlng2 = { lat: lastPoint.lat, lng: lastPoint.lng };

        const distance = calculateDistance(latlng1, latlng2);
        const bearing = calculateBearing(latlng1, latlng2);

        // Actualizar el estado de la interfaz de usuario
        setDistanceAndCourse({
            distance: (distance / 1852).toFixed(2), // Convertir la distancia a millas náuticas
            bearing: bearing.toFixed(2),
        });
    };


    return (
        <div>
            <form>
                Pressure:
                <input
                     type="number"
                     id="quantity"
                     name="quantity"
              
                     min={0}
                     max={100}
                     step={1}
                 />
                Temperature:
                <input 
                   type="number"
                   id="quantity"
                   name="quantity"
                  
                 
                   min={0}
                   max={100}
                   step={1}
                   />
                  Elevation:
                <input
                   type="number"
                   id="quantity"
                   name="quantity"
                 
              
                   min={0}
                   max={100}
                   step={1}
                   /> 
                    WindDirection:
                <input 
                   type="number"
                   id="quantity"
                   name="quantity"
               
                 
                   min={0}
                   max={100}
                   step={1}
                  />
                 WindIntensity:
                <input 
                type="number"
                id="quantity"
                name="quantity"
            
          
                min={0}
                max={100}
                step={1}
               /> 
                RadioFrequency:
                <input
                 type="number"
                 id="quantity"
                 name="quantity"
                
  
                 min={0}
                 max={100}
                 step={1}
                 />  
                 RadioAids:
                <input
               type="number"
               id="quantity"
               name="quantity"
           
         
               min={0}
               max={100}
               step={1}
               />
                <button type="submit">Submit</button>
            </form>
           
           <div>
            <input type="text" placeholder='number of check points' />
           </div>
             
           <form>
            <h2>Arrival Airport</h2>
                Pressure:
                <input
                     type="number"
                     id="quantity"
                     name="quantity"
                   
                  
                     min={0}
                     max={100}
                     step={1}
                 />
                Temperature:
                <input 
                   type="number"
                   id="quantity"
                   name="quantity"
              
                 
                   min={0}
                   max={100}
                   step={1}
                   />
                  Elevation:
                <input
                   type="number"
                   id="quantity"
                   name="quantity"
                 
                
                   min={0}
                   max={100}
                   step={1}
                   /> 
                    WindDirection:
                <input 
                   type="number"
                   id="quantity"
                   name="quantity"
            
              
                   min={0}
                   max={100}
                   step={1}
                  />
                 WindIntensity:
                <input 
                type="number"
                id="quantity"
                name="quantity"
              
                
                min={0}
                max={100}
                step={1}
               /> 
                RadioFrequency:
                <input
                 type="number"
                 id="quantity"
                 name="quantity"
            
                 
                 min={0}
                 max={100}
                 step={1}
                 />  
                 RadioAids:
                <input
               type="number"
               id="quantity"
               name="quantity"
            
              
               min={0}
               max={100}
               step={1}
               />
                <button type="submit">Submit</button>
            </form>


            <h2>PLAN YOUR FLIGHT</h2>
            <div>
                <button id="markPointsBtn" onClick={enablePointSelection}>
                    {pointSelectionEnabled ? 'Cancel Point Selection' : 'Select Points'}
                </button>
                {pointSelectionEnabled && (
                    <button onClick={calculateDistanceAndCourse} disabled={selectedPoints.length < 2}>
                        Calculate Distance and Course
                    </button>
                )}
                <div>
                    {distanceAndCourse.distance !== 0 && (
                        <p>Distance: {distanceAndCourse.distance} nautical miles</p>
                    )}
                    {distanceAndCourse.bearing !== 0 && (
                        <p>Bearing: {distanceAndCourse.bearing} degrees</p>
                    )}
                </div>
            </div>
            <div id="map" style={{ height: '400px' }}></div>
        </div >
    )
};

export default Home;