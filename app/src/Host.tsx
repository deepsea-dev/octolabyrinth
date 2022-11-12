import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MazeRenderer } from './components/MazeRenderer/MazeRenderer';
import { HostPollGameResponse } from './models/HostPollGameReponse';
import { queryApi } from './wrappedFetch';

export const Host: React.FC = () => {
  const { gameId } = useParams();

  const [gameData, setGameData] = useState<HostPollGameResponse | null>(null);

  const update = () => {
    queryApi<HostPollGameResponse>(`/api/${gameId}/status`)
      .then(res => setGameData(res));
  };

  useEffect(() => {
    const end = setInterval(update, 1000);
    return () => clearInterval(end);
  },[]);
  
  return (
    <div>
      <div>Host of game {gameId}</div>
      <div>Players, {gameData?.playerNames}</div>
      {gameData?.maze && <MazeRenderer maze={gameData?.maze}/>}
      <button>Start</button>
    </div>
  );
};