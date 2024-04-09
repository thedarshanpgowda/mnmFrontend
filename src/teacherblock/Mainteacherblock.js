import React, { useContext } from 'react'
import { useState, useEffect } from 'react';
import axios from "axios";
import Teacher from './Teacher'
import { useNavigate } from 'react-router-dom';
import FacultyProfileContext from '../context/FacultyContext';
import { BASE_URL } from '../helper';

export default function Mainteacherblock() {
  const [state, setState] = useState([]);
  const [display, setDisplay] = useState(true)
  const [message, setmessage] = useState({
    question: "",
    qid: "",
    answer: ""
  });

  const faculty = useContext(FacultyProfileContext)
  const navigate = useNavigate()

  useEffect(() => {
    console.log(faculty)
    if (faculty.faculty.isSuccess && JSON.parse(localStorage.getItem("faculty")).isSuccess) {
      // console.log(faculty.faculty.isSuccess)
      // console.log(JSON.parse(localStorage.getItem("faculty")).isSuccess)
      navigate("/mnm/teacher");
    }
    else {
      // console.log("else")
      // console.log(faculty)
      // console.log(JSON.parse(localStorage.getItem("faculty")).isSuccess)
      navigate("/mnm/faculty")
    }
  }, [faculty.faculty.isSuccess, navigate])

  const updateFac = (res) => {
    console.log(res)
    setState(res.data.data)
  }

  let a = 0;

  useEffect(() => {
    const main = async () => {
      await axios
        .get(`${BASE_URL}/api/faculty/home`, {
          headers: {
            "Authorization": `Bearer ${faculty.faculty.token}`
          },
        })
        .then((res) => {
          updateFac(res)
          // console.log(res)
        })
        .catch((err) => console.log(err));
    }
    if (faculty.faculty.isSuccess && JSON.parse(localStorage.getItem("faculty")).isSuccess) {
      // console.log("main")
      main()
    }
  }, [a]);

  const questionHandler = (data, id, isFile) => {
    setmessage({ ...message, question: data, qid: id, isFile: isFile });
    setDisplay(false)
    // console.log(message);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(message);
    await axios
      .post(`${BASE_URL}/api/faculty/home`, message, {
        headers: {
          "Authorization": `Bearer ${faculty.faculty.token}`
        }
      })
      .then((res) => console.log("success posting the solution"))
      .catch((e) => console.log("error while posting the solution"));
    setmessage(" ")
    // window.location.reload();
    a++;
    console.log(a)
  };
  return (
    <>
      <Teacher
        message={message}
        setmessage={setmessage}
        state={state}
        questionHandler={questionHandler}
        submitHandler={submitHandler}
        display={display}
        setDisplay = {setDisplay}
      />
    </>
  )
}


