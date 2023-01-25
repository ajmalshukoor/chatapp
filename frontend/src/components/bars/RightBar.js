import React from 'react'
import Online from '../Online'
import './rightbar.css'

const Rightbar = () => {
  return (
    <div className="rightbar">
        <h3 className="rightbarHeading">Users</h3>
        <div className="rightbarWrapper">
            <Online/>
            <Online/>
        </div>
    </div>
  )
}

export default Rightbar