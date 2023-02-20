import React from 'react';
import Table from 'react-bootstrap/Table';
import MatchScoreSetCol from './MatchScoreSetCol';
import MatchScoreSetRow from './MatchScoreSetRow';

const MatchScoreTable = ({match, playerAName, playerBName}) => {
  // get sets, create dynamic sets
  const numSets = match.no_of_sets;
  const numGames = match.no_of_gamesperset;

  const numSetCols = () => {
    let set = 0;
    let setComponent = [];
    for (let i = 0; i < numSets; i++) {
      set += 1;
      setComponent.push(
        <th key={set}>
          <MatchScoreSetCol set={set}></MatchScoreSetCol>
        </th>
      );
    }
    return setComponent;
  }

  const setColComponents = numSetCols();

  const numSetRows = () => {
    let setVal = '-';
    let setComponent = [];
    for (let i = 0; i < numSets; i++) {
      setComponent.push(
        <td key={i}>
          <MatchScoreSetRow setVal={setVal}></MatchScoreSetRow>
        </td>
      );
    }
    return setComponent;
  }

  const setRowComponentsPlayerA = numSetRows();
  const setRowComponentsPlayerB = numSetRows();

  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Players</th>
          {setColComponents}
          <th>game</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>player a:{playerAName}</td>
          {setRowComponentsPlayerA}
          <td>-</td>
        </tr>
        <tr>
          <td>player b: {playerBName}</td>
          {setRowComponentsPlayerB}
          <td>-</td>
        </tr>
      </tbody>
    </Table>
  )
}

export default MatchScoreTable