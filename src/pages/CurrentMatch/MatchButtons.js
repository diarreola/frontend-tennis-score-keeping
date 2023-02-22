import React from 'react';
import Card from 'react-bootstrap/Card';

const MatchButtons = ({ playerName, onAceClick, 
    onDFaultClick, onWinnerClick, onUErrorClick, onFErrorClick}) => {
  // total set 

  // need to handle creating -> 
  // ace, first serve -> wins point
  // api call -> creates a single set -> will need to create sets one by one -> (match routesline 109, add_new_set_to_match)
  // for each set, create num games -> add_new game to set, set routes, 139

  // clicking buttons -> call api in game routes update_game
  // d fault -> opponent wins point
  // winner -> wins point
  // u. error -> opponent wins point
  // f. error -> opponent wins points

  // how will i know when a game is over -> response body fro api call

  
  return (
    <Card>
      <Card.Header>Player name: {playerName}</Card.Header>
      <Card.Body>
        <button onClick={() => onAceClick(playerName)}>Ace</button>
        <button onClick={() => onDFaultClick(playerName)}>D.fault</button>
        <button onClick={() => onWinnerClick(playerName)}>Winner</button>
        <button onClick={() => onUErrorClick(playerName)}>U.error</button>
        <button onClick={() => onFErrorClick(playerName)}>F.error</button>
      </Card.Body>
    </Card>
  )
}

export default MatchButtons