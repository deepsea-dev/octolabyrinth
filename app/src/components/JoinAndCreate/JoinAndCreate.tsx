import React from 'react';
import styled from 'styled-components';

export const JoinAndCreate: React.FC = () => {
  return (
    <JoinAndCreateContainer>
      <JoinContainer>
        <input placeholder='enter game code'></input>
        <ActionButton>Join</ActionButton>
      </JoinContainer>
      <ActionButton>Create</ActionButton>
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