import React, { useState , useEffect} from 'react'
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link , useLocation , useNavigate} from 'react-router-dom';

const Sidebar = () => {

    const [greeting, setGreeting] = useState("");
    const location = useLocation();// get the current location
    const navigate = useNavigate();
    const greetingMessage = () => {    

        const currentHour = new Date().getHours();
        if (currentHour < 12) {
            setGreeting("Good Morning 🌞");
        } else if (currentHour < 18) {
            setGreeting("Good Afternoon ☀️");
        } else if (currentHour < 21) {
            setGreeting("Good Evening 🌝");
        } else {
            setGreeting("Good Night 🌛");
        }
    }

    useEffect(()=>{
        greetingMessage()
    },[])

    const handleLogout = async()=>{
        localStorage.clear();
        navigate('/');
    }

return (
    <div className='w-1/4  h-[100vh] border-2 bg-slate-800 text-white p-5 font-extralight'>
        <div className='text-center  text-3xl'>
            {localStorage.getItem('gymName')}
        </div>
        <div className='flex gap-5 my-5'>
            <div className='w-[100px] h-[100px] rounded-lg'>
                <img alt='gym pic' className='w-full h-full rounded-full' src={localStorage.getItem("gympic")} />
            </div>
            <div>
                <div className='text-2xl'>{greeting}</div>
                <div className='text-2xl font-semibold mt-1'>admin</div>
            </div>
        </div>

        <div className='mt-10 py-10  border-t-2 border-gray-500'>
            <Link to='/dashboard' className={`flex  item-center gap-5 font-semibold text-xl bg-slate-600 p-3 rounded-xl cursor-pointer hover:bg-orange-500 hover:border-2 ${location.pathname==="/dashboard"?'border-2 bg-orange-600':null}`}>
                <div ><HomeIcon /></div>
                <div>Dashboard</div>
            </Link>

            <Link to='/members' className={`flex  item-center  mt-5 gap-5 font-semibold text-xl bg-slate-600 p-3 rounded-xl cursor-pointer  hover:bg-orange-500 hover:border-2 ${location.pathname==="/members"?'border-2 bg-orange-600':null}`}>
                <div ><PeopleAltIcon /></div>
                <div>Members</div>
            </Link>

            <div onClick={()=>{handleLogout()}} className={`flex  item-center mt-5 gap-5 font-semibold text-xl bg-slate-600 p-3 rounded-xl cursor-pointer hover:bg-orange-500 hover:border-2`}>
                <div ><LogoutIcon /></div>
                <div>logout</div>
            </div>


        </div>
    </div>
)
}

export default Sidebar