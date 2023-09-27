import './styles.css';
import React, { useState } from "react";
import CrearInput from "../../components/input";
import CalculateC150L from "../../components/aircraft/C150L";
import { GenerateRows } from '../../components/helpers';

const PageC150l = () => {
    const [rowCount, setRowCount] = useState(0);
    //const de inputs
    // Estados para el primer formulario
    const [pressure1, setPressure1] = useState(0);
    const [temperature1, setTemperature1] = useState(0);
    const [elevation1, setElevation1] = useState(0);
    const [distanceAndCoursePlane1, setDistanceAndCoursePlane1] = useState({
        takeOffDistance: 0,
        takeOffDistanceClear50FeetObstacles: 0,
        takeOffDistanceGrassRunway: 0,
        takeOffDistanceGrassRunwayClear50FeetObstacles: 0,
        landingDistance: 0,
        landingDistanceToClear50FeetObstacles: 0,
        landingDistanceGrassRunway: 0,
        landingDistanceGrassRunwayToClear50FeetObstacles: 0,
    });
    // Estados para el segundo formulario
    const [pressure2, setPressure2] = useState(0);
    const [temperature2, setTemperature2] = useState(0);
    const [elevation2, setElevation2] = useState(0);
    const [distanceAndCoursePlane2, setDistanceAndCoursePlane2] = useState({
        takeOffDistance: 0,
        takeOffDistanceClear50FeetObstacles: 0,
        takeOffDistanceGrassRunway: 0,
        takeOffDistanceGrassRunwayClear50FeetObstacles: 0,
        landingDistance: 0,
        landingDistanceToClear50FeetObstacles: 0,
        landingDistanceGrassRunway: 0,
        landingDistanceGrassRunwayToClear50FeetObstacles: 0,
    });

    const [windDirection, setWindDirection] = useState(0);
    const [windIntensity, setWindIntensity] = useState(0);
    const [radioFrequency, setRadioFrequency] = useState(0); //118.0
    const [radioAids, setRadioAids] = useState(0);  //530

    const handleCalculateTakeoffAndLandingDistance = (formNumber) => {
        // Obtener los valores de estado directamente según el número de formulario
        const pressureValue = formNumber === 1 ? pressure1 : pressure2;
        const temperatureValue = formNumber === 1 ? temperature1 : temperature2;
        const elevationValue = formNumber === 1 ? elevation1 : elevation2;
        // Let de despegue
        let toffDist = 0;
        let toffDistClear50FeetObstacles = 0;
        let toffDistGrassRunway = 0;
        let toffDistGrassRunwayClear50FeetObstacles = 0;
        // Let de aterrizaje
        let landingDist = 0;
        let landingDistClear50FeetObstacles = 0;
        let landingDistGrassRunway = 0;
        let landingDistGrassRunwayClear50FeetObstacles = 0;
        // Los cálculos de despegue
        if ('C150L') {
            toffDist = CalculateC150L.takeOffDistance(
                pressureValue,
                elevationValue,
                temperatureValue
            );
            toffDistClear50FeetObstacles = CalculateC150L.takeOffDistanceToClear50FeetObstacles(
                pressureValue,
                elevationValue,
                temperatureValue
            );
            toffDistGrassRunway = CalculateC150L.takeOffDistanceGrassRunway(
                pressureValue,
                elevationValue,
                temperatureValue
            );
            toffDistGrassRunwayClear50FeetObstacles = CalculateC150L.takeOffDistanceGrassRunwayToClear50FeetObstacles(
                pressureValue,
                elevationValue,
                temperatureValue
            );
        }

        // Los cálculos de aterrizaje del C150L
        if ('C150L') {
            landingDist = CalculateC150L.landingDistance(
                pressureValue,
                elevationValue,
                temperatureValue
            );
            landingDistClear50FeetObstacles = CalculateC150L.landingDistanceToClear50FeetObstacles(
                pressureValue,
                elevationValue,
                temperatureValue
            );
            landingDistGrassRunway = CalculateC150L.landingDistanceGrassRunway(
                pressureValue,
                elevationValue,
                temperatureValue
            );
            landingDistGrassRunwayClear50FeetObstacles = CalculateC150L.landingDistanceGrassRunwayToClear50FeetObstacles(
                pressureValue,
                elevationValue,
                temperatureValue
            );
        }
        // Actualiza los resultados en el estado según el número de formulario
        if (formNumber === 1) {
            setDistanceAndCoursePlane1({
                takeOffDistance: parseFloat(toffDist),
                takeOffDistanceClear50FeetObstacles: parseFloat(toffDistClear50FeetObstacles),
                takeOffDistanceGrassRunway: parseFloat(toffDistGrassRunway),
                takeOffDistanceGrassRunwayClear50FeetObstacles: parseFloat(
                    toffDistGrassRunwayClear50FeetObstacles,
                ),
                // Agrega los resultados de aterrizaje al estado
                landingDistance: parseFloat(landingDist),
                landingDistanceToClear50FeetObstacles: parseFloat(landingDistClear50FeetObstacles),
                landingDistanceGrassRunway: parseFloat(landingDistGrassRunway),
                landingDistanceGrassRunwayToClear50FeetObstacles: parseFloat(
                    landingDistGrassRunwayClear50FeetObstacles,
                ),
            });
        } else if (formNumber === 2) {
            setDistanceAndCoursePlane2({
                takeOffDistance: parseFloat(toffDist),
                takeOffDistanceClear50FeetObstacles: parseFloat(toffDistClear50FeetObstacles),
                takeOffDistanceGrassRunway: parseFloat(toffDistGrassRunway),
                takeOffDistanceGrassRunwayClear50FeetObstacles: parseFloat(
                    toffDistGrassRunwayClear50FeetObstacles,
                ),
                // Agrega los resultados de aterrizaje al estado
                landingDistance: parseFloat(landingDist),
                landingDistanceToClear50FeetObstacles: parseFloat(landingDistClear50FeetObstacles),
                landingDistanceGrassRunway: parseFloat(landingDistGrassRunway),
                landingDistanceGrassRunwayToClear50FeetObstacles: parseFloat(
                    landingDistGrassRunwayClear50FeetObstacles,
                ),
            });
        }
    };

    return (
        <div>
            <h1>DEPARTURE AIRPORT</h1>
            <form className="input-form">
                Ad Code
                <input
                    className='adCode'
                    type='text'
                />
                <div className="input-row">
                    <CrearInput
                        label="depPress"
                        min={948}
                        max={1050}
                        step={1}
                        value={pressure1}
                        onChange={(newValue) => setPressure1(newValue)}
                    />
                </div>
                <div className="input-row">
                    <CrearInput
                        label="depTemp"
                        min={-80}
                        max={50}
                        step={1}
                        value={temperature1}
                        onChange={(newValue) => setTemperature1(newValue)}
                    />
                </div>
                <div className='input-row'>
                    <CrearInput
                        label="depElev"
                        min={-1400}
                        max={14000}
                        step={1}
                        value={elevation1}
                        onChange={(newValue) => setElevation1(newValue)}
                    />
                </div>
                <div className='input-row'>
                    <CrearInput
                        label="depWindDir"
                        name="quantity"
                        min={0}
                        max={360}
                        step={1}
                        value={windDirection}
                        onChange={(newValue) => setWindDirection(newValue)}
                    />
                </div>
                <div className='input-row'>
                    <CrearInput
                        label="depWindInt"
                        name="quantity"
                        min={0}
                        max={40}
                        step={1}
                        value={windIntensity}
                        onChange={(newValue) => setWindIntensity(newValue)}
                    />
                </div>
                <div className='input-row'>
                    <CrearInput
                        label="RadioFrequency"
                        name="quantity"
                        min={118.0}
                        max={118.925}
                        step={1}
                        value={radioFrequency}
                        onChange={(newValue) => setRadioFrequency(newValue)}
                    />
                </div>
                <div className='input-row'>
                    <CrearInput
                        label="RadioAids"
                        name="quantity"
                        min={530}
                        max={1700}
                        step={1}
                        value={radioAids}
                        onChange={(newValue) => setRadioAids(newValue)}
                    />
                </div>
                <button type='button' onClick={() => handleCalculateTakeoffAndLandingDistance(1)}>
                    Calculate takeoff distance
                </button>
            </form>

            <div className='result-table-container'>
                {/* Primera tabla de resultados de despegue */}
                {distanceAndCoursePlane1.takeOffDistance !== 0 && (
                    <div>
                        <table className="result-table">
                            <tbody>
                                <tr>
                                    <td>TakeOff Distance</td>
                                    <td>{distanceAndCoursePlane1.takeOffDistance}</td>
                                </tr>
                                <tr>
                                    <td>TakeOff Distance to clear 50ft Obstacle</td>
                                    <td>{distanceAndCoursePlane1.takeOffDistanceClear50FeetObstacles}</td>
                                </tr>
                                <tr>
                                    <td>TakeOff Distance grass Runway</td>
                                    <td>{distanceAndCoursePlane1.takeOffDistanceGrassRunway}</td>
                                </tr>
                                <tr>
                                    <td>TakeOff Distance grass Runway to clear 50ft Obstacle</td>
                                    <td>{distanceAndCoursePlane1.takeOffDistanceGrassRunwayClear50FeetObstacles}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
                {/* Primera tabla de resultados de aterrizaje */}
                {distanceAndCoursePlane1.landingDistance !== 0 && (
                    <div>
                        <table className="result-table-Landing">
                            <tbody>
                                <tr>
                                    <td>Landing Distance</td>
                                    <td>{distanceAndCoursePlane1.landingDistance}</td>
                                </tr>
                                <tr>
                                    <td>Landing Distance To Clear 50 Feet Obstacles</td>
                                    <td>{distanceAndCoursePlane1.landingDistanceToClear50FeetObstacles}</td>
                                </tr>
                                <tr>
                                    <td>Landing Distance Grass Runway</td>
                                    <td>{distanceAndCoursePlane1.landingDistanceGrassRunway}</td>
                                </tr>
                                <tr>
                                    <td>Landing Distance Grass Runway To Clear 50 Feet Obstacles</td>
                                    <td>{distanceAndCoursePlane1.landingDistanceGrassRunwayToClear50FeetObstacles}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}

            </div>

            <div className='generate'>
                <div>
                    <input type="number"
                        id='quantity'
                        min={0}
                        max={50}
                        step={1}
                        placeholder='check points'
                        onChange={(e) => setRowCount(parseInt(e.target.value))}
                    />
                </div>
                <table>
                    <tbody>{GenerateRows(rowCount)}</tbody>
                </table>
            </div>

            <h2>Arrival Airport</h2>
            <form className="input-form">
                Ad Code
                <input
                    className='adCode'
                    type='text'
                />
                <div className="input-row">
                    <CrearInput
                        label="arrPress"
                        min={948}
                        max={1050}
                        step={1}
                        value={pressure2}
                        onChange={(newValue) => setPressure2(newValue)}
                    />
                </div>
                <div className="input-row">
                    <CrearInput
                        label="arrTemp"
                        min={-80}
                        max={50}
                        step={1}
                        value={temperature2}
                        onChange={(newValue) => setTemperature2(newValue)}
                    />
                </div>
                <div className='input-row'>
                    <CrearInput
                        label="arrElev"
                        min={-1400}
                        max={14000}
                        step={1}
                        value={elevation2}
                        onChange={(newValue) => setElevation2(newValue)}
                    />
                </div>
                <div className='input-row'>
                    <CrearInput
                        label="arrWindDir"
                        name="quantity"
                        min={0}
                        max={360}
                        step={1}
                        value={windDirection}
                        onChange={(newValue) => setWindDirection(newValue)}
                    />
                </div>
                <div className='input-row'>
                    <CrearInput
                        label="arrWindInt"
                        name="quantity"
                        min={0}
                        max={40}
                        step={1}
                        value={windIntensity}
                        onChange={(newValue) => setWindIntensity(newValue)}
                    />
                </div>
                <div className='input-row'>
                    <CrearInput
                        label="RadioFrequency"
                        name="quantity"
                        min={118.0}
                        max={118.925}
                        step={1}
                        value={radioFrequency}
                        onChange={(newValue) => setRadioFrequency(newValue)}
                    />
                </div>
                <div className='input-row'>
                    <CrearInput
                        label="RadioAids"
                        name="quantity"
                        min={530}
                        max={1700}
                        step={1}
                        value={radioAids}
                        onChange={(newValue) => setRadioAids(newValue)}
                    />
                </div>
                <button type='button' onClick={() => handleCalculateTakeoffAndLandingDistance(2)}>
                    Calculate takeoff distance
                </button>
            </form>
            <div className='result-table-container'>
                {/* Segunda tabla de resultados de despegue */}
                {distanceAndCoursePlane2.takeOffDistance !== 0 && (
                    <div>
                        <table className="result-table">
                            <tbody>
                                <tr>
                                    <td>TakeOff Distance</td>
                                    <td>{distanceAndCoursePlane2.takeOffDistance}</td>
                                </tr>
                                <tr>
                                    <td>TakeOff Distance to clear 50ft Obstacle</td>
                                    <td>{distanceAndCoursePlane2.takeOffDistanceClear50FeetObstacles}</td>
                                </tr>
                                <tr>
                                    <td>TakeOff Distance grass Runway</td>
                                    <td>{distanceAndCoursePlane2.takeOffDistanceGrassRunway}</td>
                                </tr>
                                <tr>
                                    <td>TakeOff Distance grass Runway to clear 50ft Obstacle</td>
                                    <td>{distanceAndCoursePlane2.takeOffDistanceGrassRunwayClear50FeetObstacles}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Segunda tabla de resultados de aterrizaje */}
                {distanceAndCoursePlane2.landingDistance !== 0 && (
                    <div>
                        <table className="result-table-Landing">
                            <tbody>
                                <tr>
                                    <td>Landing Distance</td>
                                    <td>{distanceAndCoursePlane2.landingDistance}</td>
                                </tr>
                                <tr>
                                    <td>Landing Distance To Clear 50 Feet Obstacles</td>
                                    <td>{distanceAndCoursePlane2.landingDistanceToClear50FeetObstacles}</td>
                                </tr>
                                <tr>
                                    <td>Landing Distance Grass Runway</td>
                                    <td>{distanceAndCoursePlane2.landingDistanceGrassRunway}</td>
                                </tr>
                                <tr>
                                    <td>Landing Distance Grass Runway To Clear 50 Feet Obstacles</td>
                                    <td>{distanceAndCoursePlane2.landingDistanceGrassRunwayToClear50FeetObstacles}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PageC150l;


