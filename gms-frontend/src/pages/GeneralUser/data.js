import axios from 'axios';

const getMonthlyJoined = async()=>{
    try {
        const response = await axios.get('http://localhost:4000/members/monthlyMember',{withCredentials:true})
        return response.data;
    } catch (error) {
        console.log('Error fetching data:',error);
        throw error;
    }
}

const threeDayExpire = async()=>{
    try {
        const response = await axios.get('http://localhost:4000/members/within-3-days-expiring',{withCredentials:true})
        return response.data;
    } catch (error) {
        console.log('Error fetching data:',error)
        throw error;
        
    }
}

const fourToSevesExpirenDay = async()=>{
    try {
        const response = await axios.get('http://localhost:4000/members/within-4-7-days-expiring',{withCredentials:true})
        return response.data;
    } catch (error) {
        console.log('Error fetching data:',error)
        throw error;
        
    }
}

 const expiredMember = async()=>{
    try {
        const response = await axios.get('http://localhost:4000/members/expireMember',{withCredentials:true})
        return response.data;
    } catch (error) {
        console.log('Error fetching data:',error)
        throw error;
        
    }
 }

 const inactiveMember = async()=>{
    try {
        const response = await axios.get('http://localhost:4000/members/inactiveMember',{withCredentials:true})
        return response.data;
    } catch (error) {
        console.log('Error fetching data:',error)
        throw error;
        
    }
 }




export  {getMonthlyJoined , threeDayExpire , fourToSevesExpirenDay , expiredMember,inactiveMember}