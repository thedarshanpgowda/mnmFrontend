import React, { useContext, useState } from 'react'
import styles from '../components/Form.module.css'
import Chart from '../components/Chart'
import Secondary from './Secondary'
import Form from './Form'
import FacultyProfileContext from '../context/FacultyContext'
import { useNavigate } from 'react-router-dom'

export default function Teacher(props) {


    const [profileView, setProfileView] = useState(false)
    const faculty = useContext(FacultyProfileContext)


    const navigate = useNavigate()
    const logouthandler = () => {
        localStorage.removeItem("faculty")
        faculty.updateFaculty(null)
        navigate("/mnm/faculty")
        // window.location.reload();
        // navigate("/mnm/faculty")
    }

    return (
        <>
            <div className="extrablock">
                <div className="profilePic">
                    <img src="https://cdn-icons-png.flaticon.com/128/64/64572.png" alt="profilelink" className='profilepic' onClick={() => {
                        const navigationBarBlock = document.querySelector('.navigationBarBlock');
                        if (navigationBarBlock) {
                            navigationBarBlock.style.marginTop = "0%";
                        }
                    }} />
                    <Chart className="nameBlock">{faculty.faculty.name}</Chart>
                </div>
                {
                    profileView && <Chart className="profilefolder">
                        <div className="profilefolderblock">
                            <div className="profileblockContainer">
                                <div className="credentials">
                                    <div className="nameBlock">{faculty.faculty.name}</div>
                                    <div className="idBlock">{" " + faculty.faculty.id}</div>
                                </div>
                                <div className="cancel " onClick={() => setProfileView(false)}>
                                    X
                                </div>
                            </div>
                            <div className="logOutBlock">
                                <div className="flexbutton">
                                    <div className="button question" onClick={logouthandler}>Log-Out</div>
                                </div>
                            </div>
                        </div>
                    </Chart>
                }
            </div>
            {/* <Chart className="flexbox">
                <Chart className="nameBlock">{faculty.faculty.name + " | " + faculty.faculty.id}</Chart>
                <div className="flexbutton">
                    <div className="button question" onClick={logouthandler}>Log-Out</div>
                </div>
            </Chart> */}
            <Chart className={styles.mainBlock}>
                <Form
                    message={props.message}
                    setmessage={props.setmessage}
                    submitHandler={props.submitHandler}
                    display={props.display}
                    setDisplay={props.setDisplay}
                    name={faculty.faculty.name}
                    state={props.state}
                />
                <hr />
                <Secondary state={props.state} questionHandler={props.questionHandler} />
            </Chart>
        </>
    )
}
