import React, { useEffect, useState, useRef } from 'react'
import Message from '../Message'
import { useMessageContext } from '../../hooks/useMessageContext'
import { useId } from '../../hooks/useId'
import {Send} from '@material-ui/icons'
import {io} from 'socket.io-client'
import './centerbar.css'

const Centerbar = () => {
  const sender = useId()
  const scrollRef = useRef(null)
  const [text, setText] = useState()
  const {convoId} = useMessageContext()
  const [message, setMessage] = useState([])
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const conversationId = convoId.id
  const socket = useRef()

  useEffect(() => {
    socket.current = io("ws://localhost:8900")
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now()
      })
    })
  }, [])
  
  useEffect(() => {
    scrollRef.current?.scrollIntoView({behavior: "smooth"})
  }, [])

  useEffect(() => {
    arrivalMessage && setMessage((prev) => [...prev, arrivalMessage])
  }, [arrivalMessage])

  useEffect(() => {
    const getMessages = async () => {
      const msg = await fetch('/api/message/'+convoId.id, {
        method: 'GET',
      })
      const json = await msg.json()
      setMessage(json)
    }
    getMessages()
  }, [convoId])


  useEffect(() => {
    socket.current.emit("addUser", sender)
    socket.current.on("getUsers", users=>{
    })
  }, [sender])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(text){
      const sendItem = {conversationId, sender, text}
      await fetch('/api/message', {
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(sendItem)
      })

      socket.current.emit("sendMessage", {
        senderId: sender,
        recipientId: convoId.recipientId,
        text
      })

      setText('')
    }
  }

  return (
    <div className="centerbar">
      {(message?.length == 0 && !convoId)
      && <h3 className="centerbarNoMessage">Start a conversation</h3>}
      { convoId &&
      <>
      <div className="centerbarHead">
          <div className="centerbarHeadName">
            <img src="https://i.picsum.photos/id/791/200/200.jpg?hmac=bPVayqOX5aUzsnsX99AgWaxWB3WzWqwaiSDJ-lNHUk4" className="convoImg"/>
            <span className="convoName">{convoId.username}</span>
          </div>
          <p>Active 5 min ago</p>
        </div>
        <div className="centerbarMessages">
          {message?.map((m, i) => {
            return (
            <div ref={scrollRef} key={m._id}>
              <Message message={m} own={m.sender === sender} key={m._id}/>
            </div>
            )
          })
          }
        </div>
        <form className="centerbarInput" onSubmit={handleSubmit}>
          <textarea 
            className="centerbarText"
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
          <button className="centerbarBtn" type="submit" disabled={!convoId}><Send/></button>
        </form>
      </>
      }
    </div>
  )
}

export default Centerbar