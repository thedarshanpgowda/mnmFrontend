import React, { useEffect } from 'react'
import { useState, useContext } from 'react';
import StudentProfileContext from "../context/Newcontext";
import axios from 'axios';
import { BASE_URL } from '../helper';


export default function RightSubMainlanding() {
    const user1 = useContext(StudentProfileContext);
    const [ciedet, setCiedet] = useState({ cie1: {}, cie2: {}, cie3: {}, });
    const [user, setUser] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const handleInputChange = (e, key, subKey) => {
        const value = e.target.value;
        setCiedet(prevState => ({
            ...prevState,
            [key]: {
                ...prevState[key],
                [subKey]: value
            }
        }));
    };

    const cieSubmit = async (key) => {
        console.log(key, ciedet[key]);
        // console.log(ciedet)
        setCiedet(prevState => {
            let k = `is${key}`;
            return {
                ...prevState,
                [key]: {
                    ...prevState[key],
                    [k]: true,

                }
            };
        });

        const obj = {
            [key]: { ...ciedet[key], facultyComment: "", }
        }
        console.log(obj)
        await axios.post(`${BASE_URL}/api/review`, obj, {
            headers: {
                Authorization: `Bearer ${user1.user.token}`
            }
        })
            .then(res => {
                let k = `is${key}`;
                console.log(res)
                setUser(prev => ({ ...prev, [k]: false }))
            })
            .catch(e => {
                console.log(e)
            })

    };

    useEffect(() => {
        const main = async () => {
            try {
                await axios.get(`${BASE_URL}/api/review`, {
                    headers: {
                        Authorization: `Bearer ${user1.user.token}`
                    }
                })
                    .then(res => {
                        console.log(res.data.reviewData)
                        setUser(res.data.reviewData)
                        if (res.data.reviewData.cie1) {
                            setUser({ iscie1: false, iscie2: true, iscie3: true, issee: true })
                        }
                        if (res.data.reviewData.cie2 && res.data.reviewData.cie2) {
                            setUser({ iscie1: false, iscie2: false, iscie3: true, issee: true })
                        }
                        if (res.data.reviewData.cie3 && res.data.reviewData.cie2 && res.data.reviewData.cie1) {
                            setUser({ iscie1: false, iscie2: false, iscie3: false, issee: true })
                        }
                        if (res.data.reviewData.cie3 && res.data.reviewData.cie2 && res.data.reviewData.cie1 && res.data.reviewData.see) {
                            setUser({ iscie1: false, iscie2: false, iscie3: false, issee: false })
                        }
                        if (!res.data.reviewData.cie3 && !res.data.reviewData.cie2 && !res.data.reviewData.cie1 && !res.data.reviewData.see) {

                            setUser({ iscie1: true, iscie2: true, iscie3: true, issee: true })
                        }
                    })
            }
            catch (e) {
                console.log(e)
            }
            finally {
                setIsLoading(false)
            }
        }
        main()
    }, [])

    return (
        <div className="mainstudentBlock">
            <div className="mainnavbartop">
                <div className="studentDataInfoNavbar">
                    <div className="imageContainerBlock">
                        <img src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D" alt="profile" />
                    </div>
                </div>
            </div>
            <div className="mainContentblock">
                <div className="studentInfoName ">
                    <div className="studentCredentials">
                        <h1 className="h1 nunito">{user1.user.name}</h1>
                        <p className="p nunito">{user1.user.id}</p>
                    </div>
                    {user1.user.address ? <p className="addr nunito">{user1.user?.addr}</p> : <p className="addr nunito">Malnad College of Engineering</p>}
                </div>
                <div className="studentDetailsBlock1 nunito">
                    <div className="examinationDetails">
                    <div className="orange nunito">This data will be stored permanently and cannot be changed in the future.</div>
                        {isLoading ? (<p className='nunito orange'>Your data is being Fetched from the server...</p>) : (
                            <div className="examBlockDetails">
                                {/* CIE1 */}
                                {user.iscie1 ? (<>
                                    <p className="nunito paragraph">Enter your CIE1 marks</p>
                                    <div className="cie cie1 ">
                                        <div className="nunito completedetails completedetailscie1">
                                            <div className="subjectHandler">
                                                <div className="inputBlockContainer">
                                                    <input type="text" placeholder='21CS601 marks' onChange={(e) => handleInputChange(e, 'cie1', '21CS601')} />
                                                </div>
                                                <div className="inputBlockContainer">
                                                    <input type="text" placeholder='21CS602 marks' onChange={(e) => handleInputChange(e, 'cie1', '21CS602')} />
                                                </div>
                                                <div className="inputBlockContainer">
                                                    <input type="text" placeholder='21CS601 marks' onChange={(e) => handleInputChange(e, 'cie1', '21CS603')} />
                                                </div>
                                                <div className="inputBlockContainer">
                                                    <input type="text" placeholder='21CS602 marks' onChange={(e) => handleInputChange(e, 'cie1', '21CS604')} />
                                                </div>
                                                <div className="inputBlockContainer">
                                                    <input type="text" placeholder='21CS602 marks' onChange={(e) => handleInputChange(e, 'cie1', '21CS605')} />
                                                </div>
                                            </div>
                                            <div className="reasonsFor">
                                                <div className="inputBlockContainer2">
                                                    <textarea type="text" placeholder='Enter your reason' onChange={(e) => handleInputChange(e, 'cie1', "studentComment")} />
                                                </div>
                                            </div>
                                        </div>
                                        <button className="cie1Submit" onClick={() => cieSubmit('cie1')}>
                                            Submit
                                        </button>
                                    </div>
                                </>) : (
                                    <div className="success">You have already submitted CIE1 details.</div>
                                )}
                                {/* CIE2 */}
                                {
                                    user.iscie2 ? (
                                        <>
                                            <p className="nunito paragraph">Enter your CIE2 marks</p>
                                            <div className="cie cie1 ">
                                                <div className="nunito completedetails completedetailscie1">
                                                    <div className="subjectHandler">
                                                        <div className="inputBlockContainer">
                                                            <input type="text" placeholder='21CS601 marks' onChange={(e) => handleInputChange(e, 'cie2', '21CS601')} />
                                                        </div>
                                                        <div className="inputBlockContainer">
                                                            <input type="text" placeholder='21CS602 marks' onChange={(e) => handleInputChange(e, 'cie2', '21CS602')} />
                                                        </div>
                                                        <div className="inputBlockContainer">
                                                            <input type="text" placeholder='21CS601 marks' onChange={(e) => handleInputChange(e, 'cie2', '21CS603')} />
                                                        </div>
                                                        <div className="inputBlockContainer">
                                                            <input type="text" placeholder='21CS602 marks' onChange={(e) => handleInputChange(e, 'cie2', '21CS604')} />
                                                        </div>
                                                        <div className="inputBlockContainer">
                                                            <input type="text" placeholder='21CS602 marks' onChange={(e) => handleInputChange(e, 'cie2', '21CS605')} />
                                                        </div>
                                                    </div>
                                                    <div className="reasonsFor">
                                                        <div className="inputBlockContainer2">
                                                            <textarea type="text" placeholder='Enter your reason' onChange={(e) => handleInputChange(e, 'cie2', "studentComment")} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <button className="cie1Submit" onClick={() => cieSubmit('cie2')}>
                                                    Submit
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="success">You have already submitted CIE2 details.</div>
                                    )
                                }
                                {/* CIE3 */}
                                {
                                    user.iscie3 ? (
                                        <>
                                            <p className="nunito paragraph">Enter your CIE3 marks</p>
                                            <div className="cie cie1 ">
                                                <div className="nunito completedetails completedetailscie1">
                                                    <div className="subjectHandler">
                                                        <div className="inputBlockContainer">
                                                            <input type="text" placeholder='21CS601 marks' onChange={(e) => handleInputChange(e, 'cie3', '21CS601')} />
                                                        </div>
                                                        <div className="inputBlockContainer">
                                                            <input type="text" placeholder='21CS602 marks' onChange={(e) => handleInputChange(e, 'cie3', '21CS602')} />
                                                        </div>
                                                        <div className="inputBlockContainer">
                                                            <input type="text" placeholder='21CS603 marks' onChange={(e) => handleInputChange(e, 'cie3', '21CS603')} />
                                                        </div>
                                                        <div className="inputBlockContainer">
                                                            <input type="text" placeholder='21CS604 marks' onChange={(e) => handleInputChange(e, 'cie3', '21CS604')} />
                                                        </div>
                                                        <div className="inputBlockContainer">
                                                            <input type="text" placeholder='21CS605 marks' onChange={(e) => handleInputChange(e, 'cie3', '21CS605')} />
                                                        </div>
                                                    </div>
                                                    <div className="reasonsFor">
                                                        <div className="inputBlockContainer2">
                                                            <textarea type="text" placeholder='Enter your reason' onChange={(e) => handleInputChange(e, 'cie3', "studentComment")} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <button className="cie1Submit" onClick={() => cieSubmit('cie3')}>
                                                    Submit
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="success">You have already submitted CIE3 details.</div>
                                    )
                                }


                                {/* SEE */}
                                {
                                    user.issee ? (
                                        <>
                                            <p className="nunito paragraph">Enter your SEE marks</p>
                                            <div className="cie see ">
                                                <div className="nunito completedetails completedetailscie1">
                                                    <div className="subjectHandler">
                                                        <div className="inputBlockContainer">
                                                            <input type="text" placeholder='21CS601 marks' onChange={(e) => handleInputChange(e, 'see', '21CS601')} />
                                                        </div>
                                                        <div className="inputBlockContainer">
                                                            <input type="text" placeholder='21CS602 marks' onChange={(e) => handleInputChange(e, 'see', '21CS602')} />
                                                        </div>
                                                        <div className="inputBlockContainer">
                                                            <input type="text" placeholder='21CS601 marks' onChange={(e) => handleInputChange(e, 'see', '21CS603')} />
                                                        </div>
                                                        <div className="inputBlockContainer">
                                                            <input type="text" placeholder='21CS602 marks' onChange={(e) => handleInputChange(e, 'see', '21CS604')} />
                                                        </div>
                                                        <div className="inputBlockContainer">
                                                            <input type="text" placeholder='21CS602 marks' onChange={(e) => handleInputChange(e, 'see', '21CS605')} />
                                                        </div>
                                                    </div>
                                                    <div className="reasonsFor">
                                                        <div className="inputBlockContainer2">
                                                            <textarea type="text" placeholder='Enter your reason' onChange={(e) => handleInputChange(e, 'see', "studentComment")} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <button className="cie1Submit" onClick={() => cieSubmit('see')}>
                                                    Submit
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="success">You have already submitted SEE details.</div>

                                    )
                                }
                            </div>)}
                    </div>
                </div>
            </div>
        </div >

    );
}

