import React from 'react'
import { useState, useEffect } from 'react';
import axios from "axios";
import HeadofDept from './HeadofDept'
import {BASE_URL} from '../helper'
export default function Mainhodblock() {
    const [hodstate, sethodState] = useState([]);
    const [hoddisplay, setHoddisplay] = useState(true)
  
    useEffect(() => {
      axios
        .get(`${BASE_URL}/api/faculty/home`, {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIxQ1MwMDEiLCJ1c2VyVHlwZSI6ImZhY3VsdHkiLCJpYXQiOjE1MTYyMzkwMjJ9.t3vKgqQRc4r9_hCS5xgJNcko19cjFrCH-bZ-d7YuR_w",
          },
        })
        .then((res) => { 
          sethodState(res.data.data) 
          console.log(res.data.data)
          if(res.data.data.length===0){
            console.log(res.data.data.length)
            setHoddisplay(false)
          }
          else{
            setHoddisplay(true)
          }
        })
        .catch((err) => console.log(err));
    }, []);
  
    return (
      <>
        <HeadofDept
          hodstate={hodstate}
          hoddisplay={hoddisplay}
        />
      </>
    )
}
