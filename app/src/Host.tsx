import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Header } from './components/Header/Header';
import { MazeRenderer } from './components/MazeRenderer/MazeRenderer';
import { HostPollGameResponse } from './models/HostPollGameReponse';
import { queryApi } from './wrappedFetch';
import { QRCodeSVG } from 'qrcode.react';

const useAudio = (url: string): [boolean, ()=>{}] => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  },[playing]);

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return [playing, toggle as ()=>{}];
};

export const Host: React.FC = () => {
  const { gameId } = useParams();

  const [gameData, setGameData] = useState<HostPollGameResponse | null>(null);

  const [playing, toggle] = useAudio('/waiting.mp3');

  useEffect(() => {
    console.log('toggle');
    toggle();
  }, []);

  useEffect(() => {
    const end = setInterval(update, 1000);
    return () => clearInterval(end);
  },[]);

  const update = () => {
    queryApi<HostPollGameResponse>(`/api/${gameId}/status`)
      .then(res => setGameData(res));
  };

  const startGame = () => {
    queryApi(`/api/${gameId}/start`);
  };

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
      {!gameData?.finished &&
      <><MidSection>
        {gameData?.maze && gameId && <MazeRenderer gameId={gameId}/>}
        {!gameData?.started &&
          <RulesColumn> 
            <QRCodeSVG width={384} height={384} value={`http://octolabyrinth.tech/play/${gameId}`}/>
            <div>Race to the center, each team controls a character but you each dont have all the directions! The furthest away team is elimated periodically</div>
          </RulesColumn>
        }
        <PlayerColumn>
          <div>Players: </div>
          {gameData?.playerNames.map(name => <span>{name}</span>)}
          {!gameData?.started && <StartButton onClick={startGame}>Start</StartButton>}
        </PlayerColumn>
      </MidSection>
      {gameData?.started &&
      <BottomSection>
        {gameData?.distances.map(d => (<div>{d[0]}: {d[1]}m</div>))}
        <div>{gameData?.distances[gameData?.distances.length-1][0]} elimination in {gameData?.timeUntilNextElimination} seconds!</div>
      </BottomSection>}
      {!gameData?.started && <BottomSection>
        Did you know that an octopus has 2 hearts?
      </BottomSection>}
      </>}
      {gameData?.finished && 
      <MidSection>
        <WinningSection>
          <h1>{gameData.winner} wins!</h1>
          <h2>Team members: </h2>
          {gameData.winningPlayers.map(name => <h3>{name}</h3>)}
        </WinningSection>
      </MidSection>}
    </HostContainer>
  );
};

const HostContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  max-height: 100%;
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

const WinningSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  column-gap: 16px;
  margin: 32px;
  border-radius: 24px;
  background-color: #F4F5F5;
  border: 4px solid #C9D6EA;
  padding: 32px;
  width: 600px;
  height: 600px;
  align-items: center;

  h1 {
    font-size: 60px;
  }

  h2 {
    font-size: 40px;
  }

  h3 {
    font-size: 35px;
  }
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
  align-items: center;
  min-width: 300px;
  max-width: 400px;
  overflow: hidden;
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
  align-items: center;
  font-weight: 900;
`;

const BottomSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: #C9D6EA;
  border-radius: 24px;
  border: 4px solid #C9D6EA;
  padding: 8px 64px;
  font-size: 32px;
  justify-content: space-around;
  font-weight: 900;
  margin: 0px 32px;
`;