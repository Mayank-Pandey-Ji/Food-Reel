import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PartnerRegister = () => {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.business.value;
        const email = e.target.contact.value;
        const password = e.target.password.value;
        const response = await axios.post('http://localhost:3000/api/auth/food-partner/register',{
            name: name,
            email: email,
            password: password
        }, 
        {
            withCredentials: true
        })
        console.log(response.data);
        navigate('/create-food');
    }   

  return (
    <div className="page-container">
      <div className="card">
        <h2>Partner account</h2>
        <p className="lead">Register as a food partner to manage your listings.</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="business">Business name</label>
            <input id="business" name="business" placeholder="Tasty Bites" />
          </div>

          <div className="form-group">
            <label htmlFor="contact">Contact email</label>
            <input id="contact" name="contact" type="email" placeholder="owner@business.com" />
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
          Already have an account? <Link to="/food-partner/login">Sign in</Link>
          {' '}·{' '}
          <Link to="/user/login">User sign in</Link>
        </div>
      </div>
    </div>
  )
}

export default PartnerRegister
