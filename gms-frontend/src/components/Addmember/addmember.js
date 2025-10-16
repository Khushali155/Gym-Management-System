import React, { useState,useEffect } from 'react'
import axios from 'axios'
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import { ToastContainer,toast } from 'react-toastify';

const Addmember = () => {

  
  const [inputField, setInputField] = useState({ name: "", mobileNo: "", address: "", membership: "", profilepic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI9V6hl_0LTI9gfcjWYl1H0IDtgl4REzcb6Q&s", joiningDate: "" })
  const [imageLoader , setImageLoader] = useState(false);
  const [membershipList,setmembershipList] = useState([]);
  const [selectedOption,setSelectedOption] = useState("")

  const handleOnchange = (event, name) => {
    setInputField({ ...inputField, [name]: event.target.value });
  }
  console.log(inputField);

  const uploadImage = async (event) => {
    setImageLoader(true)
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
      setImageLoader(false)
      setInputField({ ...inputField, ['profilepic']: imgUrl });
    } catch (error) {
      console.log(error);
      setImageLoader(false)

    }
  }

  const fetchMembership = async()=>{
    await axios.get('http://localhost:4000/plans/getMembership',{withCredentials:true}).then((response)=>{
      setmembershipList(response.data.membership)
      if(response.data.membership.length===0){
        return toast.error("No any Membership added yet",{
          className:"text-lg"
        })
      }else{
        let a = response.data.membership[0],_id;
        setSelectedOption(a)
        setInputField({...inputField,membership:a})

      }      

    }).catch(err=>{
      console.log(err);
      toast.error("Something went wrong");
    })
  }

  useEffect(()=>{
    console.log(inputField);
    fetchMembership();
  },[])

  const handleOnchangeSelect = (event) =>{
    let value = event.target.value;
    setSelectedOption({...inputField,membership:value});
  };

  const handleRegisterButton = async()=>{
    await axios.post('http://localhost:4000/members/registerMember',inputField,{withCredentials:true}).then((res)=>{
      toast.success("Added Successfully");
      setTimeout(()=>{
        window.location.reload();
      },2000)
    }).catch(err=>{
      console.log(err);
      toast.error("Something went wrong");
    })
  }

  return (
    <div className='text-black'>
      <div className='grid gap-5 grid-cols-2 text-lg'>
        <input value={inputField.name} onChange={(event) => { handleOnchange(event, "name") }} placeholder='Name of the Joinee' type='text' className='border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12' />
        <input value={inputField.mobileNo} onChange={(event) => { handleOnchange(event, "mobileNo") }} placeholder='Mobile No' type='text' className='border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12' />
        <input value={inputField.address} onChange={(event) => { handleOnchange(event, "address") }} placeholder='Address' type='text' className='border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12' />
        <input value={inputField.joiningDate} onChange={(event) => { handleOnchange(event, "joiningDate") }} type='date' className='border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12' />

        <select value={selectedOption} onChange={handleOnchangeSelect} className='border-2 w-[90%] h-12 pt-2 pb-2 border-slate-400 rounded-lg placeholder:text-gray'>
          {
            membershipList.map((item,index)=>{
              return(
                <option key={index} value={item._id}>{item.months} Months Membership</option>
              );
            })
          }
        </select>

        <input type='file' onChange={(e) => uploadImage(e)} />

        <div className='w-[100px] h-[100px]'>
          <img src={inputField.profilepic} className='w-full h-full rounded-full' />
          {
            imageLoader && <Stack sx={{ width: '100%', color: 'gray.100' }} spacing={2}>
              <LinearProgress color="secondary" />

            </Stack>

          }

        </div>



        <div onClick={()=>handleRegisterButton()} className='p-3 border-2  w-28 text-lg h-14 text-center  bg-slate-900 text-white rounded-xl cursor-pointer hover:bg-orange-500'>Register</div>



      </div>
      <ToastContainer/>

    </div>
  )
}

export default Addmember