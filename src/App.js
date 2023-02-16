/* eslint-disable camelcase */
import './App.css';
import { React, useState } from 'react';
import Dashboard from './pages/Dashboard/Dashboard'
import SignUp from './pages/Auth/SignUp';
import SignIn from './pages/Auth/SignIn';
import {Routes, Route} from 'react-router-dom'
import playersData from './data/player_data.json'
import matchesData from './data/past_matches.json'
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorModal from './components/ErrorModal';


function App() {
  const [players, setPlayers] = useState(playersData);
  const [matches, setMatches] = useState(matchesData);
  const [showModal, setShowModal] = useState({ show: false, message: '' });

  const handleClose = () => setShowModal({ show: false, message: '' });
  const handleShow = (errorMessage) =>
    setShowModal({ show: true, message: errorMessage });

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
      <AuthContextProvider>
        <Routes>
          <Route path='/' element={<SignIn onHandleShow={handleShow}/>} />
          <Route path='/signup' element={<SignUp onHandleShow={handleShow}/>} />
          <Route path='/dashboard' element={
            <ProtectedRoute>
              <Dashboard
                getPlayerNameFromId={getPlayerNameFromId}
                addPlayersCallBack={addPlayers}
                addMatchCallBack={addMatch}
                // onHandleShow={handleShow}
                matches={matches}
                players={players}/>
            </ProtectedRoute>}/>
        </Routes>
      </AuthContextProvider>
      <ErrorModal showModal={showModal} onHandleClose={handleClose} />
    </div>
  );
}

export default App;
