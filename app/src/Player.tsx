import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PlayerPollGameResponse } from './models/PlayerPollGameResponse';
import { queryApi } from './wrappedFetch';

export const Player = () => {
  const { gameId } = useParams();

  const [nameIsSet, setNameIsSet] = useState(false);
  const [playerName, setPlayerName] = useState<string>('');
  const [moves, setMoves] = useState<string[]>([]);

  const [playerId, setPlayerId] = useState<string | null>(null);

  const submitName = () => {
    if (playerName.length == 0) return;
    setNameIsSet(true);
    queryApi<{player_id: string}>(`/api/${gameId}/join`, 'POST', {nickname: playerName}).then((res) => setPlayerId(res.player_id));
  };

  const update = () => {
    queryApi<PlayerPollGameResponse>(`/api/${gameId}/${playerId}`)
      .then(res => setMoves(res.moves));
  };

  useEffect(() => {
    const end = setInterval(update, 1000);
    return () => clearInterval(end);
  },[playerId]);
  

  if (!nameIsSet) {
    return (
      <div>
        <div>Enter your name: </div>
        <input onChange={e => setPlayerName(e.target.value)} value={playerName}/>
        <button onClick={submitName}>submit</button>
      </div>
    );
  }

  if (playerId == null) {
    return (
      <div>Joining the game...</div>
    );
  }

  return (
    <div>
      <div>PLAYER of game {gameId} with id {playerId}</div>
      <div>Moves: {moves}</div>
    </div>
  );
};