import React, { useEffect, useState } from 'react'
import StudentProfileContext from './Newcontext'

export default function Newstate(props) {
    const [user, setUser] = useState(()=>{
        const data = localStorage.getItem("data");
        if (data) {
          const parsedData = JSON.parse(data);
          return {
            name: parsedData.name || "",
            id: parsedData.id || "",
            token: parsedData.token || "",
            isSuccess: parsedData.isSuccess || false
          };
        } else {
          return { name: "", id: "", isSuccess: false, token: "" };
        }
    });

    useEffect(() => {
        const data = localStorage.getItem("data");
        if (data) {
            const parsedData = JSON.parse(data);
            setUser({
                name: parsedData.name || "",
                id: parsedData.id || "",
                token: parsedData.token || "",
                isSuccess: parsedData.isSuccess || false
            });
        } else {
            setUser({ name: "", id: "", isSuccess: false, token: "" });
        }
    }, []);
    const updateUser = (data) => {
        console.log(data)
        if (data) {
            // console.log("data if")
            localStorage.setItem("data", JSON.stringify({ name: data.studentInfo.name, id: data.studentInfo.usn, isSuccess: true, token: data.studentInfo.token }))
            setUser({ name: data.studentInfo.name, id: data.studentInfo.usn, isSuccess: true, token: data.studentInfo.token })
        }
        else {
            // console.log("data else")
            setUser({ name: "", id: "", isSuccess: false, token: "" })
        }
    }
    return (
        <StudentProfileContext.Provider value={{ user, updateUser }}>
            {props.children}
        </StudentProfileContext.Provider>
    )
}

