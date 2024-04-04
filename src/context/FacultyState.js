import React, { useEffect, useState } from 'react'
import FacultyProfileContext from './FacultyContext'

export default function FacultyState(props) {
  const [faculty, setFaculty] = useState(() => {
    const data = localStorage.getItem("faculty");
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
    const data = localStorage.getItem("faculty");
    if (data) {
      // console.log("object")
      const parsedData = JSON.parse(data);
      setFaculty({
        name: parsedData.name || "",
        id: parsedData.id || "",
        token: parsedData.token || "",
        isSuccess: parsedData.isSuccess || false
      });
    } else {
      setFaculty({ name: "", id: "", isSuccess: false, token: "" });
    }
  }, []);

  const updateFaculty = (data) => {
    console.log(faculty)
    if (data) {
      localStorage.setItem("faculty", JSON.stringify({ name: data.facultyInfo.name, id: data.facultyInfo.id, isSuccess: true, token: data.facultyInfo.token }))
      setFaculty({ name: data.facultyInfo.name, id: data.facultyInfo.id, isSuccess: true, token: data.facultyInfo.token })
    }
    else {
      setFaculty({ name: "", id: "", isSuccess: false, token: "" })
    }
  }

  return (
    <FacultyProfileContext.Provider value={{ faculty, updateFaculty }}>
      {props.children}
    </FacultyProfileContext.Provider>
  )
}
