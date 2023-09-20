import './styles.css';

// helpers.jsx del avion C150L

export const GenerateRows = (rowCount) => {
  const rows = [];
  for (let i = 0; i < rowCount; i++) {
    rows.push(
      <tbody key={i} className="row-container">
        <tr>
          <td>FROM</td>
          <td className="fuel-rem">TO</td>
        </tr>
        <td className="fuel-rem">ALT</td>
        <td className="fuel-rem">QNH/QNE</td>
        <tr>
          <td>DIST</td>
          <td className="fuel-rem">TC</td>
        </tr>
        <tr>
          <td>RRESS</td>
          <td className="fuel-rem">TEMP</td>
        </tr>
        <tr>
          <td>WDIR</td>
          <td className="fuel-rem">WINT</td>
        </tr>
        <tr>
          <td>ISOLINE</td>
          <td className="fuel-rem">-E/+W</td>
        </tr>
        <td className="fuel-rem">RPM</td>
        <td className="fuel-rem">TAS</td>
        <td className="fuel-rem">TH</td>
        <td className="fuel-rem">MC</td>
        <td className="fuel-rem">WCA</td>
        <td className="fuel-rem">MH</td>
        <td className="fuel-rem">DEV</td>
        <td className="fuel-rem">CH</td>
        <tr>
          <td>LEG</td>
          <td className="fuel-rem">REM</td>
        </tr>
        <tr>
          <td>GSEST</td>
          <td className="fuel-rem">GSACT</td>
        </tr>
        <tr>
          <td>ETE</td>
          <td className="fuel-rem">ATE</td>
        </tr>
        <tr>
          <td>ETA</td>
          <td className="fuel-rem">ATA</td>
        </tr>
        <tr>
          <td>FUEL</td>
          <td className="fuel-rem">REM</td>
        </tr>
      </tbody>
    );
  }
  return rows;
  
};