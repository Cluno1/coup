
import './App.css';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import GameBoard from './pages/room/gameBoard';
import Home from './pages/home';
import Room from './pages/room';
import Test from './pages/test';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<Login/>} />  //用法
        <Route path='/register' element={<Register/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/room' element={<Room/>} />
        <Route path='/test' element={<Test/>} />

        
      </Routes>
    </div>
  );
}

export default App;
