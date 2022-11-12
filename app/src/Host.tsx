import { useParams } from 'react-router-dom';
import { Maze } from './components/MazeRenderer/Maze';

export const Host = () => {
  const { gameId } = useParams();

  return (
    <div>
      <div>Host of game {gameId}</div>
      <Maze/>
    </div>
  );
};