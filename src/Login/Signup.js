import React, { useEffect, useState } from 'react'
import Chart from '../components/Chart'
import styles from './Signup.module.css'
import axios from 'axios'
import { useContext } from 'react'
import StudentProfileContext from '../context/Newcontext'
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../helper'

export default function Signup() {
    const user = useContext(StudentProfileContext)

    let navigate = useNavigate();
    const [signup, setsignup] = useState({
        name: "",
        password: "",
        email: "",
        phone: "",
        confirmPassword: "",
        usn: "",
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
            return
        }
        else {

            await axios
                .post(`${BASE_URL}/api/`, stulogin, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then((res) => {
                    console.log(res)
                    // localStorage.setItem("token",res.data.studentInfo.token)
                    user.updateUser(res.data)
                    navigate("/mnm/student")
                    // console.log(user)
                    console.log("success ")
                })
                .catch((err) => {
                    navigate("/mnm/")
                    console.log("error while posting the data in faculty", err)
                });
        }
    }

    const [student, setstudent] = useState(false)
    const submithandler = async (e) => {
        e.preventDefault()
        if (signup.name === "" || signup.password === "" || signup.email === "" || signup.phone === "" || signup.usn === "" || signup.branch === "" || signup.sem === "") {
            setError({ isError: true, message: "Please fill out the form" })
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
                    {student ? (<>
                        <span className={styles.span}>Sign-Up to Student dashboard</span>

                        <Chart isset="true" val="10px" className={styles.inputBlockContainer}>
                            <input type="text" id="name" value={signup.name} onChange={(e) => setsignup({ ...signup, name: e.target.value })} className={styles.inputBlock} placeholder='Name' required />
                        </Chart>
                        <Chart isset="true" val="10px" className={styles.inputBlockContainer}>
                            <input type="email" id="email" value={signup.email} onChange={(e) => setsignup({ ...signup, email: e.target.value })} className={styles.inputBlock} placeholder='Email' required />
                        </Chart>
                        <Chart isset="true" val="10px" className={styles.inputBlockContainer}>
                            <input type="number" id="phone" value={signup.phone} onChange={(e) => setsignup({ ...signup, phone: e.target.value })} className={styles.inputBlock} placeholder='Number' required />
                        </Chart>
                        <Chart isset="true" val="10px" className={styles.inputBlockContainer}>
                            <input type="text" id="usn" value={signup.usn} onChange={(e) => setsignup({ ...signup, usn: e.target.value.toUpperCase() })} className={styles.inputBlock} placeholder='USN' required />
                        </Chart>
                        <Chart isset="true" val="10px" className={styles.inputBlockContainer}>
                            <input type="password" id="password" value={signup.password} onChange={(e) => setsignup({ ...signup, password: e.target.value })} className={styles.inputBlock} placeholder='Password' required />
                        </Chart>
                        <Chart isset="true" val="10px" className={styles.inputBlockContainer}>
                            <input type="password" id="cpassword" value={signup.confirmPassword} onChange={(e) => setsignup({ ...signup, confirmPassword: e.target.value })} className={styles.inputBlock} placeholder='Confirm Password' required />
                        </Chart>


                        <Chart isset="true" val="10px" className={styles.inputBlockContainer}>
                            <select id="branch" className={styles.inputBlock1} onChange={(e) => setsignup({ ...signup, branch: e.target.value })} required>
                                <option value="">Select your branch</option>
                                <option value="cse">Computer Science and Engineering</option>
                                <option value="ise">Information Science and Engineering</option>
                                <option value="ece">Electronics & Communication and Engineering</option>
                                <option value="eee">Electronics & Electricals and Engineering</option>
                                <option value="cv">Civil Engineering</option>
                                <option value="mb">Mechanical Engineering</option>
                                <option value="ei">Electricals and Information Engineering</option>
                                <option value="ai">Artificial Intelligence and Engineering</option>
                                <option value="csbs">Computer Science and Business Studies</option>
                            </select>
                        </Chart>
                        <Chart isset="true" val="10px" className={styles.inputBlockContainer}>
                            <select id="sem" className={styles.inputBlock1} onChange={(e) => setsignup({ ...signup, sem: e.target.value })} required>
                                <option value="">Select your semester</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                            </select>
                        </Chart>
                        <Chart isset="true" val="10px" className={styles.inputBlockContainer}>
                            <input type="submit" id="submit" className={styles.inputBlock1 + " " + styles.submit} value="Submit" onClick={submithandler} />
                        </Chart>
                        <span className={styles.span} >Already have an account <button onClick={() => setstudent(false)}>Log-In</button>?</span>
                    </>
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
