import { useState, useEffect, useRef } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Link } from 'react-router-dom';


const Dashboard = () => {

  const [accordianDashboard, setAccordianDashboard] = useState(false);
  const ref = useRef();

  useEffect(() =>{

   const checkIfClickedOutside = e => {
    if (accordianDashboard && ref.current && !ref.current.contains(e.target)) {
      setAccordianDashboard(false);
    }
  }
    document.addEventListener("mousedown", checkIfClickedOutside)
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }

  }, [accordianDashboard])

  const handleOnClickMenu = (value)=>{
    sessionStorage.setItem('func',value);
  }

  return (
    <div className='w-3/4 text-white p-5 relative bg-gray-800  '>
      <div className='w-full bg-slate-600 text-white rounded-lg flex p-3 justify-between items-center'>
        <MenuIcon sx={{ cursor: "pointer" }} onClick={() => { setAccordianDashboard(prev => !prev) }} />
        <img className='w-8 h-8 rounded-3xl border-2' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_htroJiQ3_Z2woeWOS-n4DG9f-4UHoVF_Rw&s' alt='img' />
      </div>


      {
        accordianDashboard && <div ref={ref} className='absolute p-3 bg-slate-900 text-white rounded-xl text-lg font-extralight'>
          <div>Hello Welcome to our Gym Management System.</div>
          <p>Feel free to ask any querries</p>
        </div>
      }


      <div className='mt-5 pt-3 bg-slate-600 bg-opacity-50 grid gap-5 grid-cols-3 w-full pb-5 overflow-x-auto h-[80%]'>

        {/* //this is card block */}
        <Link to={'/members'} className='w-full h-fit border-2 bg-slate-600 rounded-lg cursor-pointer'>
          <div className='h-3 rounded-t-lg bg-orange-500'></div>

          <div className='py-7 px-5  flex flex-col justify-center items-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white '>
            <PeopleAltIcon sx={{ color: "white", fontSize: "50px" }} />
            <p className='text-xl my-3 font-semibold font-serif'>Joined Members</p>
          </div>
        </Link>

        <Link to={'/specific/monthly-joined'} onClick={()=>handleOnClickMenu("MonthlyJoined")} className='w-full h-fit border-2 bg-slate-600 rounded-lg cursor-pointer'>
          <div className='h-3 rounded-t-lg bg-orange-500'></div>

          <div className='py-7 px-5  flex flex-col justify-center items-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white '>
            <SignalCellularAltIcon sx={{ color: "white", fontSize: "50px" }} />
            <p className='text-xl my-3 font-semibold font-serif'>Monthly Joined</p>
          </div>
        </Link>

        <Link to={'/specific/expire-within-3-days'} onClick={()=>handleOnClickMenu("threeDayExpire")} className='w-full h-fit border-2 bg-slate-600 rounded-lg cursor-pointer'>
          <div className='h-3 rounded-t-lg bg-orange-500'></div>

          <div className='py-7 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white '>
            <AccessAlarmIcon sx={{ color: "white", fontSize: "50px" }} />
            <p className='text-xl my-3 font-semibold font-serif'>Expiring within 3 days</p>
          </div>
        </Link>

        <Link to={'/specific/expiring-within-4-to-7-days'} onClick={()=>handleOnClickMenu("FourToSevenDaysExpire")} className='w-full h-fit border-2 bg-slate-600 rounded-lg cursor-pointer'>
          <div className='h-3 rounded-t-lg bg-orange-500'></div>

          <div className='py-7 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white '>
            <AccessAlarmIcon sx={{ color: "white", fontSize: "50px" }} />
            <p className='text-xl my-3 font-semibold font-serif'>Expiring within 4-7 days</p>
          </div>
        </Link>

        <Link to={'/specific/expired'} onClick={()=>handleOnClickMenu("Expired")} className='w-full h-fit border-2 bg-slate-600 rounded-lg cursor-pointer'>
          <div className='h-3 rounded-t-lg bg-orange-500'></div>

          <div className='py-7 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white '>
            <ErrorOutlineIcon sx={{ color: "white", fontSize: "50px" }} />
            <p className='text-xl my-3 font-semibold font-serif'>Expired</p>
          </div>
        </Link>

        <Link to={'/specific/inactive-members'} onClick={()=>handleOnClickMenu("InactiveMember")} className='w-full h-fit border-2 bg-slate-600 rounded-lg cursor-pointer'>
          <div className='h-3 rounded-t-lg bg-orange-500'></div>

          <div className='py-7 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white '>
            <ReportGmailerrorredIcon sx={{ color: "white", fontSize: "50px" }} />
            <p className='text-xl my-3 font-semibold font-serif'>Inactive Members</p>
          </div>
        </Link>

      </div>

      <div className='md:bottom-4 p-4 w-3/4 mb-4 md:mb-0 absolute bg-slate-700 text-white mt-20 rounded-xl text-xl'>
        contact Developer for any Technical Error at +910000000000
      </div>


    </div>
  )
}

export default Dashboard