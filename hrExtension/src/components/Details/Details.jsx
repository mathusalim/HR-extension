import React from 'react'
import { useState, useEffect } from 'react'
import { ArrowLeft, Save } from 'react-feather'
import { TagsInput } from 'react-tag-input-component'
import { DetailsStyles } from './details.styles'

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
              }
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
        <div style={DetailsStyles.detailsWrapper()}>
            <div style={DetailsStyles.detailsButtonWrapper()}>
                <button
                    title="back"
                    style={DetailsStyles.detailsButton()}
                    onClick={() => {
                        clearStorage()
                        backClick()
                    }}
                >
                    <ArrowLeft size="1rem" />
                </button>
                <div
                    style={DetailsStyles.disclaimerWrapper()}
                >
                    <span style={DetailsStyles.saveDisclaimer()}>
                        Link to active browser tab will be automatically saved
                    </span>
                    <button
                        title="save"
                        style={DetailsStyles.detailsButton()}
                        onClick={() => {
                            setUrl()
                        }}
                    >
                        <span>
                            <Save size="1rem" />
                        </span>
                    </button>
                </div>
            </div>
            <div style={DetailsStyles.formContainer()}>
                <div style={DetailsStyles.formGroupRow()}>
                    <div style={DetailsStyles.formGroup()}>
                        <label htmlFor="name">Name:</label>
                        <input
                            style={DetailsStyles.formInput()}
                            type="text"
                            name="name"
                            value={formUser.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div style={DetailsStyles.formGroup()}>
                        <label htmlFor="email">email:</label>
                        <input
                            style={DetailsStyles.formInput()}
                            type="text"
                            name="email"
                            value={formUser.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div style={DetailsStyles.formGroup()}>
                        <label htmlFor="phone">phone:</label>
                        <input
                            style={DetailsStyles.formInput()}
                            type="text"
                            name="phone"
                            value={formUser.phone}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div style={DetailsStyles.formGroupRow(false)}>
                    <div style={DetailsStyles.formGroup(true)}>
                        <label htmlFor="tags">professions:</label>
                        <TagsInput
                            className="rti--container"
                            value={formUser.tags}
                            onChange={handleTagChange}
                            name="tags"
                            placeHolder="enter Jobs and hit enter"
                        />
                    </div>
                    <div style={DetailsStyles.formGroup()}>
                        <label htmlFor="comment">comment:</label>
                        <textarea
                            style={DetailsStyles.formInput()}
                            name="comment"
                            rows="5"
                            value={formUser.comment}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Details
