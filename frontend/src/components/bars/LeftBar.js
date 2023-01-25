import React, { useEffect, useState } from 'react'
import {Search} from '@material-ui/icons'
import { useId } from '../../hooks/useId'
import './leftbar.css'
import Conversation from '../Conversation'

const Leftbar = () => {
  const currentUserId = useId()
  const [conversations, setConversations] = useState([])

  useEffect(() => {
    const getConversations = async () => {
      try{
        const res = await fetch('/api/conversation/'+currentUserId, { 
          method: 'GET'
        })
        const json = await res.json()
        setConversations(json)
      }catch(error){
        console.log(error)
      }
    }
    getConversations()
  }, [currentUserId])

  return (
    <div className="leftbar">
        <div className="leftbarWrapper">
          <div className="leftbarSearch">
            <input type="text" className="leftbarSearchInput" placeholder="Find conversation"/>
            <Search className="leftbarSearchIcon"/>
          </div>
          {conversations?.map((c) => <Conversation conversation={c} currentUserId={currentUserId} key={c._id}/>)}
        </div>
    </div>
  )
}

export default Leftbar