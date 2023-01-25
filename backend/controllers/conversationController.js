const Conversation = require('../models/conversationModel')

const newConversation = async (req, res) => {
    const {senderId, recipientId} = req.body

    try{
        const newConvo = new Conversation({
            members: [senderId, recipientId],
        })
        const savedConvo = await newConvo.save()
        res.status(200).json(savedConvo)
    }
    catch(error){
        res.status(500).json(error)
    }
}

const getConversation = async (req, res) => {
    try{
        const convo = await Conversation.find({
            members: {$in: [req.params.userId]}
        })
        res.status(200).json(convo)
    }
    catch(error){
        res.status(500).json(error)
    }
}

module.exports = {newConversation, getConversation}