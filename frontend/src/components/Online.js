import React from 'react'
import {useId} from '../hooks/useId'
import './online.css'

const Online = ({user, online, allMembers, convoAdded}) => {
  const currentUserId = useId()
  const onlineUserId = online.map((o) => o.userId)

  const handleClick = async (e) => {
    e.preventDefault()

    if(user._id !== currentUserId && !allMembers?.includes(user._id)){
      const reqBody = {
        senderId: currentUserId,
        recipientId: user._id
      }
    const newConvo = await fetch('/api/conversation/', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {"Content-Type": "application/json"}
    })  
    const json = await newConvo.json()
    convoAdded(json)
  }
  }

  return (
    <div className="online">
        <div className="onlineImgContainer">
            <img src="https://i.picsum.photos/id/791/200/200.jpg?hmac=bPVayqOX5aUzsnsX99AgWaxWB3WzWqwaiSDJ-lNHUk4" className="onlineImg"/>
            <span className={`onlineIcon ${onlineUserId?.includes(user._id) ? 'green' : 'red'}`}></span>
        </div>
        <span className="onlineName" onClick={handleClick}>{user.email.split('@')[0]}</span>
    </div>
  )
}

export default Online