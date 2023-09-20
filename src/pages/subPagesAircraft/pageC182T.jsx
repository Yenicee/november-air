import { useState } from "react";
import CalculateC182T from "../../components/aircraft/C182T";
import CrearInput from "../../components/input";
import { GenerateRows } from "../../components/helpers";

const PageC182T = () => {
    const [rowCount, setRowCount] = useState(0);
    //formula input
    const [pressure, setPressure] = useState(948);
    const [temperature, setTemperature] = useState(-80);
    const [elevation, setElevation] = useState(-1400);
    const [weight, setWeight] = useState(2300);

    const [distanceAndCourseC182T, setDistanceAndCourseC182T] = useState({
        takeOffDistance: 0,
        takeOffDistanceToClear50FeetObstacles: 0,
    });

    const handleCalculateDistanceC182T = () => {
        // Obtén los valores directamente del estado
        const depPress = pressure;
        const depElev = elevation;
        const depTemp = temperature;
        const depWeight = weight;

        // Calcula las distancias
        const takeOffDistance = CalculateC182T.takeOffDistance(
            depPress,
            depElev,
            depTemp,
            depWeight
        );

        const takeOffDistanceToClear50FeetObstacles =
            CalculateC182T.takeOffDistanceToClear50FeetObstacles(
                depPress,
                depElev,
                depTemp,
                depWeight
            );

        // Actualiza los resultados en el estado
        setDistanceAndCourseC182T({
            takeOffDistance: takeOffDistance,
            takeOffDistanceToClear50FeetObstacles: takeOffDistanceToClear50FeetObstacles,
        });
    };

    return (
        <div>
            <h1>DEPARTURE AIRPORT</h1>
            <div>
                <form className="input-form">
                    Ad Code
                    <input
                        className='adCode'
                        type='text'
                    />
                    <div>
                        <CrearInput
                            label="Weight"
                            min={2300}
                            max={3100}
                            step={1}
                            // value={weight}
                            // onChange={(newValue) => setWeight(newValue)}
                        />
                    </div>
                    <div className="input-row">
                        <CrearInput
                            label="Pressure"
                            min={948}
                            max={1050}
                            step={1}
                            // value={pressure}
                             onChange={(newValue) => setPressure(newValue)}
                        />
                    </div>
                    <div className="input-row">
                        <CrearInput
                            label="Temperature"
                            min={-80}
                            max={50}
                            step={1}
                            // value={temperature}
                             onChange={(newValue) => setTemperature(newValue)}
                        />
                    </div>
                    <div className='input-row'>
                        <CrearInput
                            label="Elevation"
                            min={-1400}
                            max={14000}
                            step={1}
                            // value={elevation}
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
                    <button type='button' onClick={handleCalculateDistanceC182T}>
                        Calcular distancia de despegue
                    </button>
                </form>
                {distanceAndCourseC182T.takeOffDistance !== 0 && (
                    <div>
                        <table className="result-table">
                            <tbody>
                                <tr>
                                    <td>TakeOff Distance</td>
                                    <td>{distanceAndCourseC182T.takeOffDistance}</td>
                                </tr>
                                <tr>
                                    <td>TakeOff Distance to clear 50ft Obstacle</td>
                                    <td>
                                        {distanceAndCourseC182T.takeOffDistanceToClear50FeetObstacles}
                                    </td>
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
        </div>
    );
};

export default PageC182T