import { useParams } from 'react-router-dom';

export const Player = () => {
  const { gameId } = useParams();

  return (
    <div>PLAYER of game {gameId}</div>
  );
};