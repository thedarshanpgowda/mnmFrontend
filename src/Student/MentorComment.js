import React, { useEffect, useState } from 'react'
import { useContext } from "react";
import StudentProfileContext from "../context/Newcontext";
import axios from 'axios';
import { BASE_URL } from '../helper';



export default function MentorComment() {
    const user1 = useContext(StudentProfileContext)
    const [isLoading, setIsLoading] = useState(true);

    const [user, setUser] = useState({
        student: {}, review: {}
    })


    useEffect(() => {
        const main = async () => {
            try {
                await axios.get(`${BASE_URL}/api/review`, {
                    headers: {
                        Authorization: `Bearer ${user1.user.token}`
                    }
                })
                    .then(res => {
                        console.log(res.data)
                        setUser({ student: res.data.studentInfo, review: res.data.reviewData })
                    })
            }
            catch (e) {
                console.log(e)
            }
            finally {
                setIsLoading(true)
            }
        }
        main()
    }, [])

    const returnsAvalue = (val) => {
        const obj = {
            val: val,
            name: "Name",
            email: "E-mail",
            phone: "Phone Number",
            usn: "USN",
            password: "Password",
            mentorId: "Mentor ID",
            dob: "Date Of Birth",
            addr: "Address",
            address: "Address",
            father: "Father Name",
            mother: "Mother Name",
            blood: "Blood Group",
            branch: "Branch",
            sem: "Semester",
            studentCie1Attendence: "Student Attendence",
            studentCie2Attendence: "Student Attendence",
            studentCie3Attendence: "Student Attendence",
            studentSeeAttendence: "Student Attendence",
            studentMood: "Student's Mood",
            studentComment: "Student Comment",
            facultyComment: "Faculty Comment"
        }
        return obj[val]
    }

    return (
        <div className="updateProfileBlock">
            <div className="mainnavbartop">
                <div className="studentDataInfoNavbar">
                    <div className="imageContainerBlock">
                        <img
                            src={user1.user.img || "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"}
                            alt="profile"
                            onClick={() => {
                                const navigationBarBlock = document.querySelector('.navigationBarBlock');
                                if (navigationBarBlock) {
                                    navigationBarBlock.style.marginTop = "0%";
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
            {
                !isLoading ? (<p className='nunito'>Fetching your data from the server ....</p>) : (
                    <div className="mainContentblock">
                        <div className="studentInfoName ">
                            <div className="studentCredentials">
                                <h1 className="h1 nunito">{user1.user.name}</h1>
                                <p className="p nunito">{user1.user.id}</p>
                            </div>
                            {user1.user.address ? (
                                <p className="addr nunito">{user1.student.addr}</p>
                            ) : (
                                <p className="addr nunito">Malnad College of Engineering</p>
                            )}
                        </div>
                        <div className="studenBlock">
                            <div className="outercoverignBlock studentInfo">
                                <div className="studentInfoContainer nunito"><h2>Student Details</h2></div>
                                <table>
                                    <tbody>
                                        {
                                            user.student ? (Object.keys(user.student).map(userKey => {
                                                if (userKey === '__v' || userKey === '_v' || userKey === '_id' || userKey === 'img' || userKey === 'password') {
                                                    return null;
                                                } else {
                                                    return (
                                                        <tr key={userKey} className='nunito'>
                                                            <td>{returnsAvalue(userKey)}</td>
                                                            <td>{user.student[userKey]}</td>
                                                        </tr>
                                                    );
                                                }
                                            })) : (
                                                <tr className='nunito'><td className='orange' colSpan={2}>Failed to fetch the data</td></tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="studenBlock">
                            <div className="outercoverignBlock Cie1Info">
                                <div className="studentInfoContainer nunito"><h2>CIE1 Details</h2></div>
                                <table>
                                    <tbody>

                                        {
                                            user.review.cie1 ? (Object.keys(user.review.cie1).map(userKey => {
                                                if (userKey === 'iscie1') return null
                                                else
                                                    return (
                                                        <tr key={userKey} className='nunito'>
                                                            <td>{returnsAvalue(userKey) || userKey}</td>
                                                            <td>{user.review.cie1[userKey]}</td>
                                                        </tr>
                                                    );
                                            })) : (<tr className='nunito'><td className='orange' colSpan={2}>Failed to fetch the data</td></tr>)
                                        }


                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="studenBlock">
                            <div className="outercoverignBlock Cie1Info">
                                <div className="studentInfoContainer nunito"><h2>CIE2 Details</h2></div>
                                <table>
                                    <tbody>

                                        {
                                            user.review.cie2 ? (Object.keys(user.review.cie2).map(userKey => {
                                                if (userKey === 'iscie2') return null
                                                else
                                                    return (
                                                        <tr key={userKey} className='nunito'>
                                                            <td>{returnsAvalue(userKey) || userKey}</td>
                                                            <td>{user.review.cie2[userKey]}</td>
                                                        </tr>
                                                    );
                                            })) : (<tr className='nunito'><td className='orange' colSpan={2}>Failed to fetch the data</td></tr>)
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="studenBlock">
                            <div className="outercoverignBlock Cie1Info">
                                <div className="studentInfoContainer nunito"><h2>CIE3 Details</h2></div>
                                <table>
                                    <tbody>
                                        {
                                            user.review.cie3 ? (Object.keys(user.review.cie3).map(userKey => {
                                                if (userKey === 'iscie3') return null
                                                else
                                                    return (
                                                        <tr key={userKey} className='nunito'>
                                                            <td>{returnsAvalue(userKey) || userKey}</td>
                                                            <td>{user.review.cie3[userKey]}</td>
                                                        </tr>
                                                    );
                                            })) : (<tr className='nunito'><td className='orange' colSpan={2}>Failed to fetch the data</td></tr>)
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="studenBlock">
                            <div className="outercoverignBlock Cie1Info">
                                <div className="studentInfoContainer nunito"><h2>SEE Details</h2></div>
                                <table>
                                    <tbody>
                                        {
                                            user.review.see ? (Object.keys(user.review.see).map(userKey => {
                                                if (userKey === 'issee') return null
                                                else
                                                    return (
                                                        <tr key={userKey} className='nunito'>
                                                            <td>{returnsAvalue(userKey) || userKey}</td>
                                                            <td>{user.review.see[userKey]}</td>
                                                        </tr>
                                                    );
                                            })) : (<tr className='nunito'><td className='orange' colSpan={2}>Failed to fetch the data</td></tr>)
                                        }


                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
