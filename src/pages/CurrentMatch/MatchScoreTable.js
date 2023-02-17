import React from 'react';
import Table from 'react-bootstrap/Table';

const MatchScoreTable = () => {
  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Players</th>
          <th>sets</th>
          <th>sets</th>
          <th>game</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>player a</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>player b</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
      </tbody>
    </Table>
  )
}

export default MatchScoreTable