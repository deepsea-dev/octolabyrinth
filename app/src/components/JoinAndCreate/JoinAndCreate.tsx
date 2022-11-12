import React, { useState } from 'react';
import styled from 'styled-components';
import { CreateGameResponse } from '../../models/CreateGameResponse';
import { queryApi } from '../../wrappedFetch';
import { useNavigate } from 'react-router-dom';

type GameCode = string

export const JoinAndCreate: React.FC = () => {
  const navigate = useNavigate();

  const createGame = () => {
    queryApi<CreateGameResponse>('/api/create_game').then((res) => {
      navigate(`/host/${res.id}`);
    }).catch((err) => {});
  };

  const joinGame = () => {
    navigate(`/play/${gameCode}`);
  };

  const [gameCode, setGameCode] = useState<GameCode>('');

  return (
    <JoinAndCreateContainer>
      <JoinContainer>
        <CodeEntry placeholder='enter game code' onChange={(e) => setGameCode(e.target.value)} value={gameCode}></CodeEntry>
        <ActionButton onClick={joinGame}>Join</ActionButton>
      </JoinContainer>
      <CreateContainer>
        <ActionButton onClick={createGame}>Create</ActionButton>
      </CreateContainer>
    </JoinAndCreateContainer>
  );
};

const JoinAndCreateContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  align-items: center;
  row-gap: 32px;
  column-gap: 32px;
  margin: 32px;

  flex-direction: row;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const CodeEntry = styled.input`
  font-size: 30px;
  height: 80px;
  border-radius: 24px;
  padding: 16px
`;

const JoinContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  row-gap: 32px;
  max-width: 300px;
  background-color: #3C362A;
  padding: 32px;
  border-radius: 32px;
  border: 4px solid #C9D6EA;
  height: 300px
`;

const CreateContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  row-gap: 32px;
  max-width: 300px;
  background-color: #3C362A;
  padding: 32px;
  border-radius: 32px; 
  border: 4px solid #C9D6EA;
  height: 300px
`;

const ActionButton = styled.button`
  font-size: 30px;
  width: 300px;
  height: 100px;
  border-radius: 24px;
  background-color: #E98A15;
`;