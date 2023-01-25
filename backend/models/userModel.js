const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

//IN THIS METHOD
//1.Validate if the password and email fields are empty
//2.If email format is valid go to next otherwise throw an error
//3.If password format is valid go to next 
//4.If the user exist in the email using findOne({email}) throw an error
//5.Create user with hashed and salted password 
//6.Return the user

//static method for signup
userSchema.statics.signupStatic = async function(email, password) {

    //Validation
    if(!email || !password){
        throw new Error('All fields must be filled');
    }
    if(!validator.isEmail(email)){
        throw new Error('Email not valid')
    }
    if(!validator.isStrongPassword(password)){
        throw new Error('Password not strong enough')
    }

    const exists = await this.findOne({email})

    if(exists){
        throw Error('Email already in use')
    }

    //hashing
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({email, password: hash})

    return user
}

//IN THIS METHOD
//1.Validate if the email and password fields are empty
//2.Find user = findOne({email})
//3.If the user does not exist in the email throw error
//4.Compare the user entered password and the hashed password in the user account
//5.If it matches Go to next step otherwise throw an error
//6.Return the user

//static method for login
userSchema.statics.loginStatic = async function(email, password){

    if(!email || !password){
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({email}) 
    if(!user){
        throw Error('Incorrect email')
    }

    const match = await bcrypt.compare(password, user.password)
    if(!match){
        throw Error('Incorrect password')
    }

    return user
}

module.exports = mongoose.model('User', userSchema)
