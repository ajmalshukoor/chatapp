const express = require('express');
const {newConversation, getConversation} = require('../controllers/conversationController')

const router = express.Router()

router.post('/', newConversation)

router.get('/:userId', getConversation)

module.exports = router