import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Header } from './components/Header/Header';
import { MazeRenderer } from './components/MazeRenderer/MazeRenderer';
import { HostPollGameResponse } from './models/HostPollGameReponse';
import { queryApi } from './wrappedFetch';
import { QRCodeSVG } from 'qrcode.react';

export const Host: React.FC = () => {
  const { gameId } = useParams();

  const [gameData, setGameData] = useState<HostPollGameResponse | null>(null);

  const update = () => {
    queryApi<HostPollGameResponse>(`/api/${gameId}/status`)
      .then(res => setGameData(res));
  };

  const startGame = () => {
    queryApi(`/api/${gameId}/start`);
  };

  useEffect(() => {
    const end = setInterval(update, 1000);
    return () => clearInterval(end);
  },[]);
  
  return (
    <HostContainer>
      <HeaderWrapper>
        <Header/>
        <JoinContainer>
          <UrlContainer>
            {gameData?.started ? 'Game in progress!' : (<>Join at <UrlSpan>{`octolabyrinth.tech/play/${gameId}`}</UrlSpan></>)}
          </UrlContainer>
        </JoinContainer>
      </HeaderWrapper>
      <MidSection>
        {gameData?.maze && gameId && <MazeRenderer gameId={gameId}/>}
        {!gameData?.started &&
          <RulesColumn>yarn 
            <QRCodeSVG value={`http://octolabyrinth.tech/play/${gameId}`}/>
            <div>Race to the center, each team controls a character but you each dont have all the directions!</div>
          </RulesColumn>
        }
        <PlayerColumn>
          <div>Players: </div>
          {gameData?.playerNames.map(name => <span>{name}</span>)}
          {!gameData?.started && <StartButton onClick={startGame}>Start</StartButton>}
        </PlayerColumn>
      </MidSection>
    </HostContainer>
  );
};

const HostContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  width: 100%;
`;

const UrlContainer = styled.div`
  background-color: #C9D6EA;
  border-radius: 24px;
  border: 4px solid #C9D6EA;
  padding: 16px 64px;
  font-size: 24px;
`;

const UrlSpan = styled.span`
  font-size: 30px;
  font-style: italic;
  text-decoration: underline;
`;

const JoinContainer = styled.div`
  flex-grow: 1;
  display: flex;
  background-color: #663F46;
  align-content: center;
  align-items: center;
  justify-content: space-around;
`;

const MidSection = styled.div`
  display: flex;
  justify-content: space-around;
  column-gap: 16px;
  margin: 32px;
`;

const PlayerColumn = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #C9D6EA;
  border-radius: 24px;
  border: 4px solid #C9D6EA;
  padding: 16px 64px;
  font-size: 24px;
  justify-content: space-between;
`;

const StartButton = styled.button`
  font-size: 30px;
  width: 200px;
  height: 80px;
  border-radius: 24px;
  background-color: #E98A15;
`;

const RulesColumn = styled.button`
  display: flex;
  flex-direction: column;
  background-color: #C9D6EA;
  border-radius: 24px;
  border: 4px solid #C9D6EA;
  padding: 8px 64px;
  font-size: 32px;
  justify-content: space-around;
  font-weight: 900;
`;