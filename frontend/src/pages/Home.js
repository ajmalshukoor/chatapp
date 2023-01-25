import React, {useRef, useState, useEffect} from 'react'
import {Search, Send} from '@material-ui/icons'
import { useId } from '../hooks/useId'
import { useMessageContext } from '../hooks/useMessageContext'
import {io} from 'socket.io-client'
import TopBar from '../components/bars/Topbar'
import Conversation from '../components/Conversation'
import Message from '../components/Message'
import Online from '../components/Online'
import './home.css'

const Home = () => {
  const sender = useId()
  const [conversations, setConversations] = useState([])
  const [text, setText] = useState()
  const {convoId} = useMessageContext()
  const [message, setMessage] = useState([])
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const scrollRef = useRef(null)
  const socket = useRef()
  const conversationId = convoId.id

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
  }, [message])

  useEffect(() => {
    arrivalMessage && convoId.members.includes(arrivalMessage.sender) &&setMessage((prev) => [...prev, arrivalMessage])
  }, [arrivalMessage])

  useEffect(() => {
    const getMessages = async () => {
      const msg = await fetch('/api/message/'+conversationId, {
        method: 'GET',
      })
      const json = await msg.json()
      setMessage(json)
    }
    getMessages()
  }, [conversationId])

  useEffect(() => {
    socket.current.emit("addUser", sender)
    socket.current.on("getUsers", users=>{
      // console.log(users)
    })

    const getConversations = async () => {
      try{
        const res = await fetch('/api/conversation/'+sender, { 
          method: 'GET'
        })
        const json = await res.json()
        setConversations(json)
      }catch(error){
        console.log(error)
      }
    }
    getConversations()
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
    
    const msg = await fetch('/api/message/'+conversationId, {
      method: 'GET',
    })
    const json = await msg.json()
    setMessage(json)
  }

  return (
    <>
    <TopBar/>
    <div className="home">
      <div className="leftbar">
          <div className="leftbarWrapper">
            <div className="leftbarSearch">
              <input type="text" className="leftbarSearchInput" placeholder="Find conversation"/>
              <Search className="leftbarSearchIcon"/>
            </div>
            {conversations?.map((c) => <Conversation conversation={c} sender={sender} key={c._id}/>)}
          </div>
      </div>
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
            <div ref={scrollRef}>
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
    <div className="rightbar">
        <h3 className="rightbarHeading">Users</h3>
        <div className="rightbarWrapper">
            <Online/>
            <Online/>
        </div>
    </div>
    </div>
    </>
  )
}

export default Home