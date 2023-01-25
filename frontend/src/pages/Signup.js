import React, {useState} from 'react'
import {useSignup} from "../hooks/useSignup"
import { Link } from 'react-router-dom'
import './signup.css'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log(email, password)
    await signup(email, password)
  }

  return (
    <div className="login">
        <div className="loginWrapper">
        <form className="loginBox" onSubmit={handleSubmit}>
            <h2 className="loginHead">Sign Up</h2>
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <input
              placeholder="Confirm password"
              type="password"
              required
              minLength="6"
              className="loginInput"
            />
            <button className="loginButton" type="submit" disabled={isLoading}>
                SignUp
            </button>
            <Link className="loginRegisterButton" to="/login">
              <span disabled={isLoading}>
                  Login
              </span>
            </Link>
          </form>
        </div>
    </div>
  )
}

export default Signup