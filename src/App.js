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
      match_name: newMatchData.matchName
    };

    const newMatches = [...matches];
    newMatches.push(newMatch);
    setMatches(newMatches);
  };

  const getPlayerNameFromId = (playerId) => {
    let playerName = '';
    for (const player of players) {
      if (player.id === playerId) {
        playerName = player.first_name + ' ' + player.last_name
        return playerName
      }
    }
  };

  return (
    <div className="App">
      <Dashboard
      getPlayerNameFromId={getPlayerNameFromId}
      addPlayersCallBack={addPlayers}
      addMatchCallBack={addMatch}
      matches={matches}
      players={players}/>
    </div>
  );
}

export default App;
