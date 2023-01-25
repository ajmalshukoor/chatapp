const express = require('express');
const {newMessage, getMessage} = require('../controllers/messageController')

const router = express.Router()

router.post('/', newMessage)

router.get('/:conversationId', getMessage)

module.exports = router