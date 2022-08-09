import React, { useState } from "react";
import { Filter, Delete } from "react-feather";
import { TagsInput } from "react-tag-input-component";
import { ListStyles } from "./list.styles";

const ListFilter = ({ filterList }) => {
  const [filter, setFilter] = useState({ name: "", tags: [] });

  const handleNameChange = (e) => {
    const target = e.target;
    setFilter((prev) => ({
      ...prev,
      name: target.value,
    }));
  };

  const handleTagChange = (newTags) => {
    setFilter((prev) => ({
      ...prev,
      tags: newTags,
    }));
  };

  return (
    <div style={ListStyles.listFormWrapper()}>
      <label htmlFor="name">Name:</label>
      <input
        style={ListStyles.listFormInput()}
        type="text"
        name="name"
        value={filter.name}
        onChange={handleNameChange}
      />
      <label htmlFor="email">Professions:</label>
      <TagsInput
        className="rti--container"
        value={filter.tags}
        onChange={handleTagChange}
        name="tags"
        placeHolder="enter Jobs and hit enter"
      />
      <div style={ListStyles.listFormButtonWrapper()}>
        <button
          style={ListStyles.listFormButton(false)}
          title="clear"
          onClick={() => {
            filterList(filter);
          }}
        >
          <Delete size="1em" />
        </button>
        <button
          style={ListStyles.listFormButton(true)}
          title="filter"
          onClick={() => {
            filterList(filter);
          }}
        >
          <Filter size="1em" />
        </button>
      </div>
    </div>
  );
};

export default ListFilter;
