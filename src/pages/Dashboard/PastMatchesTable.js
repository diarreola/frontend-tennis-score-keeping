import React from 'react';
import Table from 'react-bootstrap/Table';
import PastMatchesRow from './PastMatchesRow';

function PastMatchesTable(props) {
  const matchComponents = props.matches.map((match) => {
    return (
        <tr key={match.id}>
            <PastMatchesRow
              id={match.id}
              matchDate={match.match_date}
              matchName={match.match_name}
              matchPlayerA={props.getPlayerNameFromId(match.player_a)}
              matchPlayerB={props.getPlayerNameFromId(match.player_b)}
            />
        </tr>
      );
  });
  console.log('matchcomp',)
  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Name</th>
          <th>Date</th>
          <th>Player A</th>
          <th>Player B</th>
        </tr>
      </thead>
      <tbody className="past-matches-table">
        {matchComponents}
      </tbody>
    </Table>
  );
}

export default PastMatchesTable;