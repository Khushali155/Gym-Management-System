import React, { useEffect, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import Membercard from '../../components/MemberCard/membercard';
import { getMonthlyJoined } from './data';
import { threeDayExpire } from './data';
import { fourToSevesExpirenDay } from './data';
import { expiredMember } from './data';
import { inactiveMember } from './data';

const GeneralUser = () => {
    const [header, setHeader] = useState("");
    const [data, setData] = useState([]);

    useEffect(() => {
        const func = sessionStorage.getItem('func');
        functionCall(func)

    }, [])

    const functionCall = async (func) => {
        switch (func) {
            case "MonthlyJoined":
                setHeader("Monthly joined Members")
                var datas = await getMonthlyJoined();
                setData(datas.members);
                break;

            case "threeDayExpire":
                setHeader("Expiring within 3 days")
                var datas = await threeDayExpire();
                setData(datas.members);
                break;

            case "FourToSevenDaysExpire":
                setHeader("Expiring within 4-7 days")
                var datas = await fourToSevesExpirenDay();
                setData(datas.members);
                break;

            case "Expired":
                setHeader("Expired")
                var datas = await expiredMember();
                setData(datas.members);
                break;

            case "InactiveMember":
                setHeader("Inactive Members")
                var datas = await inactiveMember();
                setData(datas.members);
                break;

            default:
                break;
        }

    }

    return (
        <div className='text-black p-5 w-3/4 flex-col'>
            <div className='border-2 bg-slate-900 flex justify-between w-full text-white rounded-lg p-3'>
                <Link to={'/dashboard'} className='border-2 pl-3 pr-3 pt-1 pb-1 rounded-2xl cursor-pointer hover:bg-orange-500'>
                    <ArrowBackIcon /> Back To Dashboard

                </Link>

            </div>

            <div className='mt-5 text-xl text-slate-900'>
                {header}
            </div>

            <div className='bg-slate-100 p-5 mt-5 rounded-lg grid grid-cols-1 gap-2 md:grid-cols-3 overflow-x-auto h-[80%]'>
                {
                    data.map((item,index) => {
                        return (
                            <Membercard  item={item}/>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default GeneralUser