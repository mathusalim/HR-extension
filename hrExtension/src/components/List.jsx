import React from "react";
import { useState } from "react";

const List = ({ addClick }) => {
  const [list, setList] = useState(
    JSON.parse(localStorage.getItem("hrExDb")) || { data: [] }
  );

  const handleLinkClick = (link) => {
    console.log(link);
    if (link) {
      chrome.tabs.create({ url: link });
    }
  };

  if (list && list.data && list.data.length > 0) {
    return (
      <>
        <button onClick={addClick}>+</button>
        <table>
          <thead>
            <tr>
              <th>name</th>
              <th>email</th>
              <th>position</th>
              <th>linkedIn</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {list.data.map((client, index) => (
              <tr key={"iHr" + index}>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.tags?.toString()}</td>
                <td
                  style={{ cursor: "pointer" }}
                  onClick={() => handleLinkClick(client.url)}
                >
                  Linkedin
                </td>
                <td>
                  <button>edit</button>
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
      <button onClick={addClick}>+</button>
      <h3 style={{ textAlign: "center" }}>No data pleas add some</h3>
    </>
  );
};

export default List;
