import React from "react";
import { useEffect } from "react";
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
          status: "",
        }
      : {
          name: "",
          email: "",
          phone: "",
          tags: [],
          url: "",
          comment: "",
          status: "",
        }
  );

  const [list, setList] = useState(
    JSON.parse(localStorage.getItem("hrExDb")) || { data: [] }
  );

  useEffect(() => {
    if (formUser.status === "saved") {
      saveClick();
    }
    if (formUser.url) {
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
      setFormUser((prev) => ({ ...prev, status: "saved" }));
    }
  }, [formUser]);

  const setUrl = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      console.log(tabs[0].url);
      setFormUser((user) => ({ ...user, url: tabs[0].url.toString() }));
    });
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
          cols="3"
          value={formUser.comment}
          onChange={handleInputChange}
        />
      </div>
      <button
        style={{ marginTop: "10px" }}
        onClick={() => {
          setUrl();
        }}
      >
        Save
      </button>
    </div>
  );
};

export default Details;
