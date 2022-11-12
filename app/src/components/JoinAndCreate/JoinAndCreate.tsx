import React, { useState } from 'react';
import styled from 'styled-components';
import { CreateGameResponse } from '../../models/CreateGameResponse';
import { queryApi } from '../../wrappedFetch';

type GameCode = string

export const JoinAndCreate: React.FC = () => {
  const createGame = () => {
    queryApi<CreateGameResponse>('/api/create_game').then((res) => {
      setGameCode(res.id);
    }).catch((err) => {});

  };

  const [gameCode, setGameCode] = useState<GameCode>('');

  return (
    <JoinAndCreateContainer>
      <JoinContainer>
        <input placeholder='enter game code' onChange={(e) => setGameCode(e.target.value)} value={gameCode}></input>
        <ActionButton>Join</ActionButton>
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