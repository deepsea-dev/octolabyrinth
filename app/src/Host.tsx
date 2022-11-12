import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MazeRenderer } from './components/MazeRenderer/MazeRenderer';
import { HostPollGameResponse } from './models/HostPollGameReponse';

export const Host = () => {
  const { gameId } = useParams();

  const [gameData, setGameData] = useState<HostPollGameResponse | null>(null);

  useEffect(() => {
    setGameData({
      maze: {grid: [
        [0,1,0,0,0,1],
        [0,1,1,0,1,1],
        [1,0,0,0,0,1],
        [0,0,1,1,0,1],
        [0,1,0,0,0,1]
      ]},
      playerNames: ['BW', 'Harry'],
      started: false
    });
  }, []);

  return (
    <div>
      <div>Host of game {gameId}</div>
      <div>Players, {gameData?.playerNames}</div>
      {gameData?.maze && <MazeRenderer maze={gameData?.maze}/>}
    </div>
  );
};