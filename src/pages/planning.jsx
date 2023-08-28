import './styles.css';
import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { calculateDistance, calculateBearing } from '../components/calculateDistance';
import SelectButton from '../components/aircraft';

const Home = () => {
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
        </div>
    );
};

export default Home;
