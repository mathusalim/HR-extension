import React from "react";
import { useState } from "react";

const List = ({ addClick }) => {
  const [list, setList] = useState(JSON.parse(localStorage.getItem("hrExDb")));

  if (list && list.data) {
    return (
      <>
        <button>+</button>
        <table>
          <thead>
            <tr>
              <th>name</th>
              <th>email</th>
              <th>position</th>
              <th>linkedIn</th>
            </tr>
          </thead>
          <tbody>
            {list.data.map((client, index) => (
              <tr key={"iHr" + index}>
                <th>{client.name}</th>
                <th>{client.email}</th>
                <th>{client.tags.toString()}</th>
                <th>{client.url}</th>
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
