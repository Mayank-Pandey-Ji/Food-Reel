import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
const UserLogin = () => {
const navigate = useNavigate();

const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const response = await axios.post('http://localhost:3000/api/auth/user/login',{
        email: email,
        password: password
    }, 
    {
        withCredentials: true
    })
    console.log(response.data);
    navigate('/getfoods');
  }

  return (
    <div className="page-container">
      <div className="card">
        <h2>Welcome back</h2>
        <p className="lead">Sign in to your user account.</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="you@example.com" />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" placeholder="Your password" />
          </div>

          <div className="actions">
            <button type="submit" className="btn btn-primary">Sign in</button>
            <button type="button" className="btn btn-ghost">Forgot?</button>
          </div>
        </form>

        <div className="small" style={{marginTop:12}}>
          Don't have an account? <Link to="/user/register">Register as normal user</Link>
          {' '}·{' '}
          <Link to="/food-partner/register">Register as food partner</Link>
        </div>
      </div>
    </div>
  )
}

export default UserLogin
