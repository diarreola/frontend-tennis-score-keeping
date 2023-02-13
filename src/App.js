/* eslint-disable camelcase */
import './App.css';
import { React, useState } from 'react';
import Dashboard from './pages/Dashboard/Dashboard'
import playersData from './data/player_data.json'
import matchesData from './data/past_matches.json'

function App() {
  const [players, setPlayers] = useState(playersData);
  const [matches, setMatches] = useState(matchesData);

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

  const addMatch = (newMatchData) => {
    const newMatch = {
      player_a: newMatchData.playerA,
      player_b: newMatchData.playerB,
      no_of_sets: newMatchData.numSets,
      no_of_gamesperset: newMatchData.numGames,
      match_date: newMatchData.matchName
    };
    // TODO: Grab player name by id -> :)
    // TODO: cast sets/game by int

    const newMatches = [...matches];
    newMatches.push(newMatch);
    setMatches(newMatches);
  };

  return (
    <div className="App">
      <Dashboard
      addPlayersCallBack={addPlayers}
      addMatchCallBack={addMatch}
      players={players}/>
    </div>
  );
}

export default App;
