import React from 'react';
import styled from 'styled-components';

export const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <span>OCTOLABYRINTH</span> 
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  background-color: red
`;