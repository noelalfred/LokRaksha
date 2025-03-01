import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './Login.js';
import Signup from './Signup.js';
import UserDashboard from './User/userdashboard.js';
import PoliceDashboard from './Police/police.js';
import AdminDashboard from './SuperAdmin/admin.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/UserDashBoard' element={<UserDashboard/>}></Route>
        <Route path='/PoliceDashBoard' element={<PoliceDashboard/>}></Route>
        <Route path='/AdminDashBoard' element={<AdminDashboard/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
