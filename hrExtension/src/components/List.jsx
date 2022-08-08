import React from "react";
import { Plus, Edit3, Trash2, ExternalLink } from 'react-feather'

const List = ({ addClick, onEdit, onDelete, users }) => {

  const handleLinkClick = (link) => {
    console.log(link);
    if (link) {
      chrome.tabs.create({ url: link });
    }
  };

  if (users && users && users.length > 0) {
    return (
      <>
        <button style={{ marginBottom: '2rem' }} onClick={addClick}><Plus size='1rem' /></button>
        <table style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>name</th>
              <th>email</th>
              <th>position</th>
              <th>linkedIn</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((client, index) => (
              <tr key={"iHr" + index}>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.tags?.toString()}</td>
                <td
                  className="linkedinLink"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleLinkClick(client.url)}
                >
                  Linkedin<span><ExternalLink size='1rem' /></span>
                </td>
                <td>
                  <button style={{ margin: '0.3rem' }} onClick={() => onEdit(client)}><Edit3 size='1rem' /></button>
                </td>
                <td>
                  <button onClick={() => onDelete(client)}><Trash2 size='1rem' /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
  return (
    <>
      <button onClick={addClick}><Plus size='1rem' /></button>
      <h3 style={{ textAlign: "center" }}>No data</h3>
    </>
  );
};

export default List;
