import './styles.css';
import React, { useState } from "react";
import CrearInput from "../../components/input";
import CalculateC150L from "../../components/aircraft/C150L";
import { GenerateRows } from '../../components/helpers';

const PageC150l = () => {
    const [rowCount, setRowCount] = useState(0);
    //const de inputs
    const [pressure, setPressure] = useState(948);
    const [temperature, setTemperature] = useState(-80);
    const [elevation, setElevation] = useState(-1400);
    const [setWindDirection] = useState(0);
    const [setWindIntensity] = useState(0);
    const [setRadioFrequency] = useState(118.0);
    const [setRadioAids] = useState(530);

    const [distanceAndCoursePlane, setDistanceAndCoursePlane] = useState({
        takeOffDistance: 0,
        takeOffDistanceClear50FeetObstacles: 0,
        takeOffDistanceGrassRunway: 0,
        takeOffDistanceGrassRunwayClear50FeetObstacles: 0,
    });

    //Calcula la distancia del avion C150L.
    const handleCalculateTakeoffDistance = () => {

        // Obtener los valores de estado directamente
        const pressureValue = pressure;
        const temperatureValue = temperature;
        const elevationValue = elevation;

        let toffDist = 0;
        let toffDistClear50FeetObstacles = 0;
        let toffDistGrassRunway = 0;
        let toffDistGrassRunwayClear50FeetObstacles = 0;

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
        // Actualiza los resultados en el estado
        setDistanceAndCoursePlane({
            takeOffDistance: parseFloat(toffDist),
            takeOffDistanceClear50FeetObstacles: parseFloat(toffDistClear50FeetObstacles),
            takeOffDistanceGrassRunway: parseFloat(toffDistGrassRunway),
            takeOffDistanceGrassRunwayClear50FeetObstacles: parseFloat(
                toffDistGrassRunwayClear50FeetObstacles,
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
                    />
                </div>
                <div className='input-row'>
                    <CrearInput
                        label="WindIntensity"
                        name="quantity"
                        min={0}
                        max={40}
                        step={1}
                    />
                </div>
                <div className='input-row'>
                    <CrearInput
                        label="RadioFrequency"
                        name="quantity"
                        min={118.0}
                        max={118.925}
                        step={1}
                    />
                </div>
                <div className='input-row'>
                    <CrearInput
                        label="RadioAids"
                        name="quantity"
                        min={530}
                        max={1700}
                        step={1}
                    />
                </div>
                <button type='button' onClick={handleCalculateTakeoffDistance}>
                    Calcular distancia de despegue
                </button>
            </form>
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
            <form className='input-form'>
                <div className="input-row">
                    Pressure
                    <CrearInput
                        type="number"
                        id="pressure"
                        name="pressure"
                        min={948}
                        max={1050}
                        step={1}
                        onChange={setPressure}
                    />
                </div>
                <div className="input-row">
                    Temperature
                    <CrearInput
                        type="number"
                        id="temperature"
                        name="temperature"
                        min={-80}
                        max={50}
                        step={1}
                        onChange={setTemperature}
                    />
                </div>
                <div className='input-row'>
                    Elevation
                    <CrearInput
                        type="number"
                        id="quantity"
                        name="quantity"
                        min={-1400}
                        max={14000}
                        step={1}
                        onChange={setElevation}
                    />
                </div>
                <div className='input-row'>
                    WindDirection
                    <CrearInput
                        type="number"
                        id="quantity"
                        name="quantity"
                        min={0}
                        max={360}
                        step={1}
                        onChange={setWindDirection}
                    />
                </div>
                <div className='input-row'>
                    WindIntensity:
                    <CrearInput
                        type="number"
                        id="quantity"
                        name="quantity"
                        min={0}
                        max={40}
                        step={1}
                        onChange={setWindIntensity}
                    />
                </div>
                <div className='input-row'>
                    RadioFrequency
                    <CrearInput
                        type="number"
                        id="quantity"
                        name="quantity"
                        min={118.0}
                        max={118.925}
                        step={1}
                        onChange={setRadioFrequency}
                    />
                </div>
                <div className='input-row'>
                    RadioAids
                    <CrearInput
                        type="number"
                        id="quantity"
                        name="quantity"
                        min={530}
                        max={1700}
                        step={1}
                        onChange={setRadioAids}
                    />
                </div>
                <button type="submit">Calcular datos</button>
            </form>

        </div>

    );
}

export default PageC150l;


