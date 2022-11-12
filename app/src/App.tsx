import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './Home';
import { Host } from './Host';
import { Player } from './Player';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={< Home />}></Route>
        <Route path='/play/:gameId' element={<Player />}></Route>
        <Route path='/host/:gameId' element={<Host />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
