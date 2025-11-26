import React, { useEffect, useState } from 'react'
import '../../styles/profile.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const Profile = () => {
  const { id } = useParams()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [videos , setVideos] = useState([])

  useEffect(() => {
    let cancelled = false

    const fetchProfile = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`http://localhost:3000/api/food-partner/${id}`, {
          withCredentials: true,
        })
        console.log('API response:', response)               // log full response for debugging
        const partner = response.data?.foodPartner ?? response.data
        if (!cancelled) 
        {
            setProfile(partner);
            setVideos(partner.foodItems || []);
        }
      } catch (err) {
        console.error('Error fetching profile data:', err.response?.data || err.message || err)
        if (!cancelled) setError(err.response?.data || err.message || 'Failed to fetch')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    if (id) fetchProfile()
    else setLoading(false)

    return () => { cancelled = true }
  }, [id])

  // safe logging of updated profile
  useEffect(() => {
    if (profile) console.log('profile updated:', profile)
  }, [profile])

  if (loading) return <div className="profile-container">Loading...</div>
  if (error) return <div className="profile-container">Error: {JSON.stringify(error)}</div>
  if (!profile) return <div className="profile-container">No profile found.</div>

  return (
    <div className="profile-container">
      <div className="profile-top">
        <div className="avatar" aria-hidden="true" />
        <div className="profile-pills">
          <div className="pill">{profile.name}</div> {/* safe now because we return early if no profile */}
        </div>
      </div>

      <div className="profile-stats">
        <div className="stat">
          <div className="label small">total meals</div>
          <div className="value">{profile.totalMeals ?? '-'}</div>
        </div>

        <div className="stat">
          <div className="label small">customer serve</div>
          <div className="value">{profile.customerServe ?? '-'}</div>
        </div>
      </div>

      <div className="divider" />
      <div className="video-grid">
        {videos.map((v) => (
          <div key={v._id} className="video-tile">
            {/* video fills the tile via CSS */}
            <video src={v.video} muted playsInline loop preload="metadata" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Profile
