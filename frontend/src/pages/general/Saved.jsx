import React, { useEffect } from 'react'
import '../../styles/profile.css'
import '../../styles/reels.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Saved = () => {
  const [videos, setVideos] = React.useState([]);
  useEffect(() => {   
      const fetchSaved = async () => {
          try {
              const response = await axios.get('http://localhost:3000/api/food/save', {
                  withCredentials: true
              });
              console.log('Saved items response:', response);
              setVideos(response.data.savedItems || []);
          }
          catch (error) {
              console.error('Error fetching saved items:', error);
          }
      };
      fetchSaved();
  }, []);

  if (!videos || videos.length === 0) {
    return (
      <div style={{padding:18}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div>
            <h3 style={{margin:0}}>Saved</h3>
            <p style={{color:'var(--color-muted)', margin:0}}>Your saved reels and items.</p>
          </div>
          <div>
            <Link to="/home" className="btn btn-ghost" aria-label="Go home">Home</Link>
          </div>
        </div>
        <div style={{height:12}} />
        <div style={{color:'var(--color-muted)'}}>No saved items yet.</div>
      </div>
    )
  }

  return (
    <div className="reels-container">
      {videos.map(s => {
        const item = s.food || s
        const key = s._id || s.id || item._id || item.id
        return (
          <section className="reel-item" key={key}>
            <div className="frame">
              <video
                className="reel-video"
                src={item.video}
                muted
                playsInline
                loop
                preload="metadata"
              />

              <div className="reel-overlay">
                <p className="reel-desc">{item.description}</p>
                <Link className="reel-visit" to={`/food-partner/${item.foodPartner || item.partnerId || ''}`}>Visit store</Link>
              </div>

              {/* action buttons removed for Saved view */}
            </div>
          </section>
        )
      })}

      <nav className="bottom-nav" aria-hidden>
        <Link to="/home">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 11.5L12 4l9 7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 22V12h14v10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span>home</span>
        </Link>

        <Link to="/saved">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 2h12v18l-6-3-6 3V2z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span>saved</span>
        </Link>
      </nav>
    </div>
  )
}

export default Saved
