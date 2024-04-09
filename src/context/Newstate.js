import React, { useEffect, useState } from 'react'
import StudentProfileContext from './Newcontext'

export default function Newstate(props) {
    const [user, setUser] = useState(() => {
        const data = localStorage.getItem("data");
        if (data) {
            const parsedData = JSON.parse(data);
            return parsedData;
        } else {
            return {
                name: undefined,
                id: undefined,
                blood: undefined,
                email: undefined,
                branch: undefined,
                dept: undefined,
                phone: undefined,
                mentorId: undefined,
                dob: undefined,
                addr: undefined,
                mother: undefined,
                father: undefined,
                token: undefined,
                sem : undefined,
                img : undefined,
            };
        }
    });

    useEffect(() => {
        const data = localStorage.getItem("data");
        if (data) {
            const parsedData = JSON.parse(data);
            setUser(parsedData);
        } else {
            setUser({
                name: undefined,
                id: undefined,
                blood: undefined,
                email: undefined,
                dept: undefined,
                phone: undefined,
                branch: undefined,
                dob: undefined,
                mentorId: undefined,
                img : undefined,
                addr: undefined,
                sem: undefined,
                token: undefined,
                mother: undefined,
                father: undefined
            });
        }
    }, []);



    const updateUser = (data) => {
        if (data) {
            console.log(data)
            const userData = {
                name: data.studentInfo.data.name || undefined,
                id: data.studentInfo.data.usn || undefined,
                blood: data.studentInfo.data.blood || undefined,
                email: data.studentInfo.data.email || undefined,
                dept: data.studentInfo.data.dept || undefined,
                phone: data.studentInfo.data.phone || undefined,
                dob: data.studentInfo.data.dob || undefined,
                addr: data.studentInfo.data.address || undefined,
                branch: data.studentInfo.data.branch || undefined,
                mentorId: data.studentInfo.data.mentorId || undefined,
                sem: data.studentInfo.data.sem || undefined,
                mother: data.studentInfo.data.mother || undefined,
                father: data.studentInfo.data.father || undefined,
                isSuccess: true,
                img : data.studentInfo.data.img,
                token: data.studentInfo.token || undefined
            };
            localStorage.setItem("data", JSON.stringify(userData));
            console.log(data)
            setUser(userData);
        } else {
            setUser({
                name: undefined,
                id: undefined,
                blood: undefined,
                email: undefined,
                dept: undefined,
                branch: undefined,
                img : undefined,
                phone: undefined,
                dob: undefined,
                mentorId: undefined,
                addr: undefined,
                sem: undefined,
                mother: undefined,
                father: undefined,
                isSuccess: false,
                token: undefined
            });
        }
    }


    return (
        <StudentProfileContext.Provider value={{ user, updateUser }}>
            {props.children}
        </StudentProfileContext.Provider>
    )
}
