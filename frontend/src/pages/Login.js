import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { useLogin } from '../hooks/useLogin'
import './login.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isLoading} = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log(email,password)
    await login(email, password)
  }

  return (
    <div className="login">
        <div className="loginWrapper">
        <form className="loginBox" onSubmit={handleSubmit}>
            <h2 className="loginHead">Log In</h2>
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
            <button className="loginButton" type="submit" disabled={isLoading}>
                LogIn
            </button>
            <span className="loginForgot" disabled={isLoading}>Forgot Password?</span>
            <Link to="/signup" className="loginRegisterButton">
              <span disabled={isLoading}>
                  Create new account
              </span>
            </Link>
          </form>
        </div>
    </div>
  )
}

export default Login