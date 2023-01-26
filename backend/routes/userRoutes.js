const express = require('express');
const {loginUser, signupUser, getUser, getAllUsers} = require('../controllers/userController')

const router = express.Router()

//login router
router.post('/login', loginUser)

//signup router
router.post('/signup', signupUser)

//get user router
router.get('/:id', getUser)

router.get('/', getAllUsers)

module.exports = router