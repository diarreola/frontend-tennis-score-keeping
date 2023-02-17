import React from 'react';
import Card from 'react-bootstrap/Card';

const MatchButtons = () => {
  return (
    <Card>
      <Card.Header>Player name</Card.Header>
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