import React, { useEffect, useState } from 'react'
import { useMessageContext } from '../hooks/useMessageContext'
import './conversation.css'

const Conversation = ({conversation, sender}) => {
    const [user, setUser] = useState({})
    const {setConvoId} = useMessageContext()

    const handleClick = (e) => {
        e.preventDefault()
        setConvoId({
           id: conversation._id,
           username: user[0].email,
           recipientId: user[0]._id,
           members: conversation.members
        })
    }
    useEffect(() => {
        const friendId = conversation.members.find((m) => m !== sender)
        const getUser = async () => {
            try{
                const res = await fetch('/api/user/'+friendId, {
                    method: 'GET',
                })
                const json = await res.json()
                setUser(json)
            }
            catch(error){
                console.log(error)
            }
        }
        getUser()
    }, [conversation])

    return (
    <div className="conversation" onClick={handleClick}>
        <img src="https://i.picsum.photos/id/791/200/200.jpg?hmac=bPVayqOX5aUzsnsX99AgWaxWB3WzWqwaiSDJ-lNHUk4" className="convoImg"/>
        <span className="convoName">{user?.length > 0 && user[0].email}</span>
    </div>
    )
}

export default Conversation