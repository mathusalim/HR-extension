import React from 'react'
import { useState, useEffect } from 'react'
import { ArrowLeft, Save } from 'react-feather'
import { TagsInput } from 'react-tag-input-component'

const Details = ({ user, saveClick, backClick }) => {
  const [formUser, setFormUser] = useState(
    user
      ? {
          name: user.name,
          email: user.email,
          phone: user.phone,
          tags: user.tags,
          url: user.url,
          comment: user.comment,
          save: null,
        }
      : {
          name: '',
          email: '',
          phone: '',
          tags: [],
          url: '',
          comment: '',
          save: null,
        },
  )

  useEffect(() => {
    if (formUser.save) {
      clearStorage()
      saveClick({ ...formUser, save: null })
    } else {
      localStorage.setItem('hrExDraft', JSON.stringify(formUser))
    }
  }, [formUser])

  const clearStorage = () => {
    localStorage.removeItem('hrExDraft')
  }

  const setUrl = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      setFormUser((prevUser) => ({
        ...prevUser,
        url: prevUser.url ? prevUser.url : tabs[0].url.toString(),
        save: true,
      }))
    })
  }

  const handleInputChange = (e) => {
    const target = e.target
    setFormUser((prev) => ({
      ...prev,
      [target.name]: target.value,
    }))
  }

  const handleTagChange = (newTags) => {
    setFormUser((prev) => ({
      ...prev,
      tags: newTags,
    }))
  }

  return (
    <div style={{ padding: '1rem' }}>
      <button
        title="back"
        style={{ marginBottom: '2rem' }}
        onClick={() => {
          clearStorage()
          backClick()
        }}
      >
        <ArrowLeft size="1rem" />
      </button>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          width: '100%',
          backgroundColor: '#03c4a1',
          color: '#242424',
          padding: '1rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'start',
            gap: '2rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              alignItems: 'start',
              flex: '1',
            }}
          >
            <label htmlFor="name">Name:</label>
            <input
              style={{ width: '100%' }}
              type="text"
              name="name"
              value={formUser.name}
              onChange={handleInputChange}
            />
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              alignItems: 'start',
              flex: '1',
            }}
          >
            <label htmlFor="email">email:</label>
            <input
              style={{ width: '100%' }}
              type="text"
              name="email"
              value={formUser.email}
              onChange={handleInputChange}
            />
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              alignItems: 'start',
              flex: '1',
            }}
          >
            <label htmlFor="phone">phone:</label>
            <input
              style={{ width: '100%' }}
              type="text"
              name="phone"
              value={formUser.phone}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            alignItems: 'start',
            width: '100%',
            justifyContent: 'start',
            gap: '2rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              flex: '1',
              alignItems: 'stretch',
            }}
          >
            <label htmlFor="tags">professions:</label>
            <TagsInput
              className="rti--container"
              value={formUser.tags}
              onChange={handleTagChange}
              name="tags"
              placeHolder="enter Jobs and hit enter"
            />
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              flex: '1',
              alignItems: 'start',
            }}
          >
            <label htmlFor="comment">comment:</label>
            <textarea
              style={{ width: '100%' }}
              name="comment"
              rows="5"
              value={formUser.comment}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
      <button
        title="save"
        style={{
          marginTop: '2rem',
          cursor: 'pointer',
          alignSelf: 'start',
        }}
        onClick={() => {
          setUrl()
        }}
      >
        <span>
          <Save size="1rem" className="btn-success" />
        </span>
      </button>
    </div>
  )
}

export default Details
