import './styles.css';

// helpers.jsx
export const GenerateRows = (rowCount) => {
    const rows = [];
    for (let i = 0; i < rowCount; i++) {
        rows.push(
            <tbody key={i} className="row-container">
            <tr>
              <td>FROM</td>
              <td className="fuel-rem">FUEL</td>
            </tr>
            <tr>
              <td className="fuel-rem">ALT</td>
            </tr>
            <tr>
              <td>TO</td>
              <td className="fuel-rem">REM</td>
            </tr>
          </tbody>
        );
    }
    return rows;
};
