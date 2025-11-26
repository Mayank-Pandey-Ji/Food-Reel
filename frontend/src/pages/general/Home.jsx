import React, { useEffect, useState } from 'react'
import '../../styles/reels.css'
import axios from 'axios'
import { useNavigate , Link} from 'react-router-dom'

const Home = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  // fetch food items (videos) from backend
  useEffect(() => {
    let cancelled = false

    async function fetchVideos() {
      try {
        setLoading(true)
        const res = await axios.get('http://localhost:3000/api/food' , {withCredentials: true})
        
        // response shape based on your example: { message, foodItems: [ ... ] }
        const foodItems = Array.isArray(res.data?.foodItems) ? res.data.foodItems : []
        if (!cancelled) setItems(foodItems)
      } catch (err) {
        if (err.response?.status === 401) {
        // navigate to login
        navigate('/user/login', { replace: true });
        return;
      }
        console.error('Failed to fetch food items', err)
        if (!cancelled) setError(err)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchVideos()
    return () => { cancelled = true }
  }, [])

  // intersection observer logic runs when items change (after render)
  useEffect(() => {
    if (!items || items.length === 0) return

    const videos = Array.from(document.querySelectorAll('.reel-video'))

    // timers map to delay play slightly after video becomes visible
    const playTimers = new Map()

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const v = entry.target
        const isVisible = entry.isIntersecting && entry.intersectionRatio > 0.6

        // clear any pending timer for this video
        const existing = playTimers.get(v)
        if (existing) {
          clearTimeout(existing)
          playTimers.delete(v)
        }

        if (isVisible) {
          // delay play a touch to allow snap/scroll to finish
          const t = setTimeout(() => {
            // pause other videos first for a single-playing experience
            videos.forEach(other => {
              if (other !== v) {
                try { other.pause() } catch { /* ignore */ }
              }
            })
            v.play().catch(() => {})
            playTimers.delete(v)
          }, 120)
          playTimers.set(v, t)
        } else {
          try { v.pause() } catch { /* ignore pause errors */ }
        }
      })
    }, { threshold: [0.25, 0.6, 0.9] })

    videos.forEach(v => obs.observe(v))

    // play the first visible video immediately (with same small delay)
    const first = videos.find(v => !v.paused)
    if (!first && videos[0]) {
      const t = setTimeout(() => videos[0].play().catch(() => {}), 120)
      playTimers.set(videos[0], t)
    }

    return () => {
      obs.disconnect()
      playTimers.forEach(t => clearTimeout(t))
      playTimers.clear()
    }
  }, [items]) // re-run when items update

  if (loading) return <div className="reels-container">Loading reels...</div>
  if (error) return <div className="reels-container">Error loading reels.</div>
  if (!items || items.length === 0) return <div className="reels-container">No reels to show.</div>


  async function handleLike(item) {
    const response = await axios.post("http://localhost:3000/api/food/like", {foodId : item._id}, { withCredentials: true });
    if(response.data.like)
    {
      console.log("video Liked");
      setItems(prevItems => prevItems.map(i => i._id === item._id ? { ...i, likeCount: (i.likeCount ?? 0) + 1 } : i));
    }
    else 
    {
      console.log("Like removed");
      setItems(prevItems => prevItems.map(i => i._id === item._id ? { ...i, likeCount: Math.max((i.likeCount ?? 1) - 1, 0) } : i));
    }
  }

  async function handleSave(item) {
    // Implement save functionality here
    const response = await axios.post("http://localhost:3000/api/food/save", {foodId : item._id}, { withCredentials: true });
    if(response.data.save) {
      console.log("video Saved");
      setItems(prevItems => prevItems.map(i => i._id === item._id ? { ...i, saveCount: (i.saveCount ?? 0) + 1 } : i));
    }
    else 
    {
      console.log("Save removed");
      setItems(prevItems => prevItems.map(i => i._id === item._id ? { ...i, saveCount: Math.max((i.saveCount ?? 1) - 1, 0) } : i));
    }
  }


  return (
    <div className="reels-container">
      {items.map(item => (
        <section className="reel-item" key={item._id}>
          <div className="frame">
            <video
              className="reel-video"
              src={item.video}            // using API's `video` field
              muted
              playsInline
              loop
              preload="metadata"
              controls={false}
            />

            <div className="reel-overlay">
              <p className="reel-desc">{item.description}</p>
              {/* if `foodPartner` or store url available, replace href */}
              <Link className="reel-visit" to={`/food-partner/${item.foodPartner}`} >Visit store</Link>
            </div>

            <div className="action-bar" aria-hidden>
              <button className="action-btn" type="button" onClick={()=> handleLike(item)}  aria-label="Like">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 21s-7.5-4.35-10-7.2C-0.2 9.5 3 5 6.5 6.5 8.2 7.2 9.1 9 12 11c2.9-2 3.8-3.8 5.5-4.5C21 5 24.2 9.5 22 13.8 19.5 16.85 12 21 12 21z" stroke="currentColor" strokeWidth="1.2"/></svg>
                <div className="action-count">{item.likeCount ?? 0}</div>
              </button>

              <button className="action-btn" onClick={() => handleSave(item)} type="button" aria-label="Save">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 2h12v18l-6-3-6 3V2z" stroke="currentColor" strokeWidth="1.2"/></svg>
                <div className="action-count">{item.saveCount ?? 0}</div>
              </button>

              <button className="action-btn" type="button" aria-label="Comment">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" stroke="currentColor" strokeWidth="1.2"/></svg>
                <div className="action-count">{item.comments ?? 0}</div>
              </button>
            </div>
          </div>
        </section>
      ))}

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

export default Home
