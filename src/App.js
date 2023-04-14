import logo from './logo.svg';
import './App.css';
import {Routes, Route, Outlet, Link} from 'react-router-dom'
import Layout from './layout/Layout.js'
import Home from './component/Home.js'
import BoardList from './component/BoardList';
import BoardWrite from './component/BoardWrite';
import BoardView from './component/BoardView';
import ScoreList from './component/ScoreList';
import HeroWrite from './component/hero/HeroWrite';
import HeroList from './component/hero/HeroList';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path="/board/list" element={<BoardList/>}/>
          <Route path="/board/write" element={<BoardWrite/>}/>
          <Route path="/board/view/:id" element={<BoardWrite/>}/>
          <Route path="/score/list" element={<ScoreList/>}/>
          <Route path="/hero/list" element={<HeroList/>}/>
          <Route path="/hero/write" element={<HeroWrite/>}/>
          <Route path="/hero/view/:id" element={<HeroWrite/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
