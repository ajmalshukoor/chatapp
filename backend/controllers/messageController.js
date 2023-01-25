const Message = require('../models/messageModel')

const newMessage = async (req, res) => {
    console.log(req.body)
    const newMes = new Message(req.body)

    try{
        const savedMes = await newMes.save()
        res.status(200).json(savedMes)
    }
    catch(error){
        res.status(500).json(error)
    }
}

const getMessage = async (req, res) => {
    try {
        const messages = await Message.find({
          conversationId: req.params.conversationId,
        });
        res.status(200).json(messages);
      } catch (error) {
        res.status(500).json(error);
      }
}

module.exports = {newMessage, getMessage}