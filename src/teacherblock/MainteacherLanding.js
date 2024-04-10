import React, { useState } from 'react'
import Chart from '../components/Chart'
import { useContext } from 'react'
import { useNavigate } from "react-router-dom";
import '../Student/Mainlanding.css'
import RightSubMainlanding from '../Student/MarksDashboard';
import Mainteacherblock from './Mainteacherblock'
import FacultyProfileContext from '../context/FacultyContext';
import FacultyComment from './FacultyComment';
import SearchStudent from './SearchStudent';
import PDFGenerator from './SearchStudent';


export default function MainteacherLanding() {
    const faculty = useContext(FacultyProfileContext)
    const navigate = useNavigate()
    const [blockView, setBlockView] = useState({
        profile: false,
        complain: true,
        update: false,
        view: false,
    })

    const logouthandler = () => {
        localStorage.removeItem("faculty")
        faculty.updateFaculty(null)
        navigate("/mnm/faculty")
    }

    return (
        <div className="studentBlock">
            <LeftSubMainlanding blockView={blockView} setBlockView={setBlockView} logouthandler={logouthandler} />
            <div className="mainstudentBlock">
                {/* {!blockView.profile && !blockView.complain && blockView.update && <RightSubMainlanding blockView={blockView} setBlockView={setBlockView} />} */}
                {!blockView.profile && blockView.complain && !blockView.update && <Mainteacherblock />}
                {blockView.profile && !blockView.complain && !blockView.update && <FacultyComment />}
            </div>
        </div>
    )
}




export function LeftSubMainlanding(props) {
    const faculty = useContext(FacultyProfileContext)
    const hoveringEffect = () => {
        const arr = document.querySelectorAll('.NavbarBodyBlockcontent')
        // console.log(arr)
        arr.forEach((ele) => {
            ele.addEventListener('click', () => {
                arr.forEach(line => {
                    line.classList.remove("active")
                })
                ele.classList.add("active")
            })
        })
    }
    return (
        <div className="navigationBarBlock">
            <div className="profileblock cancel" onClick={() => {
                const navigationBarBlock = document.querySelector('.navigationBarBlock');

                if (navigationBarBlock) {
                    if (window.innerWidth < 600) {
                        navigationBarBlock.style.marginTop = "-500%";
                    } else {
                        navigationBarBlock.style.marginTop = "0px";
                    }
                }
            }}>
                X
            </div>
            <Chart className="HeaderNavbarcontentBlock">
                <div className="headercontent nunito">
                    {faculty.faculty.name}'s Dashboard
                </div>
            </Chart>
            <Chart className="NavbarBodyContent nunito">
                <div className="navbarcontainerTopPart">
                    <div className="NavbarBodyBlockcontent" onClick={() => {
                        hoveringEffect()
                        const navigationBarBlock = document.querySelector('.navigationBarBlock');

                        if (navigationBarBlock) {
                            if (window.innerWidth < 600) {
                                navigationBarBlock.style.marginTop = "-500%";
                            } else {
                                navigationBarBlock.style.marginTop = "0px";
                            }
                        }
                    }}>
                        <img src="https://cdn-icons-png.flaticon.com/128/9228/9228191.png" alt="see" />
                        <div className="actualContent">View Student's Querries</div>
                    </div>
                    <div className="NavbarBodyBlockcontent" onClick={() => {
                        hoveringEffect()
                        props.setBlockView({ complain: false, profile: true, update: false })
                        const navigationBarBlock = document.querySelector('.navigationBarBlock');

                        if (navigationBarBlock) {
                            if (window.innerWidth < 600) {
                                navigationBarBlock.style.marginTop = "-500%";
                            } else {
                                navigationBarBlock.style.marginTop = "0px";
                            }
                        }
                    }}>
                        <img src="https://cdn-icons-png.flaticon.com/128/1077/1077114.png" alt="profile" onClick={() => {
                            const navigationBarBlock = document.querySelector('.navigationBarBlock');

                            if (navigationBarBlock) {
                                if (window.innerWidth < 600) {
                                    navigationBarBlock.style.marginTop = "-500%";
                                } else {
                                    navigationBarBlock.style.marginTop = "0px";
                                }
                            }
                        }} />
                        <div className="actualContent">Review Students</div>
                    </div>

                    {/* <div className="NavbarBodyBlockcontent" onClick={() => {
                        hoveringEffect()
                        props.setBlockView({ complain: false, profile: false, update: true })
                    }}>
                        <img src="https://cdn-icons-png.flaticon.com/128/15368/15368706.png" alt="update" />
                        <div className="actualContent">Update CIE Details</div>
                    </div> */}

                    {/* <div className="NavbarBodyBlockcontent" onClick={() => {
                        hoveringEffect()
                        props.setBlockView({ complain: false, profile: false, view: true, update: false })
                    }}>
                        <img src="https://cdn-icons-png.flaticon.com/128/14241/14241786.png" alt="update" />
                        <div className="actualContent">Student History </div>
                    </div> */}
                </div>
                <div className="navbarcontainerBottomPart" onClick={() => {
                    hoveringEffect()
                    console.log(props.blockView)
                }}>
                    <div className="NavbarBodyBlockcontent" onClick={props.logouthandler}>
                        <img src="https://cdn-icons-png.flaticon.com/128/1828/1828479.png" alt="logout" className='logout' />
                        <div className="actualContent">Log out</div>
                    </div>
                </div>
            </Chart>
        </div>
    )
}
