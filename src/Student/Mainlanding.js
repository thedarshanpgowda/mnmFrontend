import React, { useEffect, useState } from 'react'
import Chart from '../components/Chart'
import './Mainlanding.css'
import { useContext } from 'react'
import StudentProfileContext from "../context/Newcontext";
import RightSubMainlanding from "./MarksDashboard"
import Mainstudentblock from './Mainstudentblock';
import { useNavigate } from "react-router-dom";
import Updateprofile from './Updateprofile';
import MentorComment from './MentorComment';
import { universalImage } from '../helper';

export default function Mainlanding() {
    const user = useContext(StudentProfileContext)
    const navigate = useNavigate()
    const [blockView, setBlockView] = useState({
        profile: false,
        complain: true,
        update: false,
        view: false,
    })

    const logouthandler = () => {
        localStorage.removeItem("data")
        user.updateUser(null)
        navigate("/mnm/")
    }
    return (
        <div className="studentBlock">
            <LeftSubMainlanding blockView={blockView} setBlockView={setBlockView} logouthandler={logouthandler} />
            {!blockView.profile && !blockView.complain && blockView.update && <RightSubMainlanding blockView={blockView} setBlockView={setBlockView} />}
            {!blockView.profile && blockView.complain && !blockView.update && <Mainstudentblock />}
            {blockView.profile && !blockView.complain && !blockView.update && <Updateprofile />}
            {!blockView.profile && blockView.view && !blockView.complain && !blockView.update && <MentorComment />}
        </div>
    )
}




export function LeftSubMainlanding(props) {
    const user = useContext(StudentProfileContext)
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
    const [url, seturl] = useState()
    useEffect(() => {
        seturl(user.user.img)
    }, [])
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
                <div className="studentDataInfoNavbar">
                    <div className="imageContainerBlock1">
                        <img
                            src={url ? url : universalImage} alt="profile"
                            onClick={() => {
                                const navigationBarBlock = document.querySelector('.navigationBarBlock');
                                if (navigationBarBlock) {
                                    navigationBarBlock.style.marginTop = "0%";
                                }
                            }}
                        />
                    </div>
                </div>
                <div className="headercontent nunito">
                    {user.user.name} Dashboard
                </div>
            </Chart>
            <Chart className="NavbarBodyContent nunito">
                <div className="navbarcontainerTopPart">
                    <div className="NavbarBodyBlockcontent" onClick={() => {
                        hoveringEffect()
                        props.setBlockView({ complain: true, profile: false, update: false })
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
                        <div className="actualContent">Post a Complaint</div>
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
                        <img src="https://cdn-icons-png.flaticon.com/128/1077/1077114.png" alt="profile" />
                        <div className="actualContent">Profile</div>
                    </div>

                    <div className="NavbarBodyBlockcontent" onClick={() => {
                        hoveringEffect()
                        props.setBlockView({ complain: false, profile: false, update: true })
                        const navigationBarBlock = document.querySelector('.navigationBarBlock');

                        if (navigationBarBlock) {
                            if (window.innerWidth < 600) {
                                navigationBarBlock.style.marginTop = "-500%";
                            } else {
                                navigationBarBlock.style.marginTop = "0px";
                            }
                        }
                    }}>
                        <img src="https://cdn-icons-png.flaticon.com/128/15368/15368706.png" alt="update" />
                        <div className="actualContent">Update CIE Details</div>
                    </div>
                    <div className="NavbarBodyBlockcontent" onClick={() => {
                        hoveringEffect()
                        props.setBlockView({ complain: false, profile: false, view: true, update: false })
                        const navigationBarBlock = document.querySelector('.navigationBarBlock');

                        if (navigationBarBlock) {
                            if (window.innerWidth < 600) {
                                navigationBarBlock.style.marginTop = "-500%";
                            } else {
                                navigationBarBlock.style.marginTop = "0px";
                            }
                        }
                    }}>
                        <img src="https://cdn-icons-png.flaticon.com/128/14241/14241786.png" alt="update" />
                        <div className="actualContent">Accademic History </div>
                    </div>
                </div>
                <div className="navbarcontainerBottomPart" onClick={() => {
                    hoveringEffect()
                    console.log(props.blockView)
                    const navigationBarBlock = document.querySelector('.navigationBarBlock');

                    if (navigationBarBlock) {
                        if (window.innerWidth < 600) {
                            navigationBarBlock.style.marginTop = "-500%";
                        } else {
                            navigationBarBlock.style.marginTop = "0px";
                        }
                    }
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
