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
        <input placeholder='enter game code' onChange={(e) => setGameCode(e.target.value)} value={gameCode}></input>
        <ActionButton onClick={joinGame}>Join</ActionButton>
      </JoinContainer>
      <ActionButton onClick={createGame}>Create</ActionButton>
    </JoinAndCreateContainer>
  );
};

const JoinAndCreateContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const JoinContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: green;
`;

const ActionButton = styled.button`
  width: 400px;
  height: 200px;
`;