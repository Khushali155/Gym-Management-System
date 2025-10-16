import React, { useState } from 'react'
import './signUp.css';
import Modal from '../Modal/modal';
import ForgotPassword from '../Forgotpassword/forgotPassword';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';




const Signup = () => {

    const [forgotpassword, setForgotpassword] = useState(false);
    const [inputField, setInputField] = useState({ gymName: "", email: "", userName: "", password: "", profilepic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGw-v2A7KXDNiZWb-2Qb1awaKqWOj0F1Cp7-PSuUkT_jGY70SF42aLlmIyVDG53gbqb4c&usqp=CAU" })
    const [loaderImage, setLoaderImage] = useState(false);
    const handleClose = () => {
        setForgotpassword(prev => !prev);
    }

    const handleOnchange = (event, name) => {
        setInputField({ ...inputField, [name]: event.target.value });
    }


    const uploadImage = async (event) => {

        setLoaderImage(true);
        console.log("image uploading");
        const files = event.target.files;
        const data = new FormData();
        data.append('file', files[0]);

        // dxtklgcns

        data.append('upload_preset', 'gym-management');

        try {
            const response = await axios.post("https://api.cloudinary.com/v1_1/dxtklgcns/image/upload", data);
            console.log(response);
            const imgUrl = response.data.url;
            setLoaderImage(false)
            setInputField({ ...inputField, ['profilepic']: imgUrl });
        } catch (error) {
            console.log(error);
            setLoaderImage(false)

        }
    }

    const handleRegister = async () => {
        try {
            const resp = await axios.post('http://localhost:4000/auth/register', inputField);
            toast.success(resp.data.message);
        } catch (err) {
            const errorMessage = err.response?.data?.error || "Something went wrong!";
            toast.error(errorMessage);
        }
    };




    return (
        <div className='customSignup w-1/3 p-10 mt-20 ml-20 bg-gray-50 bg-opacity-50 h-[450px] overflow-y-auto'>
            <div className='font-sans text-white text-center text-3xl'>Register your Gym</div>
            <input type='text' value={inputField.email} onChange={(event) => { handleOnchange(event, "email") }} className='w-full my-10 p-2 rounded-lg ' placeholder='Enter Email' />
            <input type='text' value={inputField.gymName} onChange={(event) => { handleOnchange(event, "gymName") }} className='w-full mb-10 p-2 rounded-lg ' placeholder='Enter GymName' />
            <input type='text' value={inputField.userName} onChange={(event) => { handleOnchange(event, "userName") }} className='w-full mb-10 p-2 rounded-lg ' placeholder='Enter userName' />
            <input type='password' value={inputField.password} onChange={(event) => { handleOnchange(event, "password") }} className='w-full mb-10 p-2 rounded-lg ' placeholder='Enter password' />
            <input type='file' onChange={(e) => { uploadImage(e) }} className='w-full mb-10 p-2 rounded-lg' />

            {
                loaderImage && <Stack sx={{ width: '100%', color: 'gray.100' }} spacing={2}>
                    <LinearProgress color="secondary" />

                </Stack>

            }


            <img src={inputField.profilepic} className=' mb-10 h-[200px] w-[250px]' />


            <div className='p-2 w-[80%] border-2 bg-slate-800 mx-auto rounded-lg text-white text-center text-lg hover:bg-white hover:text-black font-semibold cursor-pointer' onClick={() => handleRegister()}>Register</div>
            <div className='p-2  mt-5 w-[80%] border-2 bg-slate-800 mx-auto rounded-lg text-white text-center text-lg hover:bg-white hover:text-black font-semibold cursor-pointer ' onClick={() => handleClose()}>Forget password</div>
            {forgotpassword && <Modal header="Forgot password" handleClose={handleClose} content={<ForgotPassword />} />}
            <ToastContainer />
        </div>
    )
}

export default Signup