import React from 'react'
import Chart from '../components/Chart'
import HODForm from './Hodform'
// import styles from '../components/Form.module.css'

export default function HeadofDept(props) {
  return (
    <>
      <Chart className="nameBlock">Dr Jyothi NS | EEE06</Chart>
      {
        props.hoddisplay ? 
        <>
         <p className='question hodqna'>These questions are not answered by the respective teachers. </p>
          <Chart >
            <Chart className="hodmainBlock">
              <div className="newblock">
                {props.hodstate.map((newstate, index) => (
                  <HODForm
                    key={index}
                    newstate={newstate}
                  />
                ))}
              </div>
            </Chart>
          </Chart> 
          </> : <>
         <p className='question hodqna'>All the conversations are up-to date. </p>
          
          </>
      }
    </>
  )
}

