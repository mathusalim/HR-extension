import "./App.css";
import List from "./components/List";
import { useState, useEffect } from "react";
import Details from "./components/Details";

function App() {
  const [pageState, setPageState] = useState(1);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("hrExDraft")) || null);
  const [list, setList] = useState(
    JSON.parse(localStorage.getItem("hrExDb")) || { data: [] }
  );

  useEffect(() => {
    localStorage.setItem("hrExDb", JSON.stringify(list));
    setPageState(1);
  }, [list])

  useEffect(() => {
    if (user) {
      setPageState(2);
    }
  }, [user])

  const navigateToPage = (num) => { setPageState(num) }

  const handleEditClick = (user) => {
    setUser(user);
  };

  const handleBackClick = () => {
    setUser(null);
    setPageState(1)
  }

  const handleSaveClick = (user) => {
    const found = list.data.find((x) => x.url === user.url);
    if (found) {
      setList(prevList => ({
        ...prevList, data: [...list.data.map((x) => (x.url === user.url ? { ...user } : x))]
      })

      );
    } else {
      setList(prevList => ({ ...prevList, data: [...prevList.data, user] }));
    }
  };

  const handleDeleteClick = (user) => {
    const found = list.data.find((x) => x.url === user.url);
    if (found) {
      setList(prevList => ({
        ...prevList, data: [...list.data.filter((x) => (x.url !== user.url))]
      })

      );
    }
  };

  return (
    <div className="App">
      {pageState === 1 && <List users={list.data} addClick={() => navigateToPage(2)} onEdit={handleEditClick} onDelete={handleDeleteClick} />}
      {pageState === 2 && <Details user={user} saveClick={handleSaveClick} backClick={handleBackClick} />}
    </div>
  );
}

export default App;
