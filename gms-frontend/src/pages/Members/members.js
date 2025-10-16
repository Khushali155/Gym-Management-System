import React, { useEffect } from 'react'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Membercard from '../../components/MemberCard/membercard';
import { useState } from 'react';
import Modal from '../../components/Modal/modal';
import Addmembership from '../../components/Addmembership/addmembership';
import Addmember from '../../components/Addmember/addmember';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
const Members = () => {
    const [addMembership, setAddmembership] = useState(false)
    const [addMember, setAddmember] = useState(false)
    const [data, setData] = useState([]);
    const [skip, setSkip] = useState(0);
    const [search, setSearch] = useState("");
    const [isSearchModeOn, setIsSearchModeOn] = useState(false);

    const [currentpage, setCurrentpage] = useState(1);

    const [startForm, setStartFrom] = useState(0);
    const [endTo, setEntTo] = useState(9);
    const [totalData, setTotalData] = useState(0);
    const [limit, setLimit] = useState(9);

    const [noOfPage, setNoOfpage] = useState(0);


    useEffect(() => {
        fetchData(0, 9);
    }, [])

    const fetchData = async (skip, limits) => {

        await axios.get(`http://localhost:4000/members/allMember?skip=${skip}&limit=${limits}`, { withCredentials: true }).then((response) => {
            console.log(response)
            let totalData = response.data.totalMembers;
            setTotalData(totalData);
            const members = response.data?.Members ?? response.data?.members ?? response.data?.data ?? [];
            setData(Array.isArray(members) ? members : []);



            let extraPage = totalData % limit === 0 ? 0 : 1;
            let totalPage = parseInt(totalData / limit) + extraPage;
            setNoOfpage(totalPage);

            if (totalData === 0) {
                setStartFrom(-1);
                setEntTo(0);
            } else if (totalData < 10) {
                setStartFrom(0);
                setEntTo(totalData);
            }
        }).catch(err => {
            toast.error("Something went wrong");
            console.log(err);
        })

    }

    const handleMembership = () => {
        setAddmembership(prev => !prev);
    }

    const handleMember = () => {
        setAddmember(prev => !prev);
    }

    const handlePrev = () => {
        if (currentpage !== 1) {
            let currPage = currentpage - 1;
            setCurrentpage(currPage);
            var from = (currPage - 1) * 9;
            var to = (currPage * 9);
            setStartFrom(from)
            setEntTo(to);
            let skipVal = skip - 9;
            setSkip(skipVal)
            fetchData(skipVal, 9);
        }
    }

    const handleNext = () => {
        if (currentpage !== noOfPage) {
            let currPage = currentpage + 1;
            setCurrentpage(currPage);
            var from = (currPage - 1) * 9;
            var to = (currPage * 9)
            if (to > totalData) {
                to = totalData;

            }
            setStartFrom(from)
            setEntTo(to);
            let skipVal = skip + 9;
            setSkip(skipVal)
            fetchData(skipVal, 9);
        }
    }

    const handleSearchData = async () => {
        if (search !== "") {
            setIsSearchModeOn(true);
            await axios.get(`http://localhost:4000/members/searchedMembers?searchTerm=${search}`, { withCredentials: true }).then((response) => {
                console.log(response);
                setData(response.data.members)
                setTotalData(response.data.totalMembers)
            }).catch(err => {
                toast.error("Something went wrong");
                console.log(err);
            })
        }else{
            if(isSearchModeOn){
                window.location.reload();
            }else{
                toast.error("Please Enter any value")
            }
        }
    }

    return (
        <div className='text-black p-5 w-3/4 bg-slate-800 h-[100vh]'>
            {/* block for banner */}
            <div className='border-2 bg-slate-600 flex justify-between w-full text-white rounded-lg p-3'>

                <div className='border-2 pl-3 pr-3 pt-1 pb-1 rounded-2xl cursor-pointer hover:bg-orange-500' onClick={() => handleMember()}>Add member <FitnessCenterIcon /></div>
                <div className='border-2 pl-3 pr-3 pt-1 pb-1 rounded-2xl cursor-pointer hover:bg-orange-500' onClick={() => handleMembership()}>Membership <AddIcon /></div>

            </div>

            {/* block for back to dashboard */}
            <Link to={'/dashboard'} className='text-white '><ArrowBackIcon /> Back to Dashboard </Link>

            <div className='mt-5 w-1/2 flex gap-2'>
                <input type='text' value={search} onChange={(e) => { setSearch(e.target.value) }} className='border-2 w-full p-2 rounded-lg bg-slate-600 text-white ' placeholder='Search By Name or mobile no' />
                <div onClick={() => { handleSearchData() }} className='bg-slate-600 p-3 border-2 text-white rounded-lg cursor-pointer hover:bg-orange-500'><SearchIcon /></div>
            </div>

            <div className='mt-5 text-xl flex justify-between text-white'>
                <div>Total members  {isSearchModeOn?totalData:null}</div>
                {
                    !isSearchModeOn ? <div className='flex gap-5 '>
                        <div>{startForm + 1} - {endTo} of {totalData} Members</div>
                        <div className={`w-8 h-8 cursor-pointer border-2 flex items-center justify-center hover:bg-orange-500 hover:text-white ${currentpage === 1 ? 'bg-gray-200 text-gray-400' : null}`} onClick={() => { handlePrev() }}><KeyboardArrowLeftIcon /></div>
                        <div className={`w-8 h-8 cursor-pointer border-2 flex items-center justify-center hover:bg-orange-500 hover:text-white ${currentpage === noOfPage ? 'bg-gray-200 text-gray-400' : null}`} onClick={() => { handleNext() }}><KeyboardArrowRightIcon /></div>
                    </div> : null
                }

            </div>

            <div className='bg-slate-900 p-5 mt-5 rounded-lg grid gap-2 grid-cols-3 overflow-x-auto h-[65%]'>
                {
                    Array.isArray(data) && data.map((item) => (
                        <Membercard key={item.id || item._id} item={item} />
                    ))
                }



            </div>

            {addMembership && <Modal header="Add Membership" handleClose={handleMembership} content={<Addmembership handleClose={handleMembership} />} />}
            {addMember && <Modal header="Add New Members" handleClose={handleMember} content={<Addmember />} />}
            <ToastContainer />

        </div>
    )
}

export default Members