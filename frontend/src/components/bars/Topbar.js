import React, {useState} from 'react'
import {useLogout} from '../../hooks/useLogout'
import {useAuthContext} from '../../hooks/useAuthContext'
import './topbar.css'

const Topbar = () => {
  const {logout} = useLogout()

  const handleClick = () => {
      logout()
      // disconnected("value")
  }

  return (
    <div className="topbarContainer">
        <div className="topbarLeft">
            <span>Chat App</span>
        </div>
        <div className="topbarRight">
            <span onClick={handleClick}>Logout</span>
        </div>
    </div>
  )
}

export default Topbar