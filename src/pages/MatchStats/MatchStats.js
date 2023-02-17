import React from 'react';
import Table from 'react-bootstrap/Table';
import UserNavbar from '../../components/UserNavbar';

const MatchStats = ({onHandleLogout}) => {

  return (
    <section>
      <UserNavbar></UserNavbar>
      <Table striped bordered hover variant="dark">
        <tbody>
          <tr>
            <td>Player1</td>
            <th></th>
            <td>Player 2</td>
          </tr>
          <tr>
            <td>2</td>
            <th>Aces</th>
            <td>3</td>
          </tr>
          <tr>
            <td>1</td>
            <th>Double Faults</th>
            <td>0</td>
          </tr>
          <tr>
            <td>0</td>
            <th>U.Errors</th>
            <td>2</td>
          </tr>
          <tr>
            <td>1</td>
            <th>F.Errors</th>
            <td>3</td>
          </tr>
          <tr>
            <td>5</td>
            <th>Wins</th>
            <td>2</td>
          </tr>
          <tr>
            <td>2</td>
            <th>Sets Won</th>
            <td>1</td>
          </tr>
          <tr>
            <td>41</td>
            <th>Age</th>
            <td>40</td>
          </tr>
          <tr>
            <td>15.9</td>
            <th>UTR</th>
            <td>14.9</td>
          </tr>
        </tbody>
      </Table>
    </section>
  )
}

export default MatchStats