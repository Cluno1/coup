
import './App.css';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';
import Room from './pages/room';
import Test from './pages/test';


function App() {

  function adjustHeight() {
    var vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  
  window.addEventListener('resize', adjustHeight);
  adjustHeight(); // 初始化调用
  
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
