import React from 'react';
import PropTypes from 'prop-types';

function Player({id, firstName, lastName}) {

  return (
    <div>
      
      <li className="board-title">{firstName} {lastName}, id: {id}</li>
    </div>
  );
}

Player.propTypes = {
  id: PropTypes.number.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
};

export default Player;