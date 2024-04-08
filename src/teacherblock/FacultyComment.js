import './facultyblock.css'
import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { BASE_URL } from '../helper'
import FacultyProfileContext from '../context/FacultyContext'
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export function StudentContainerBlock(props) {
    const faculty = useContext(FacultyProfileContext);
    const cie1 = useRef();
    const cie2 = useRef();
    const cie3 = useRef();
    const see = useRef();
    const [arr, setArr] = useState({});

    const submiteenthandlerblock = async (key, reference) => {
        let k = `cie${key}`;
        if (key == 4)
            k = `see`;
        const updatedData = { ...arr };
        console.log(updatedData)
        updatedData[k].facultyComment = reference.current.value;
        console.log(updatedData);
        setArr(prevState => ({
            ...prevState,
            data: {
                ...prevState,
                [k]: {
                    ...prevState[k],
                    facultyComment: reference.current.value
                }
            }
        }));
        const obj = {
            cieNo: key,
            usn: props.studentView.data.usn,
            comment: reference.current.value
        }
        console.log(obj)
        try {
            await axios.post(`${BASE_URL}/api/faculty/review`, obj, {
                headers: {
                    Authorization: `Bearer ${faculty.faculty.token}`
                }
            }).then(res => {
                console.log(res)
            })
        }
        catch (e) {
            console.log(e)
        }
    };

    useEffect(() => {
        setArr(props.studentView.data);
    }, []);

    const generatePDF = (student) => {
        const doc = new jsPDF();
        let y = 10; // Initial y position for content

        // Add USN
        doc.setFontSize(14);
        doc.text(`USN: ${student.usn}`, 14, y);
        y += 20;

        // Function to generate a table for CIE/See data
        const generateTable = (dataObject, title) => {
            if (!dataObject) {
                return; // Skip if data object doesn't exist
            }

            doc.setFontSize(14);
            doc.text(title, 14, y);
            y += 10;

            const tableData = Object.keys(dataObject).map(subject => ({
                Subject: subject,
                Marks: dataObject[subject]
            }));

            doc.autoTable({
                startY: y,
                body: tableData,
                theme: 'striped', // Add some style to the table
                columns: [{ header: 'Subject', dataKey: 'Subject' }, { header: 'Marks', dataKey: 'Marks' }]
            });

            y = doc.autoTable.previous.finalY + 10; // Update y position for the next section
        };

        // Generate tables for CIE/See data
        generateTable(student.cie1, "CIE 1 Details");
        generateTable(student.cie2, "CIE 2 Details");
        generateTable(student.cie3, "CIE 3 Details");
        generateTable(student.see, "See Details");

        doc.save("student_report.pdf");
    };





    return (
        <div className='facultycommentingblock'>

            <div className="studentcontrolblockforFaculty">
                <div className="cancelBlock">
                    <img src="https://cdn-icons-png.flaticon.com/128/54/54476.png" alt="" onClick={() => {
                        props.setStudentView(prev => ({ ...prev, view: true }));
                    }} />
                </div>
                <div className="containerstudentBlock">
                    <h2 className="nunito">{arr.usn}</h2>
                    <button className='button btn1' onClick={() => {
                        generatePDF(arr)
                    }}>Generate PDF Report</button>
                    <div className="studentDetails">
                        <div className="outercoverignBlock studentInfo">
                            <div className="studentInfoContainer nunito">
                                <h2>CIE1 Details</h2>
                            </div>
                            <table>
                                <tbody>
                                    {arr && arr.cie1 ? (
                                        Object.keys(arr.cie1).map(userKey => {
                                            if (
                                                userKey === '__v' ||
                                                userKey === '_v' ||
                                                userKey === '_id' ||
                                                userKey === 'password' ||
                                                (userKey === 'facultyComment' && arr.cie1[userKey] === "")
                                            ) {
                                                return null;
                                            } else {
                                                return (
                                                    <tr key={userKey} className='nunito'>
                                                        <td>{userKey.charAt(0).toUpperCase() + userKey.substring(1)}</td>
                                                        <td>
                                                            {userKey === 'facultyComment' && arr.cie1[userKey] !== "" ? (
                                                                arr.cie1[userKey]
                                                            ) : (
                                                                arr.cie1[userKey]
                                                            )}
                                                        </td>
                                                    </tr>
                                                );
                                            }
                                        })
                                    ) : (
                                        <tr className='nunito'>
                                            <td colSpan="2" className="orange">No data available</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            {arr.cie1 && arr.cie1.facultyComment === "" ? (
                                <>
                                    <div className="facultyReview">
                                        <input
                                            type="text"
                                            className="cie1review"
                                            ref={cie1}
                                            placeholder='Provide your comment on this student for CIE1'
                                            readOnly={!!(arr && arr.cie1 && arr.cie1.facultyComment)}
                                            defaultValue={(arr && arr.cie1 && arr.cie1.facultyComment) || ''}
                                        />
                                    </div>
                                    <button
                                        className='ciesubmit'
                                        onClick={(e) => {
                                            e.preventDefault()
                                            submiteenthandlerblock(1, cie1)
                                        }}
                                    >
                                        submit
                                    </button>
                                </>
                            ) : (
                                <p className='success nunito'>You have successfully submitted CIE1 Details</p>
                            )}
                        </div>

                        {/* CIE2 Details */}
                        {arr && arr.cie2 && Object.keys(arr.cie2).length > 0 && (
                            <div className="outercoverignBlock studentInfo">
                                <div className="studentInfoContainer nunito">
                                    <h2>CIE2 Details</h2>
                                </div>
                                <table>
                                    <tbody>
                                        {Object.keys(arr.cie2).map(userKey => {
                                            if (
                                                userKey === 'iscie2' ||
                                                (userKey === 'facultyComment' && arr.cie2[userKey] === "")
                                            ) return null;
                                            return (
                                                <tr key={userKey} className='nunito'>
                                                    <td>{userKey.charAt(0).toUpperCase() + userKey.substring(1)}</td>
                                                    <td>
                                                        {userKey === 'facultyComment' && arr.cie2[userKey] !== "" ? (
                                                            arr.cie2[userKey]
                                                        ) : (
                                                            arr.cie2[userKey]
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                                {arr.cie2 && arr.cie2.facultyComment === "" ? (
                                    <>
                                        <div className="facultyReview">
                                            <input
                                                type="text"
                                                className="cie1review"
                                                ref={cie2}
                                                placeholder='Provide your comment on this student for CIE2'
                                                readOnly={!!(arr && arr.cie2 && arr.cie2.facultyComment)}
                                                defaultValue={(arr && arr.cie2 && arr.cie2.facultyComment) || ''}
                                            />
                                        </div>
                                        <button
                                            className='ciesubmit'
                                            onClick={(e) => {
                                                e.preventDefault()
                                                submiteenthandlerblock(2, cie2)
                                            }}
                                        >
                                            submit
                                        </button>
                                    </>
                                ) : (
                                    <p className='success nunito'>You have successfully submitted CIE2 Details</p>
                                )}
                            </div>
                        )}

                        {/* CIE3 Details */}
                        {arr && arr.cie3 && Object.keys(arr.cie3).length > 0 && (
                            <div className="outercoverignBlock studentInfo">
                                <div className="studentInfoContainer nunito">
                                    <h2>CIE3 Details</h2>
                                </div>
                                <table>
                                    <tbody>
                                        {Object.keys(arr.cie3).map(userKey => {
                                            if (
                                                userKey === 'iscie3' ||
                                                (userKey === 'facultyComment' && arr.cie3[userKey] === "")
                                            ) return null;
                                            return (
                                                <tr key={userKey} className='nunito'>
                                                    <td>{userKey.charAt(0).toUpperCase() + userKey.substring(1)}</td>
                                                    <td>
                                                        {userKey === 'facultyComment' && arr.cie3[userKey] !== "" ? (
                                                            arr.cie3[userKey]
                                                        ) : (
                                                            arr.cie3[userKey]
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                                {arr.cie3 && arr.cie3.facultyComment === "" ? (
                                    <>
                                        <div className="facultyReview">
                                            <input
                                                type="text"
                                                className="cie1review"
                                                ref={cie3}
                                                placeholder='Provide your comment on this student for CIE3'
                                                readOnly={!!(arr && arr.cie3 && arr.cie3.facultyComment)}
                                                defaultValue={(arr && arr.cie3 && arr.cie3.facultyComment) || ''}
                                            />
                                        </div>
                                        <button
                                            className='ciesubmit'
                                            onClick={(e) => {
                                                e.preventDefault()
                                                submiteenthandlerblock(3, cie3)
                                            }}
                                        >
                                            submit
                                        </button>
                                    </>
                                ) : (
                                    <p className='success nunito'>You have successfully submitted CIE3 Details</p>
                                )}
                            </div>
                        )}

                        {/* SEE Details */}
                        {arr && arr.see && Object.keys(arr.see).length > 0 && (
                            <div className="outercoverignBlock studentInfo">
                                <div className="studentInfoContainer nunito">
                                    <h2>SEE Details</h2>
                                </div>
                                <table>
                                    <tbody>
                                        {Object.keys(arr.see).map(userKey => {
                                            if (
                                                userKey === 'issee' ||
                                                (userKey === 'facultyComment' && arr.see[userKey] === "")
                                            ) return null;
                                            return (
                                                <tr key={userKey} className='nunito'>
                                                    <td>{userKey.charAt(0).toUpperCase() + userKey.substring(1)}</td>
                                                    <td>
                                                        {userKey === 'facultyComment' && arr.see[userKey] !== "" ? (
                                                            arr.see[userKey]
                                                        ) : (
                                                            arr.see[userKey]
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                                {arr.see && arr.see.facultyComment === "" ? (
                                    <>
                                        <div className="facultyReview">
                                            <input
                                                type="text"
                                                className="cie1review"
                                                ref={see}
                                                placeholder='Provide your comment on this student for SEE'
                                                readOnly={!!(arr && arr.see && arr.see.facultyComment)}
                                                defaultValue={(arr && arr.see && arr.see.facultyComment) || ''}
                                            />
                                        </div>
                                        <button
                                            className='ciesubmit'
                                            onClick={(e) => {
                                                e.preventDefault()
                                                submiteenthandlerblock(4, see)
                                            }}
                                        >
                                            submit
                                        </button>
                                    </>
                                ) : (
                                    <p className='success nunito'>You have successfully submitted SEE Details</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}








export default function FacultyComment() {
    const faculty = useContext(FacultyProfileContext)
    const [isLoading, setIsLoading] = useState(true)
    const [studentView, setStudentView] = useState({
        view: true,
        data: {}
    })
    const [studentdata, setstudentdata] = useState([])

    useEffect(() => {
        const main = async () => {
            try {
                await axios.get(`${BASE_URL}/api/faculty/review`, {
                    headers: {
                        Authorization: `Bearer ${faculty.faculty.token}`
                    }
                }).then(res => {
                    // console.log(res.data.data)
                    setstudentdata(res.data.data)
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

    const eventhandler = (student) => {
        setStudentView({ data: student, view: false })
    }
    return studentView.view ? (
        <div className="facultycommentingblock">
            <div className="mainnavbartop">
                <div className="studentDataInfoNavbar">
                    <div className="imageContainerBlock">
                        <img
                            src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
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
                isLoading ? (<p className='nunito'>Fetching your data from the server ....</p>) : (
                    <div className="mainContentblock">
                        <div className="studentInfoName ">
                            <div className="studentCredentials">
                                <h1 className="h1 nunito">{faculty.faculty.name}</h1>
                                <p className="p nunito">{faculty.faculty.id}</p>
                            </div>
                            {faculty.faculty.address ? (
                                <p className="addr nunito">{faculty.faculty.addr}</p>
                            ) : (
                                <p className="addr nunito">Malnad College of Engineering</p>
                            )}
                        </div>
                        <div className="studenBlock">
                            <div className="outercoverignBlock studentInfo">
                                <div className="studentInfoContainer nunito"><h2>Student Details</h2></div>
                                {
                                    studentdata.length === 0 ? (
                                        <div className='nunito'>
                                            <p className="orange">No student's have submitted their data</p>
                                        </div>
                                    ) : (
                                        <div className="studentainfocorner">
                                            {studentdata
                                                .sort((a, b) => parseInt(a.usn.slice(-3)) - parseInt(b.usn.slice(-3)))
                                                .map(student => (
                                                    <div key={student._id} className={`singlestudentblock ${((student.cie1 && student.cie1.facultyComment) || !student.cie1) &&
                                                        ((student.cie2 && student.cie2.facultyComment) || !student.cie2) &&
                                                        ((student.cie3 && student.cie3.facultyComment) || !student.cie3) &&
                                                        ((student.see && student.see.facultyComment) || !student.see)
                                                        ? "success" : ""
                                                        }`}>                                                        <p className='usnblock nunito'>{student.usn}</p>
                                                        <div className="imagecontainer" onClick={() => {
                                                            eventhandler(student)
                                                        }}>
                                                            <img src="https://cdn-icons-png.flaticon.com/128/2983/2983677.png" alt="" />
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                    )
                                }




                            </div>
                        </div>
                    </div>
                )}
        </div>


    )
        : (<>
            <StudentContainerBlock studentView={studentView} setStudentView={setStudentView} />
        </>)
}
