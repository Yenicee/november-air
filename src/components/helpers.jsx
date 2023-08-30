import './styles.css';

// helpers.js
export const GenerateRows = (rowCount) => {
    const rows = [];
    for (let i = 0; i < rowCount; i++) {
        rows.push(
            <tr key={i}>
        <td>{i + 1}</td>
        <td>FROM</td>
        <td>TO</td>
        <td>FUEL</td>
        <td>REM</td>
        </tr>
        );
    }
    return rows;
};