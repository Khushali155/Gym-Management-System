
import './App.css';
import Sidebar from './components/Sidebar/sidebar';
import Dashboard from './pages/Dashboard/dashboard';
import Home from './pages/Home/home';
import {Routes , Route, useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react';
import Members from './pages/Members/members';
import GeneralUser from './pages/GeneralUser/generalUser';
import MemberDetail from './pages/MemberDetail/memberDetail';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false)

  useEffect(()=>{
    let isLogedIn = localStorage.getItem("isLogin");
    if(isLogedIn){
      setIsLogin(true);
       navigate('/dashboard')

    }else{
      setIsLogin(false)
      navigate('/');
    }
 
  },[localStorage.getItem("isLogin")])

  return (
    <div className="flex">
      {
        isLogin && <Sidebar/>
      }
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/members' element={<Members/>}/>
        <Route path='/specific/:page' element={<GeneralUser/>}/>
        <Route path='/members/:id' element={<MemberDetail/>}/>

      </Routes>
     
    </div>
  );
}

export default App;
