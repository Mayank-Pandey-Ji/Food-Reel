import axios from 'axios';
import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
const UserRegister = () => {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const fullName = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        const response = await axios.post('https://food-reel-qefk.onrender.com/api/auth/user/register',{
            fullName: fullName,
            email: email,
            password: password
        } , 
        {
            withCredentials: true
        })
        console.log(response.data);
        navigate('/');
    }

  return (
    <div className="page-container">
      <div className="card">
        <h2>Create your account</h2>
        <p className="lead">Register as a user to explore food options nearby.</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full name</label>
            <input id="name" name="name" placeholder="Jane Doe" />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="you@example.com" />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" placeholder="Create a password" />
          </div>

          <div className="actions">
            <button type="submit" className="btn btn-primary">Create account</button>
            <button type="button" className="btn btn-ghost">Cancel</button>
          </div>
        </form>

        <div className="small" style={{marginTop:12}}>
          Already have an account? <Link to="/user/login">Sign in</Link>
          {' '}·{' '}
          <Link to="/food-partner/login">Partner sign in</Link>
        </div>
      </div>
    </div>
  )
}

export default UserRegister
