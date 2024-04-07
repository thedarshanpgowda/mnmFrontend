import axios from 'axios'
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import StudentProfileContext from '../context/Newcontext';
import { useNavigate } from 'react-router-dom';


const useStudentInfo = async (signup) => {
    const navigate = useNavigate()
    const user = useContext(StudentProfileContext)
    useEffect(()=>{
        const main = async()=>{
            await axios
                .post(`${BASE_URL}/api/signin`, signup, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then((res) => {
                    user.updateUser(res.data)
                    navigate('/mnm/student')
                    console.log("success ", res)
                })
                .catch((err) => {
                    navigate('/mnm/')
                    console.log("error while posting the data ", err)
                });
        }
        main()
    },[])
    return 
}
export default useStudentInfo;