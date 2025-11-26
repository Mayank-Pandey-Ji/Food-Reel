import React, { useRef, useState, useEffect } from 'react'
import '../../styles/create-food.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreateFood = () => {
  const fileRef = useRef(null)
  const [file, setFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const navigate = useNavigate();
  const onSubmit = async (e) => {            
    e.preventDefault()
    // handle form submission logic here
    const name = e.target.name.value;
    const description = e.target.description.value;
    const video = e.target.video.files[0];
    const formData = new FormData();
    formData.append('video', video);
    formData.append('name', name);
    formData.append('description', description);
    const response = await axios.post('http://localhost:3000/api/food', formData, {
      withCredentials: true
    })
    if(response.data.status === 401)
    {
      navigate('/food-partner/login', { replace: true });
    }
    console.log(response.data)
    navigate('/');
  }

  useEffect(() => {
    // revoke old preview when file changes/unmount
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  const onFileChange = (e) => {
    const f = e.target.files && e.target.files[0]
    if (!f) return
    // accept only video types
    if (!f.type.startsWith('video/')) {
      alert('Please select a video file')
      return
    }
    setFile(f)
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }
    const url = URL.createObjectURL(f)
    setPreviewUrl(url)
  }

  const clearFile = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setPreviewUrl(null)
    setFile(null)
    if (fileRef.current) fileRef.current.value = ''
  }

  return (
    <div className="create-food-container">
      <div className="create-card">
        <h3 style={{marginTop:0, marginBottom:12}}>Create food item</h3>

        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="video">Video</label>
            <div className="file-input-wrapper">
              <label className="file-input" htmlFor="video-input">
                {/* SVG camera / upload icon */}
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.2" opacity="0.9" />
                  <circle cx="12" cy="12" r="2.4" fill="currentColor" />
                  <path d="M8 6l1.5-2h5L16 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
                </svg>
                <div className="hint">Tap to choose a video</div>
                <input id="video-input" name='video' ref={fileRef} type="file" accept="video/*" onChange={onFileChange} />
              </label>

              {file && (
                <div style={{display:'flex',gap:8,alignItems:'center'}}>
                  <div style={{fontSize:13,color:'var(--color-muted)'}}>{file.name}</div>
                  <button type="button" className="btn btn-ghost" onClick={clearFile}>Remove</button>
                </div>
              )}
            </div>

            <div className="preview" aria-hidden={previewUrl ? 'false' : 'true'}>
              {previewUrl ? (
                <>
                  <video src={previewUrl} muted controls playsInline loop preload="metadata" />
                  <div className="filename">{file && file.name}</div>
                </>
              ) : (
                <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',color:'var(--color-muted)'}}>No preview</div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" placeholder="Tasty Burrito" />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" placeholder="Short description for this food item (max 2 lines visible in reels)" />
          </div>

          <div className="actions">
            <button type="button" className="btn btn-ghost">Cancel</button>
            <button type="submit" className="btn btn-primary">Create</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateFood
