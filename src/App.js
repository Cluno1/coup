
import './App.css';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<Login/>} />  //用法
        <Route path='/register' element={<Register/>} />
        <Route element={<Layout/>} >  //子路由管理
          <Route path='/project' element={<Project/>} />
          <Route path='/project/:id/kanban' element={<Kanban/>} />
          <Route path='/project/:id/epic' element={<Epic/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
