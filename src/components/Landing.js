import React from 'react'
import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <div>
      <Link to="/mnm/" className='flexbox'>student</Link>
      <Link to="/mnm/faculty" className='flexbox'>teacher</Link>
    </div>
  )
}
