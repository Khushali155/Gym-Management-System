import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {toast , ToastContainer} from 'react-toastify'



const Addmembership = ({handleClose}) => {
    const [inputField, setInputField] = useState({ months: "", price: "" });
    const [membership, setMembership] = useState([]);

    const handleOnchange = (event, name) => {
        setInputField({ ...inputField, [name]: event.target.value });
    }

    const fetchMembership = async () => {
        await axios.get('http://localhost:4000/plans/getMembership', { withCredentials: true }).then((res) => {
            console.log(res);
            setMembership(res.data.membership);
            toast.success(res.data.membership.length+ " Membership fetched")

        }).catch(err => {
            console.log(err)
            toast.error("Something Went Wrong ");
        })
    }

    useEffect(() => {
        fetchMembership()
    }, [])

    const handleAddmembership = async()=>{
        await axios.post('http://localhost:4000/plans/addMembership',inputField,{withCredentials :true}).then((response=>{
            toast.success(response.data.message)
            handleClose();
        })).catch(err=>{
            console.log(err)
            toast.error("Something Went Wrong ");
        })
    }

    return (
        <div className='text-black'>
            <div className='flex flex-wrap gap-5 items-center justify-center'>

                {
                    membership.map((item, index) => {
                        return (

                            <div className='text-lg bg-slate-900 text-white border-2 pl-2 flex-col gap-3 justify-between pt-1 pb-1 rounded-xl font-semibold hover:bg-orange-500'>
                                <div>{item.months} Month Membership</div>
                                <div>Rs {item.price}</div>

                            </div>


                        );
                    })
                }



            </div>
            <hr className='mt-10 mb-10' />
            <div className='flex gap-10 mb-10'>
                <input value={inputField.months} onChange={(event) => { handleOnchange(event, "months") }} className='border-2 rounded-lg text-lg w-1/3 h-1/2 p-2' type='number' placeholder='Add No. of Months' />

                <input value={inputField.price} onChange={(event) => { handleOnchange(event, "price") }} className='border-2 rounded-lg text-lg w-1/3 h-1/2 p-2' type='number' placeholder='Add price' />

                <div onClick={()=>{handleAddmembership()}} className='text-lg border-2 p-1 w-auto mt-0 rounded-xl cursor-pointer hover:bg-orange-500'>Add+</div>


            </div>
            <ToastContainer/>

        </div >
    )
}

export default Addmembership