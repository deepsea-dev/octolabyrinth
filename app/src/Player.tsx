import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { PlayerPollGameResponse } from './models/PlayerPollGameResponse';
import { queryApi } from './wrappedFetch';

const moveMap: Record<string, string> = {'U': 'Up', 'D': 'Down', 'L': 'Left', 'R': 'Right'};

export const Player = () => {
  const { gameId } = useParams();

  const [nameIsSet, setNameIsSet] = useState(false);
  const [playerName, setPlayerName] = useState<string>('');
  const [moves, setMoves] = useState<string[]>([]);
  const [teamColour, setTeamColour] = useState<string>('');

  const [playerId, setPlayerId] = useState<string | null>(null);

  const submitName = () => {
    if (playerName.length == 0) return;
    setNameIsSet(true);
    queryApi<{player_id: string}>(`/api/${gameId}/join`, 'POST', {nickname: playerName}).then((res) => setPlayerId(res.player_id));
  };

  const update = () => {
    queryApi<PlayerPollGameResponse>(`/api/${gameId}/${playerId}`)
      .then(res => {
        setMoves(res.moves);
        setTeamColour(res.teamColour);
      });
  };

  useEffect(() => {
    const end = setInterval(update, 1000);
    return () => clearInterval(end);
  },[playerId]);

  const sendMove = (direction: string) => {
    queryApi(`/api/${gameId}/${playerId}/move`, 'POST', { move: direction });
  };
  

  if (!nameIsSet) {
    return (
      <NameEntryDiv>
        <NameEntry placeholder='name' onChange={e => setPlayerName(e.target.value)} value={playerName}/>
        <SubmitButton onClick={submitName}>submit</SubmitButton>
      </NameEntryDiv>
    );
  }

  if (playerId == null) {
    return (
      <JoiningGameContainer>Joining the game...</JoiningGameContainer>
    );
  }

  if (moves.length == 0) {
    return (
      <JoiningGameContainer>Waiting for the game to start...</JoiningGameContainer>
    );
  }

  return (
    <ControllerDiv>
      <div>You're on the <span>{teamColour}</span> team!</div>
      <div>Moves:</div>
      {moves.map(move => <MoveButton onClick={() => sendMove(move)}>{moveMap[move]}</MoveButton>)}
    </ControllerDiv>
  );
};

const NameEntryDiv = styled.div`
  border-radius: 24px;
  background-color: #F4F5F5;
  border: 4px solid #C9D6EA;
  padding: 32px;
  margin: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  row-gap: 16px;
`;

const NameEntry = styled.input`
  font-size: 30px;
  height: 60px;
  border-radius: 24px;
  padding: 16px
`;

const SubmitButton = styled.button`
  font-size: 30px;
  height: 80px;
  border-radius: 24px;
  background-color: #E98A15;
`;

const JoiningGameContainer = styled.div`
  border-radius: 24px;
  background-color: #F4F5F5;
  border: 4px solid #C9D6EA;
  padding: 32px;
  margin: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  row-gap: 16px;
  font-size: 32px;
`;

const ControllerDiv = styled.div`
  border-radius: 24px;
  background-color: #F4F5F5;
  border: 4px solid #C9D6EA;
  padding: 32px;
  margin: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  row-gap: 16px;
  font-size: 32px;
`;

const MoveButton = styled.button`
  font-size: 30px;
  height: 80px;
  border-radius: 24px;
  background-color: #E98A15;
`;