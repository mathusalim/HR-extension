import React from "react";
import { useState, useEffect } from "react";
import { ArrowLeft, Save } from 'react-feather'

const Details = ({ user, saveClick, backClick }) => {
  const [formUser, setFormUser] = useState(user
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
      name: "",
      email: "",
      phone: "",
      tags: [],
      url: "",
      comment: "",
      save: null,
    });


  useEffect(() => {
    if (formUser.save) {
      clearStorage();
      saveClick({ ...formUser, save: null });
    }
    else {
      localStorage.setItem('hrExDraft', JSON.stringify(formUser))
    }
  }, [formUser])

  const clearStorage = () => {

    localStorage.removeItem('hrExDraft');
  }




  const setUrl = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      setFormUser((prevUser) => ({ ...prevUser, url: prevUser.url ? prevUser.url : tabs[0].url.toString(), save: true }));
    });
  };

  //TEMPORARY CODE
  const setMockedUrl = () => {
    setFormUser((prevUser) => ({ ...prevUser, url: prevUser.url ? prevUser.url : "mocked URL" }));
    localStorage.removeItem('hrExDraft');
    saveClick(formUser);

  }

  const handleInputChange = (e) => {
    const target = e.target;
    setFormUser((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  return (
    <>
      <button style={{ marginBottom: '2rem' }} onClick={() => { clearStorage(); backClick() }}><ArrowLeft size='1rem' /></button>
      <div style={{ display: "flex", flexDirection: "column", gap: '1rem', width: '100%' }}>
        {formUser &&
          <>
            <div style={{ display: "flex", flexDirection: "column", gap: '0.5rem', alignItems: "start" }}>
              <label htmlFor="name">Name:</label>
              <input
                style={{ width: '100%' }}
                type="text"
                name="name"
                value={formUser.name}
                onChange={handleInputChange}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: '0.5rem', alignItems: "start" }}>
              <label htmlFor="email">email:</label>
              <input
                style={{ width: '100%' }}
                type="text"
                name="email"
                value={formUser.email}
                onChange={handleInputChange}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: '0.5rem', alignItems: "start" }}>
              <label htmlFor="phone">phone:</label>
              <input
                style={{ width: '100%' }}
                type="text"
                name="phone"
                value={formUser.phone}
                onChange={handleInputChange}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: '0.5rem', alignItems: "start" }}>
              <label htmlFor="tags">professions:</label>
              <input
                style={{ width: '100%' }}
                type="text"
                name="tags"
                value={formUser.tags?.toString()}
                onChange={handleInputChange}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: '0.5rem', alignItems: "start" }}>
              <label htmlFor="comment">comment:</label>
              <input
                style={{ width: '100%' }}
                type="textarea"
                name="comment"
                cols="3"
                value={formUser.comment}
                onChange={handleInputChange}
              />
            </div>
            <button
              style={{ marginTop: "3rem", width: "100%", cursor: 'pointer' }}
              onClick={() => {
                setUrl();
              }}
            >
              <span><Save size='2rem' className="btn-success" /></span>
            </button>
          </>
        }
      </div>
    </>
  );
};

export default Details;
