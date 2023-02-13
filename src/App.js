/* eslint-disable camelcase */
import './App.css';
import { React, useState } from 'react';
import Dashboard from './pages/Dashboard/Dashboard'
import playersData from './data/player_data.json'

function App() {
  const [players, setPlayers] = useState(playersData);
  // match state

  const addPlayers = (newPlayer) => {
    const newPlayers = [...players];

    // TODO: Remove when accessing API
    const nextId = Math.max(...newPlayers.map(player => player.id)) + 1;

    newPlayers.push({
        id: nextId,
        first_name: newPlayer.firstName,
        last_name: newPlayer.lastName,
        date_of_birth: newPlayer.dateOfBirth,
        utr: newPlayer.utr,
        serve_style: newPlayer.serveStyle
    });

    setPlayers(newPlayers);
  };

  return (
    <div className="App">
      <Dashboard addPlayersCallBack={addPlayers} players={players}/>
    </div>
  );
}

export default App;
