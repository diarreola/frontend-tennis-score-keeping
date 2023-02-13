import React from 'react';
import Player from './Player';
import Card from 'react-bootstrap/Card';

function PlayerList(props) {
  const playerComponents = props.players.map((player) => {
    return (
        <div key={player.id}>
            <Player
              id={player.id}
              firstName={player.first_name}
              lastName={player.last_name}
            />
        </div>
      );
  });

  return (
    <section>
      <Card>
        <Card.Header>Players</Card.Header>
        <Card.Body>
        <ol className="player-list">{playerComponents}</ol>
        </Card.Body>
      </Card>
    </section>
  );
}

export default PlayerList;
