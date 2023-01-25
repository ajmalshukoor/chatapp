import React from 'react'
import {format} from 'timeago.js'
import './message.css'

const Message = ({message, own}) => {
  return (
    <>
    <div className={`message ${own ? 'own' : ''}`}>
      <div className="messageTop">
        <img
          className="messageImg"
          src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
    {/* <div className="message own">
      <div className="messageTop">
        <img
          className="messageImg"
          src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
        />
        <p className="messageText">Leoporsma nskjdfn sdfnsjdafnsjkf asd</p>
      </div>
      <div className="messageBottom">4 min ago</div>
    </div> */}
    </>
  )
}

export default Message