import './styles.css';
import React, { useState } from 'react';



export const GenerateRows = (rowCount) => {
  

  const rows = [];
  for (let i = 0; i < rowCount; i++) {

    rows.push(
      <div key={i}>
        <label>TOTAL DIS</label>
        <input
          type="text"
          placeholder="Enter distance"
        />
        <label>TOTAL FUEL</label>
        <input
          type="text"
          placeholder="Enter fuel quantity"
        />
      </div>
    );

    rows.push(
      <tbody key={i} className="row-container">

        <tr>
          <td className="fuel-rem">
            <input
              type="text"
              placeholder="FROM" /></td>
          <td className="fuel-rem">
            <input type="text"
              placeholder="TO" /></td>
        </tr>
        <tr>
          <td className="fuel-rem">
            <input
              type="number"
              placeholder="COM"
              value={""} />
          </td>
          <td className="fuel-rem">
            <input
              type="number"
              placeholder="NAV"
              value={""}
            />
          </td>
          <td className="fuel-rem">
            <input
              type="number"
              placeholder="COM"
              value={""}
            />
          </td>
          <td className="fuel-rem">
            <input
              type="number"
              placeholder="NAV"
              value={""}
            />
          </td>
        </tr>
        <tr>
          <td className="fuel-rem">
            <input
              type="number"
              placeholder="ALT"
              value={""} />
          </td>
          <td className="fuel-rem">
          <select >
            <option value="QNH">QNH</option>
            <option value="QNE">QNE</option>
          </select>
        </td>
        </tr>
        <tr>
          <td className="fuel-rem">
            <input
              type="number"
              placeholder="DIST"
              value={""} />
          </td>
          <td className="fuel-rem">
            <input
              type="number"
              placeholder="TC"
              value={""}
            />
          </td>
          <td className="fuel-rem">
            <input
              type="number"
              placeholder="PRESS"
              value={""}
            />
          </td>
          <td className="fuel-rem">
            <input
              type="number"
              placeholder="TEMP"
              value={""}
            />
          </td>
        </tr>
        <tr>
          <td className="fuel-rem">
            <select >
              <option value="">+W</option>
              <option value="">-E</option>
            </select>
            <input
              type="number"
              placeholder="INSO LINE"

            />
          </td>
          <td className="fuel-rem">
            <select >
              <option value="">GEO</option>
              <option value="">MAG</option>
            </select>
            <input
              type="number"
              placeholder="wIND DIR"

            />
          </td>
          <td className="fuel-rem">
            <input
              type="number"
              placeholder="W INT"
              value={""}
            />
          </td>
          <td className="fuel-rem">
            <input
              type="number"
              placeholder="RPM"
              value={""}
            />
          </td>
        </tr>
        {/*ACA SE TIENE QUE VER LOS RESULTADOS*/}
        <tr>
          <td className="fuel-rem">TAS</td>
        </tr>
        <tr>
          <td className="fuel-rem">MC</td>
          <td className="fuel-rem">WCA</td>
        </tr>
        <tr>
          <td className="fuel-rem">MH</td>
          <td className="fuel-rem">DEV</td>
        </tr>
        <tr>
          <td className="fuel-rem">CH</td>
        </tr>
        <tr>
          <td className='fuel-rem'>LEG</td>
          <td className="fuel-rem">REM</td>
        </tr>
        <tr>
          <td className="fuel-rem">GSEST</td>
          <td className="fuel-rem">GSACT</td>
        </tr>
        <tr>
          <td className="fuel-rem">ETE</td>
          <td className="fuel-rem">ATE</td>
        </tr>
        <tr>
          <td className="fuel-rem">ETA</td>
          <td className="fuel-rem">ATA</td>
        </tr>
        <tr>
          <td className="fuel-rem">FUEL</td>
          <td className="fuel-rem">REM</td>
        </tr>
      </tbody>
    );
  }
  return rows;
};

