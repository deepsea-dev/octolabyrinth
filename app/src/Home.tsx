import styled from 'styled-components';
import { Header } from './components/Header/Header';
import { JoinAndCreate } from './components/JoinAndCreate/JoinAndCreate';

export const Home: React.FC = () => (
  <div>
    <Header></Header>
    <JoinAndCreate></JoinAndCreate>
  </div>
);

const JoinAndCreateContainer = styled.div`
  display: flex;
`;