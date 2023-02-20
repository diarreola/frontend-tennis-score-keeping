import React from 'react';
import Card from 'react-bootstrap/Card';

const MatchButtons = ({match, matchPlayerId, getPlayerNameFromId}) => {
  console.log('match', match)
  // {match.player_a_id}
  const playerName = getPlayerNameFromId(matchPlayerId);
  console.log('playername', playerName);
  return (
    <Card>
      <Card.Header>Player name: {playerName}</Card.Header>
      <Card.Body>
        <button>Ace</button>
        <button>D.fault</button>
        <button>Winner</button>
        <button>U.error</button>
        <button>F.error</button>
      </Card.Body>
    </Card>
  )
}

export default MatchButtons