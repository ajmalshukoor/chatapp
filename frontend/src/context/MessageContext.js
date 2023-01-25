import { createContext, useState } from "react"

export const MessageContext = createContext()

export const MessageContextProvider = ({children}) => {
    const [convoId, setConvoId] = useState('')

    return(
        <MessageContext.Provider value={{convoId, setConvoId}}>
            {children}
        </MessageContext.Provider>
    )
}