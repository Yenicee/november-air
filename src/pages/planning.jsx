import './styles.css';
import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { calculateDistance, calculateBearing } from '../components/calculateDistance';
import SelectButton from '../components/aircraft';
import { GenerateRows } from '../components/helpers';

const Home = () => {
    const [rowCount, setRowCount] = useState(1);
    const [pointSelectionEnabled, setPointSelectionEnabled] = useState(false);
    const [selectedPoints, setSelectedPoints] = useState([]);
    const [distanceAndCourse, setDistanceAndCourse] = useState({
        distance: 0,
        bearing: 0,
    });

    let map = null;

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

    useEffect(() => {
        map = L.map('map').setView([51.505, -0.09], 13);
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
            return;
        }

        const lastPoint = selectedPoints[selectedPoints.length - 1];
        const secondToLastPoint = selectedPoints[selectedPoints.length - 2];

        if (!lastPoint.lat || !lastPoint.lng || !secondToLastPoint.lat || !secondToLastPoint.lng) {
            console.error("Some points don't have valid coordinates.");
            return;
        }

        const latlng1 = { lat: secondToLastPoint.lat, lng: secondToLastPoint.lng };
        const latlng2 = { lat: lastPoint.lat, lng: lastPoint.lng };
        const distance = calculateDistance(latlng1, latlng2);
        const bearing = calculateBearing(latlng1, latlng2);

        setDistanceAndCourse({
            distance: (distance / 1852).toFixed(2),
            bearing: bearing.toFixed(2),
        });
    };

    return (
        <div>
            <div className='select'>
                <SelectButton />
            </div>
            <h1>DEPARTURE AIRPORT</h1>

            <form>
                Pressure:
                <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min={948}
                    max={1050}
                    step={1}
                />
                Temperature:
                <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min={-80}
                    max={50}
                    step={1}
                />
                Elevation:
                <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min={-1400}
                    max={14000}
                    step={1}
                />
                WindDirection:
                <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min={0}
                    max={360}
                    step={1}
                />
                WindIntensity:
                <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min={0}
                    max={40}
                    step={1}
                />
                RadioFrequency:
                <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min={118.0}
                    max={118.925}
                    step={1}
                />
                RadioAids:
                <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min={530}
                    max={1700}
                    step={1}
                />
                <button type="submit">Submit</button>
            </form>
            <div>
                <div>
                    <input type="number"
                        id='quantity'
                        min={1}
                        max={50}
                        step={1}
                        placeholder='number of check points'
                        onChange={(e) => setRowCount(parseInt(e.target.value))}
                    />
                    <button onClick={GenerateRows}>GENERATE</button>
                </div>
                <table>
                    <tbody>{GenerateRows(rowCount)}</tbody>
                </table>
            </div>


            <form>
                <h2>Arrival Airport</h2>
                Pressure:
                <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min={948}
                    max={1050}
                    step={1}
                />
                Temperature:
                <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min={-80}
                    max={50}
                    step={1}
                />
                Elevation:
                <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min={-1400}
                    max={14000}
                    step={1}
                />
                WindDirection:
                <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min={0}
                    max={360}
                    step={1}
                />
                WindIntensity:
                <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min={0}
                    max={40}
                    step={1}
                />
                RadioFrequency:
                <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min={118.0}
                    max={118.925}
                    step={1}
                />
                RadioAids:
                <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min={530}
                    max={1700}
                    step={1}
                />
                <button type="submit">Submit</button>
            </form>

            <h2>PLAN YOUR FLIGHT</h2>
            <div>
                <button id="markPointsBtn" onClick={enablePointSelection}>
                    {pointSelectionEnabled ? 'Cancelar Selección de Puntos' : 'Seleccionar Puntos'}
                </button>
                {pointSelectionEnabled && (
                    <button onClick={calculateDistanceAndCourse} disabled={selectedPoints.length < 2}>
                        Calcular Distancia y Rumbo
                    </button>
                )}
                <div>
                    {distanceAndCourse.distance !== 0 || distanceAndCourse.bearing !== 0 ? (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Distancia</th>
                                    <th>Rumbo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {distanceAndCourse.distance !== 0 && (
                                    <tr>
                                        <td>{`${distanceAndCourse.distance} millas náuticas`}</td>
                                    </tr>
                                )}
                                {distanceAndCourse.bearing !== 0 && (
                                    <tr>
                                        <td>{`${distanceAndCourse.bearing} grados`}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    ) : null}
                </div>
            </div>
            <div id="map" style={{ height: '400px' }}></div>
        </div>
    );
};

export default Home;
