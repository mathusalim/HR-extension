import reactLogo from "./assets/react.svg";
import "./App.css";
import List from "./components/List";
import { useState } from "react";
import Details from "./components/Details";

function App() {
  const [pageState, setPageState] = useState(1);
  const [user, setUser] = useState(null);
  const handleAddClick = () => {
    setPageState(2);
  };

  const handleEditClick = (u) => {
    setUser(u);
    setPageState(2);
  };

  const handleSaveClick = () => {
    setUser(null);
    setPageState(1);
  };

  return (
    <div className="App">
      {pageState === 1 && <List addClick={handleAddClick} />}
      {pageState === 2 && <Details user={user} saveClick={handleSaveClick} />}
    </div>
  );
}

export default App;
