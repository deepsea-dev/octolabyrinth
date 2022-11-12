import { useParams } from 'react-router-dom';

export const Host = () => {
  const { gameId } = useParams();

  return (
    <div>Host of game {gameId}</div>
  );
};