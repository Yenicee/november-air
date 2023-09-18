import './styles.css';
import React, { useState } from "react";
import CrearInput from "../../components/input";
import CalculateC150L from "../../components/aircraft/C150L";
import { GenerateRows } from '../../components/helpers';

const PageC150l = () => {
    const [rowCount, setRowCount] = useState(0);
    //const de inputs
    const [pressure, setPressure] = useState(0); //948
    const [temperature, setTemperature] = useState(0); //-80
    const [elevation, setElevation] = useState(0); //-1400
    const [windDirection, setWindDirection] = useState(0);
    const [windIntensity, setWindIntensity] = useState(0);
    const [radioFrequency, setRadioFrequency] = useState(0); //118.0
    const [radioAids, setRadioAids] = useState(0);  //530

    const [distanceAndCoursePlane, setDistanceAndCoursePlane] = useState({
        takeOffDistance: 0,
        takeOffDistanceClear50FeetObstacles: 0,
        takeOffDistanceGrassRunway: 0,
        takeOffDistanceGrassRunwayClear50FeetObstacles: 0,
        // Se agregan constantes para la distancia de aterrizaje
        landingDistance: 0,
        landingDistanceToClear50FeetObstacles: 0,
        landingDistanceGrassRunway: 0,
        landingDistanceGrassRunwayToClear50FeetObstacles: 0,
    });

    //Calcula la distancia del avion C150L.
    const handleCalculateTakeoffAndLandingDistance = () => {

        // Obtener los valores de estado directamente
        const pressureValue = pressure;
        const temperatureValue = temperature;
        const elevationValue = elevation;

        //Let de despegue
        let toffDist = 0;
        let toffDistClear50FeetObstacles = 0;
        let toffDistGrassRunway = 0;
        let toffDistGrassRunwayClear50FeetObstacles = 0;

        // Let de aterrizaje
        let landingDist = 0;
        let landingDistClear50FeetObstacles = 0;
        let landingDistGrassRunway = 0;
        let landingDistGrassRunwayClear50FeetObstacles = 0;

        //Los calculos de despegue
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
        //Los calculos de aterrizaje del C150L
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

        // Actualiza los resultados en el estado
        setDistanceAndCoursePlane({
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
                        label="Pressure"
                        min={948}
                        max={1050}
                        step={1}
                        value={pressure}
                        onChange={(newValue) => setPressure(newValue)}
                    />
                </div>
                <div className="input-row">
                    <CrearInput
                        label="Temperature"
                        min={-80}
                        max={50}
                        step={1}
                        value={temperature}
                        onChange={(newValue) => setTemperature(newValue)}
                    />
                </div>
                <div className='input-row'>
                    <CrearInput
                        label="Elevation"
                        min={-1400}
                        max={14000}
                        step={1}
                        value={elevation}
                        onChange={(newValue) => setElevation(newValue)}
                    />
                </div>
                <div className='input-row'>
                    <CrearInput
                        label="WindDirection"
                        name="quantity"
                        min={0}
                        max={360}
                        step={1}
                        onChange={(newValue) => setWindDirection}
                    />
                </div>
                <div className='input-row'>
                    <CrearInput
                        label="WindIntensity"
                        name="quantity"
                        min={0}
                        max={40}
                        step={1}
                        onChange={(newValue) => setWindIntensity}
                    />
                </div>
                <div className='input-row'>
                    <CrearInput
                        label="RadioFrequency"
                        name="quantity"
                        min={118.0}
                        max={118.925}
                        step={1}
                        onChange={(newValue) => setRadioFrequency}
                    />
                </div>
                <div className='input-row'>
                    <CrearInput
                        label="RadioAids"
                        name="quantity"
                        min={530}
                        max={1700}
                        step={1}
                        onChange={(newValue) => setRadioAids}
                    />
                </div>
                <button type='button' onClick={handleCalculateTakeoffAndLandingDistance}>
                    Calculate takeoff distance
                </button>
            </form>

            <div className='result-table-container'>
                {
                    distanceAndCoursePlane.takeOffDistance !== 0 && (
                        <div>
                            <table className="result-table">
                                <tbody>
                                    <tr>
                                        <td>TakeOff Distance</td>
                                        <td>{distanceAndCoursePlane.takeOffDistance}</td>
                                    </tr>
                                    <tr>
                                        <td>TakeOff Distance to clear 50ft Obstacle</td>
                                        <td>{distanceAndCoursePlane.takeOffDistanceClear50FeetObstacles}</td>
                                    </tr>
                                    <tr>
                                        <td>TakeOff Distance grass Runway</td>
                                        <td>{distanceAndCoursePlane.takeOffDistanceGrassRunway}</td>
                                    </tr>
                                    <tr>
                                        <td>TakeOff Distance grass Runway to clear 50ft Obstacle</td>
                                        <td>{distanceAndCoursePlane.takeOffDistanceGrassRunwayClear50FeetObstacles}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )
                }
                {/* ACA SE COLOCA LA SEGUNDA TABLA LANDING */}

                {
                    distanceAndCoursePlane.landingDistance !== 0 && (
                        <div>
                            <table className="result-table-Landing">
                                <tbody>
                                    <tr>
                                        <td>Landing Distance</td>
                                        <td>{distanceAndCoursePlane.landingDistance}</td>
                                    </tr>
                                    <tr>
                                        <td>Landing Distance To Clear 50 Feet Obstacles</td>
                                        <td>{distanceAndCoursePlane.landingDistanceToClear50FeetObstacles}</td>
                                    </tr>
                                    <tr>
                                        <td>Landing Distance Grass Runway</td>
                                        <td>{distanceAndCoursePlane.landingDistanceGrassRunway}</td>
                                    </tr>
                                    <tr>
                                        <td>Landing Distance Grass Runway To Clear 50 Feet Obstacles</td>
                                        <td>{distanceAndCoursePlane.landingDistanceGrassRunwayToClear50FeetObstacles}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )
                }
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
                        label="Pressure"
                        min={948}
                        max={1050}
                        step={1}
                        value={pressure}
                        onChange={(newValue) => setPressure(newValue)}
                    />
                </div>
                <div className="input-row">
                    <CrearInput
                        label="Temperature"
                        min={-80}
                        max={50}
                        step={1}
                        value={temperature}
                        onChange={(newValue) => setTemperature(newValue)}
                    />
                </div>
                <div className='input-row'>
                    <CrearInput
                        label="Elevation"
                        min={-1400}
                        max={14000}
                        step={1}
                        value={elevation}
                        onChange={(newValue) => setElevation(newValue)}
                    />
                </div>
                <div className='input-row'>
                    <CrearInput
                        label="WindDirection"
                        name="quantity"
                        min={0}
                        max={360}
                        step={1}
                    />
                </div>
                <div className='input-row'>
                    <CrearInput
                        label="WindIntensity"
                        name="quantity"
                        min={0}
                        max={40}
                        step={1}
                        onChange={(newValue) => setWindIntensity}
                    />
                </div>
                <div className='input-row'>
                    <CrearInput
                        label="RadioFrequency"
                        name="quantity"
                        min={118.0}
                        max={118.925}
                        step={1}
                        onChange={(newValue) => setRadioFrequency}
                    />
                </div>
                <div className='input-row'>
                    <CrearInput
                        label="RadioAids"
                        name="quantity"
                        min={530}
                        max={1700}
                        step={1}
                        onChange={(newValue) => setRadioAids}
                    />
                </div>
                <button type='button' onClick={handleCalculateTakeoffAndLandingDistance}>
                    Calculate takeoff distance
                </button>
            </form>
            <div className='result-table-container'>
                {
                    distanceAndCoursePlane.takeOffDistance !== 0 && (
                        <div>
                            <table className="result-table">
                                <tbody>
                                    <tr>
                                        <td>TakeOff Distance</td>
                                        <td>{distanceAndCoursePlane.takeOffDistance}</td>
                                    </tr>
                                    <tr>
                                        <td>TakeOff Distance to clear 50ft Obstacle</td>
                                        <td>{distanceAndCoursePlane.takeOffDistanceClear50FeetObstacles}</td>
                                    </tr>
                                    <tr>
                                        <td>TakeOff Distance grass Runway</td>
                                        <td>{distanceAndCoursePlane.takeOffDistanceGrassRunway}</td>
                                    </tr>
                                    <tr>
                                        <td>TakeOff Distance grass Runway to clear 50ft Obstacle</td>
                                        <td>{distanceAndCoursePlane.takeOffDistanceGrassRunwayClear50FeetObstacles}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )
                }
                {/* ACA SE COLOCA LA SEGUNDA TABLA LANDING */}

                {
                    distanceAndCoursePlane.landingDistance !== 0 && (
                        <div>
                            <table className="result-table-Landing">
                                <tbody>
                                    <tr>
                                        <td>Landing Distance</td>
                                        <td>{distanceAndCoursePlane.landingDistance}</td>
                                    </tr>
                                    <tr>
                                        <td>Landing Distance To Clear 50 Feet Obstacles</td>
                                        <td>{distanceAndCoursePlane.landingDistanceToClear50FeetObstacles}</td>
                                    </tr>
                                    <tr>
                                        <td>Landing Distance Grass Runway</td>
                                        <td>{distanceAndCoursePlane.landingDistanceGrassRunway}</td>
                                    </tr>
                                    <tr>
                                        <td>Landing Distance Grass Runway To Clear 50 Feet Obstacles</td>
                                        <td>{distanceAndCoursePlane.landingDistanceGrassRunwayToClear50FeetObstacles}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )
                }
            </div>
        </div>

    );
}

export default PageC150l;


