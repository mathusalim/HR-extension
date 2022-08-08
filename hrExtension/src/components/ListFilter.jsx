import React, { useState } from 'react'
import { Filter } from 'react-feather'
import { TagsInput } from "react-tag-input-component";

const ListFilter = ({ filterList }) => {
    const [filter, setFilter] = useState({ name: '', tags: [] })


    const handleNameChange = (e) => {
        const target = e.target;
        setFilter((prev) => ({
            ...prev,
            name: target.value,
        }));
    }

    const handleTagChange = newTags => {
        setFilter((prev) => ({
            ...prev,
            tags: newTags,
        }));
    }

    return (
        <div style={{
            display: "flex", gap: '0.5rem', width: "100%", justifyContent: 'space-between', alignItems: "start", padding: "1rem 1rem", border: "1px solid #03c4a1",
            borderRadius: "12px"
        }}>
            <div style={{ display: "flex", flexDirection: "column", gap: '0.5rem', alignItems: "start" }}>
                <label htmlFor="name">Name:</label>
                <input
                    style={{ width: '100%' }}
                    type="text"
                    name="name"
                    value={filter.name}
                    onChange={handleNameChange}
                />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: '0.5rem', alignItems: "start" }}>
                <label htmlFor="email">Professions:</label>
                <TagsInput
                    className='rti--container'
                    value={filter.tags}
                    onChange={handleTagChange}
                    name="tags"
                    placeHolder="enter Jobs and hit enter"
                />
            </div>
            <button
                style={{ alignSelf: 'start' }}
                title="save"
                onClick={() => {
                    filterList(filter);
                }}
            >
                <span><Filter size='1rem' className="btn-success" /></span>
            </button>
        </div >
    )
}

export default ListFilter