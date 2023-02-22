import React from 'react';
import Table from 'react-bootstrap/Table';
import MatchScoreSetCol from './MatchScoreSetCol';
import MatchScoreSetRow from './MatchScoreSetRow';

const MatchScoreTable = ({match, playerA, playerB, playerAPoints,
    playerBPoints, playerASetWins, playerBSetWins}) => {
  // Add game number to table!, dynamically
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

  const numSetRows = (playerSetWins) => {
    let setVal = '-';
    let setComponent = [];
    for (let i = 0; i < numSets; i++) {
      setComponent.push(
        <td key={i}>
          <MatchScoreSetRow setVal={i < playerSetWins.length ? playerSetWins[i] : setVal}></MatchScoreSetRow>
        </td>
      );
    }
    return setComponent;
  }

  const numSetGameRow = (playerPoints) => {
    let setComponent = []
    setComponent.push(
      <td key={1}>
        <MatchScoreSetRow setVal={playerPoints}></MatchScoreSetRow>
      </td>);
    return setComponent;
  }

  const setRowComponentsPlayerA = numSetRows(playerASetWins);
  const setRowComponentsPlayerAGame = numSetGameRow(playerAPoints);
  const setRowComponentsPlayerB = numSetRows(playerBSetWins);
  const setRowComponentsPlayerBGame = numSetGameRow(playerBPoints);

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
          <td>player a: {playerA}</td>
          {setRowComponentsPlayerA}
          {setRowComponentsPlayerAGame}
        </tr>
        <tr>
          <td>player b: {playerB}</td>
          {setRowComponentsPlayerB}
          {setRowComponentsPlayerBGame}
        </tr>
      </tbody>
    </Table>
  )
}

export default MatchScoreTable