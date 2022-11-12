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
  background-color: #663F46;
  height: 60px;
  font-size: 32px;
  color: #E8F7EE;
  font-weight: 900;
  padding: 16px 32px;
  vertical-align: middle;
`;