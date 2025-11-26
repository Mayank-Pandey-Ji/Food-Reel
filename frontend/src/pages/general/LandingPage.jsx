import React from 'react'
import '../../styles/landing.css'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div className="landing-container">
      <div className="landing-card">
        <div className="landing-hero">Welcome to Food Reel</div>
        <div className="landing-sub">Choose how you'd like to continue</div>

        <div className="landing-actions">
          <Link to="/user/register">
            <button className="landing-btn btn-user">I'm a User</button>
          </Link>

          <Link to="/food-partner/register">
            <button className="landing-btn btn-partner">I'm a Food Partner</button>
          </Link>
        </div>

        <div className="small-row">
          <Link to="/user/login" style={{textDecoration:'none',color:'var(--color-muted)'}}>User sign in</Link>
          <Link to="/food-partner/login" style={{textDecoration:'none',color:'var(--color-muted)'}}>Partner sign in</Link>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
