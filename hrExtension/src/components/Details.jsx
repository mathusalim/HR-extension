import React from "react";
import { useState } from "react";

const Details = ({ user, saveClick }) => {
  const [formUser, setFormUser] = useState(() =>
    user
      ? {
          name: user.name,
          email: user.email,
          phone: user.phone,
          tags: user.tags,
          url: user.url,
          comment: user.comment,
        }
      : { name: "", email: "", phone: "", tags: [], url: "", comment: "" }
  );

  const [list, setList] = useState(JSON.parse(localStorage.getItem("hrExDb")));

  const handleAdd = () => {
    const found = list.data.find((x) => x.url === formUser.url);
    if (found) {
      setList(
        list.data.map((x) => (x.url === formUser.url ? { ...formUser } : x))
      );
    } else {
      list.data.push(formUser);
      setList(list);
    }

    localStorage.setItem("hrExDb", JSON.stringify(list));
  };

  const handleInputChange = (e) => {
    const target = e.target;
    setFormUser((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formUser.name}
          onChange={handleInputChange}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label>email:</label>
        <input
          type="text"
          name="email"
          value={formUser.email}
          onChange={handleInputChange}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label>phone:</label>
        <input
          type="text"
          name="phone"
          value={formUser.phone}
          onChange={handleInputChange}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label>professions:</label>
        <input
          type="text"
          name="tags"
          value={formUser.tags.toString()}
          onChange={handleInputChange}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label>comment:</label>
        <input
          type="textarea"
          name="comment"
          value={formUser.comment}
          onChange={handleInputChange}
        />
      </div>
      <button
        onClick={() => {
          handleAdd();
          saveClick();
        }}
      >
        Save
      </button>
    </div>
  );
};

export default Details;
