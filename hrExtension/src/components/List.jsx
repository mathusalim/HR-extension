import React from "react";
import { Plus, Edit3, Trash2, ExternalLink } from "react-feather";
import ListFilter from "./ListFilter";

const List = ({ addClick, onEdit, onDelete, users, filterList }) => {
  const handleLinkClick = (link) => {
    console.log(link);
    if (link) {
      chrome.tabs.create({ url: link });
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "start",
          gap: "2rem",
          marginBottom: "2rem",
        }}
      >
        <button style={{ marginBottom: "2rem" }} onClick={addClick}>
          <Plus size="1rem" className="btn-success" />
        </button>
        <ListFilter filterList={filterList} />
      </div>

      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>name</th>
            <th colSpan="2">Job Titles</th>
            <th>linkedIn</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((client, index) => (
            <tr key={"iHr" + index}>
              <td>{client.name}</td>
              <td colSpan="2">{client.tags?.toString()}</td>
              <td
                className="linkedinLink"
                style={{ cursor: "pointer" }}
                onClick={() => handleLinkClick(client.url)}
              >
                Linkedin
                <span>
                  <ExternalLink size="1rem" />
                </span>
              </td>
              <td
                style={{
                  display: "flex",
                  justifyContent: "end",
                  alignItems: "center",
                }}
              >
                <button
                  style={{ margin: "0.3rem" }}
                  onClick={() => onEdit(client)}
                >
                  <Edit3 size="1rem" className="btn-warning" />
                </button>
                <button onClick={() => onDelete(client)}>
                  <Trash2 size="1rem" className="btn-danger" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default List;
