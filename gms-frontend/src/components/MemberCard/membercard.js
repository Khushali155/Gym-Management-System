import React from 'react'
import CircleIcon from '@mui/icons-material/Circle';
import { Link } from 'react-router-dom';

const Membercard = ({item}) => {
    return (
        <Link to={`/members/${item?._id}`} className='bg-slate-800 rounded-lg p-3 hover:bg-orange-500 text-white cursor-pointer'>
            <div className='w-28 h-28 flex justify-center relative items-center border-2 p-1 mx-auto rounded-full'>
                <img className='w-full h-full rounded-full' src={item?.profilepic} alt='img' />
                <CircleIcon className='absolute top-0 left-0' sx={{ color: item?.status==="Active"?"greenyellow":"red" }} />
            </div>

            <div className='mx-auto mt-5 text-center text-xl font-semibold font-mono'>
                {item?.name}
            </div>
            <div className='mx-auto  mt-2 text-center text-xl font-mono'>
                {"+91 " + item?.mobileNo}
            </div>
            <div className='mx-auto  mt-2 text-center text-xl font-mono'>
                Next bill date : {item?.nextBillDate.slice(0,10).split('-').reverse().join('-')}
            </div>

        </Link>
    )
}

export default Membercard