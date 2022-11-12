import React from 'react';
import styled from 'styled-components';

type NameDisplayerProps = {
  name: string
}

export const NameDisplayer: React.FC<NameDisplayerProps> = ({ name }) => {
  return (
    <NameContainer>
      Our name is: { name }
    </NameContainer>
  );
};

const NameContainer = styled.div`
  color: red
`;