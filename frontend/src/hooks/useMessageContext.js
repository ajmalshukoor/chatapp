import {MessageContext} from '../context/MessageContext'
import { useContext } from 'react'

export const useMessageContext = () => {
    const context = useContext(MessageContext)

    if(!context){
        throw Error(`useAuthContext must be used inside an AuthContextProvider`)
    }

    return context
}