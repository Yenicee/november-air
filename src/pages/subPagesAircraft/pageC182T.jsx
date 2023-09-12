import { useState } from "react";
import CalculateC182T from "../../components/aircraft/C182T";
import CrearInput from "../../components/input";

const PageC182T = () => {
    //formula input
    const [pressure, setPressure] = useState(948);
    const [temperature, setTemperature] = useState(-80);
    const [elevation, setElevation] = useState(-1400);
    const [setWindDirection] = useState(0);
    const [setWindIntensity] = useState(0);
    const [setRadioFrequency] = useState(118.0);
    const [setRadioAids] = useState(530);

   const [distanceAndCourseC182T, setDistanceAndCourseC182T] = useState ({
    takeOffDistance: 0,
    takeOffDistanceToClear50FeetObstacles: 0,
   });

  // const handleCalculateDistanceC182T = () => {

  // }

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
                {/* <div>
                  <CrearInput
                  label="weight"
                  min={2300}
                  max={3100}
                  step={1}
                  value={weight}
                  />
                </div> */}
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
                <button type='button'>
                    Calcular distancia de despegue
                </button>
            </form>
      </div>

     </div>
   )
}

export default PageC182T