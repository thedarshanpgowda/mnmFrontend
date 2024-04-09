import React, { useEffect, useState } from 'react'
import Chart from '../components/Chart'
import styles from './Signup.module.css'
import axios from 'axios'
import { useContext } from 'react'
import StudentProfileContext from '../context/Newcontext'
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../helper'
// import { ModalState } from '../context/Modalcontext'
import ModalContext from '../context/Modalcontext'
import Registeration from './Registeration'

export default function Signup() {
    const user = useContext(StudentProfileContext)
    const { updateModal } = useContext(ModalContext)

    let navigate = useNavigate();
    const [signup, setsignup] = useState({
        name: "",
        email: "",
        phone: "",
        usn: "",
        password: "",
        confirmPassword: "",
        mentorId: "",
        dob: "",
        addr: "",
        father: "",
        mother: "",
        blood: "",
        branch: "",
        sem: ""
    })

    useEffect(() => {
        if (localStorage.getItem("data")) {
            if (JSON.parse(localStorage.getItem("data")).isSuccess) {
                navigate("/mnm/student");
            }
            else {
                navigate("/mnm/")
            }
        }
        else {
            navigate("/mnm/")
        }
    }, [])


    const [stulogin, setstulogin] = useState({
        usn: "",
        password: ""
    })

    const [error, setError] = useState({
        isError: false,
        message: ""
    })

    const StudentLoginsubmithandler = async (e) => {
        e.preventDefault()
        if (stulogin.password === "" || stulogin.usn === "") {
            setError({ isError: true, message: "Please fill out the form" })
            updateModal('Please fill all the fields', 'Fail')
            return
        }
        else {
            console.log(stulogin)
            await axios
                .post(`${BASE_URL}/api/`, stulogin, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then((res) => {
                    console.log(res)
                    console.log("object")
                    user.updateUser(res.data)

                    navigate("/mnm/student")
                    // console.log(user)
                    console.log("success ")
                })
                .catch((err) => {
                    updateModal("User does not exist or Incorrect Password/USN", `${err.response.data.message}`)
                    navigate("/mnm/")
                    console.log("error while posting the data in faculty", err)
                });
        }
    }

    const [student, setstudent] = useState(false)
    const submithandler = async (e) => {
        e.preventDefault()
        if (signup.address === "" || signup.mentorId === "" || signup.dob === "" || signup.blood === "" || signup.mother === "" || signup.father === "" || signup.name === "" || signup.password === "" || signup.email === "" || signup.phone === "" || signup.usn === "" || signup.branch === "" || signup.sem === "") {
            setError({ isError: true, message: "Please fill out the form" })
            updateModal('Please fill all the fields', 'Fail')

            return
        }
        else {
            console.log(signup)
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
                    updateModal(`${err.response.data.message}`, `${err.response.data.status}`)
                    navigate('/mnm/')
                    console.log("error while posting the data ", err)
                });
        }
    }
    return (
        <Chart className={styles.signupPage}>
            <div className={styles.signup}>
                <form className={styles.form}>

                    {error.isError && <Chart className={styles.inputBlockContainer + " question red"}>
                        {error.message}
                    </Chart>}
                    {student ? (
                        <Registeration signup={signup} setsignup={setsignup} setstudent={setstudent} submithandler={submithandler} setError = {setError}/>
                    ) : (<>
                        <span className={styles.span}>Log-In to Student dashboard</span>

                        <Chart isset="true" val="10px" className={styles.inputBlockContainer}>
                            <input type="text" id="id" value={stulogin.usn} onChange={(e) => {
                                setError({
                                    isError: false,
                                    message: ""
                                })
                                setstulogin({ ...stulogin, usn: e.target.value.toUpperCase() })
                            }} className={styles.inputBlock} placeholder='USN' required />
                        </Chart>

                        <Chart isset="true" val="10px" className={styles.inputBlockContainer}>
                            <input type="password" id="password" value={stulogin.password} onChange={(e) => {
                                setError({
                                    isError: false,
                                    message: ""
                                })
                                setstulogin({ ...stulogin, password: e.target.value })
                            }} className={styles.inputBlock} placeholder='Password' required />
                        </Chart>

                        <Chart isset="true" val="10px" className={styles.inputBlockContainer}>
                            <input type="submit" id="submit" className={styles.inputBlock1 + " " + styles.submit} value="Submit" onClick={StudentLoginsubmithandler} />
                        </Chart>

                        <span className={styles.span} >Don't have an account <button onClick={() => setstudent(true)}>Sign-Up</button>?</span>
                    </>)}
                </form>
            </div>
        </Chart>
    )
}
