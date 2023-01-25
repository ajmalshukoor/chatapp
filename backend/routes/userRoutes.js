const express = require('express');
const {loginUser, signupUser, getUser} = require('../controllers/userController')

const router = express.Router()

//login router
router.post('/login', loginUser)

//signup router
router.post('/signup', signupUser)

//get user router
router.get('/:id', getUser)

module.exports = router