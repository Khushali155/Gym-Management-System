import React from 'react'
import Login from '../../components/Login/login';
import Signup from '../../components/Signup/signup';

const Home = () => {
    return (
        <div className='w-full h-[100vh]'>
            <div className='border-2 border-slate-800 bg-slate-800 text-white p-5 font-semibold text-xl'>
                Welcome to Gym Management System
            </div>
            <div className='w-full bg-cover flex justify-center h-[100%] bg-[url("https://media.istockphoto.com/id/625739874/photo/heavy-weight-exercise.jpg?s=612x612&w=0&k=20&c=B1uzJW1DBei2Rx5hnt139tt9dt3L7TbKrpgwbMR-LrI=")]'>
                <div className='w-full lg:flex gap-32'>

                    <Login />

                    <Signup />
                </div>


            </div>

        </div>
    )
}

export default Home