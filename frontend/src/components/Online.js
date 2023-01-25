import React from 'react'
import './online.css'

const Online = () => {
  return (
    <div className="online">
        <div className="onlineImgContainer">
            <img src="https://i.picsum.photos/id/791/200/200.jpg?hmac=bPVayqOX5aUzsnsX99AgWaxWB3WzWqwaiSDJ-lNHUk4" className="onlineImg"/>
            <span className="onlineIcon"></span>
        </div>
        <span className="onlineName">John</span>
    </div>
  )
}

export default Online