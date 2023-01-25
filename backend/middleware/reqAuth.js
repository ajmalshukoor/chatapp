const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {
    const {authorization} = req.headers
    if(!authorization){
        return res.status(401).json({error: 'Authorization token required'})
    }

    const token = authorization.split(' ')[1]

    try{
        const {_id} = jwt.verify(token, process.env.SECRET)

        //from jwt, _id is derived and find the user using that _id,
        // then select that id and pass on to the req.user to use later on (it can be req.any)
        req.user = await User.findOne({_id}).select('_id')
        next()
    }
    catch(error){
        console.log(error)
        res.status(401).json({error: 'Request is not authorized'})
    }
}

module.exports = requireAuth