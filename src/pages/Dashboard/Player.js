import React from 'react';

function Player({id, firstName, lastName}) {
  return (
    <div>
      <li className="board-title">{firstName} {lastName}, id: {id}</li>
    </div>
  );
}

export default Player;