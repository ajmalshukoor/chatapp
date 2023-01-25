require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');
const conversationRoutes = require('./routes/conversationRoutes');

const app = express();
app.use(express.urlencoded({extended: false}))
app.use(express.json())
// app.use('/api/image/', express.static(path.join(__dirname, 'uploads')))
app.use('/api/user', userRoutes)
app.use('/api/conversation', conversationRoutes)
app.use('/api/message', messageRoutes)

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("connected to databse")
    app.listen(4000, () => {
        console.log('listening to port', process.env.PORT)
    })
})
.catch((error) => {
    console.log(error)
})

