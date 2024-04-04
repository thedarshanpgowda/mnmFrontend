import React, { useEffect, useContext, useState } from 'react'
import Chart from '../components/Chart'
import axios from 'axios'
import styles from './Signup.module.css'
import FacultyProfileContext from '../context/FacultyContext'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../helper'

export default function Signup() {
  const faculty = useContext(FacultyProfileContext)
  const navigate = useNavigate()
  const [signup, setsignup] = useState({
    name: "",
    password: "",
    email: "",
    phone: "",
    id: "",
    confirmPassword: "",
    branch: "",
  })

  const [login, setlogin] = useState({
    password: "",
    id: "",
  })

  const [error, setError] = useState({
    isError: false,
    message: ""
  })

  const [display, setDisplay] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("faculty")) {
      if (JSON.stringify(localStorage.getItem("faculty")).isSuccess) {
        navigate("/mnm/teacher")
      }
      else {
        navigate("/mnm/faculty")
      }
    }
    else {
      navigate("/mnm/faculty")
    }
  }, [])




  const submithandler = async (e) => {
    e.preventDefault()
    if (signup.name === "" || signup.password === "" || signup.email === "" || signup.phone === "" || signup.id === "" || signup.branch === "") {
      setError({ isError: true, message: "Please fill out the form" })
      return
    }
    else {
      // console.log(signup)
      await axios
        .post(`${BASE_URL}/api/signin`, signup, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((res) => {
          faculty.updateFaculty(res.data)
          navigate("/mnm/teacher")
          console.log("success ", res)
        })
        .catch((err) => {
          navigate("/mnm/faculty")
          console.log("error while posting the data in faculty", err)
        });
      // console.log(data)
    }
  }

  const Loginsubmithandler = async (e) => {
    e.preventDefault()
    if (login.password === "" || login.id === "") {
      setError({ isError: true, message: "Please fill out the form" })
      return
    }
    else {
      await axios
        .post(`${BASE_URL}/api/faculty`, login, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((res) => {
          faculty.updateFaculty(res.data)
          navigate("/mnm/teacher")
          console.log("success ", res.headers)
        })
        .catch((err) => {
          navigate("/mnm/faculty")
          console.log("error while posting the data in faculty", err)
        });
    }
  }


  return (
    <Chart className={styles.signupPage}>
      <div className={styles.signup}>
        <form className={styles.form}>

          {error.isError &&
            <Chart className={styles.inputBlockContainer + " question red"}>
              {error.message}
            </Chart>}
          {display ? (<>
            <span className={styles.span}>Sign-Up to Faculty dashboard</span>

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
              <input type="password" id="password" value={signup.password} onChange={(e) => setsignup({ ...signup, password: e.target.value })} className={styles.inputBlock} placeholder='Password' required />
            </Chart>
            <Chart isset="true" val="10px" className={styles.inputBlockContainer}>
              <input type="password" id="cpassword" value={signup.confirmPassword} onChange={(e) => setsignup({ ...signup, confirmPassword: e.target.value })} className={styles.inputBlock} placeholder='Confirm Password' required />
            </Chart>
            <Chart isset="true" val="10px" className={styles.inputBlockContainer}>
              <input type="text" id="id" value={signup.id} onChange={(e) => setsignup({ ...signup, id: e.target.value.toUpperCase() })} className={styles.inputBlock} placeholder='Faculty ID' required />
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
              <input type="submit" id="submit" className={styles.inputBlock1 + " " + styles.submit} value="Submit" onClick={submithandler} />
            </Chart>
            <span className={styles.span} >Already have an account <button onClick={() => setDisplay(false)}>Log-In</button>?</span>
          </>) : (<>
            <span className={styles.span}>Log-In to Faculty dashboard</span>

            <Chart isset="true" val="10px" className={styles.inputBlockContainer}>
              <input type="text" id="id" value={login.id} onChange={(e) => {
                setError({ isError: false, message: " " })
                setlogin({ ...login, id: e.target.value.toUpperCase() })
              }} className={styles.inputBlock} placeholder='Faculty ID' required />
            </Chart>

            <Chart isset="true" val="10px" className={styles.inputBlockContainer}>
              <input type="password" id="password" value={login.password} onChange={(e) => setlogin({ ...login, password: e.target.value })} className={styles.inputBlock} placeholder='Password' required />
            </Chart>

            <Chart isset="true" val="10px" className={styles.inputBlockContainer}>
              <input type="submit" id="submit" className={styles.inputBlock1 + " " + styles.submit} value="Submit" onClick={Loginsubmithandler} />
            </Chart>

            <span className={styles.span} >Don't have an account <button onClick={() => setDisplay(true)}>Sign-Up</button>?</span>
          </>)}
        </form>
      </div>
    </Chart>
  )
}

