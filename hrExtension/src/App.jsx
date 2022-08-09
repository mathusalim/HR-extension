import './App.css'
import List from './components/List/List'
import { useState, useEffect } from 'react'
import { AppStyles } from './components/app.styles'
import Details from './components/Details/Details'

function App() {
  const [pageState, setPageState] = useState(1)
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('hrExDraft')) || null,
  )
  const [list, setList] = useState(
    JSON.parse(localStorage.getItem('hrExDb')) || { data: [] },
  )
  const [filteredList, setFilteredList] = useState([])

  useEffect(() => {
    localStorage.setItem('hrExDb', JSON.stringify(list))
    setFilteredList(list.data)
    if (pageState === 2) setPageState(1)
  }, [list])

  useEffect(() => {
    if (user) {
      setPageState(2)
    }
  }, [user])

  const navigateToPage = (num) => {
    setPageState(num)
  }

  const handleEditClick = (user) => {
    setUser(user)
  }

  const handleBackClick = () => {
    setUser(null)
    setPageState(1)
  }

  const handleSaveClick = (user) => {
    const found = list.data.find((x) => x.url === user.url)
    if (found) {
      setList((prevList) => ({
        ...prevList,
        data: [...list.data.map((x) => (x.url === user.url ? { ...user } : x))],
      }))
    } else {
      setList((prevList) => ({
        ...prevList,
        data: [...prevList.data, user],
      }))
    }
  }

  const handleDeleteClick = (user) => {
    const found = list.data.find((x) => x.url === user.url)
    if (found) {
      setList((prevList) => ({
        ...prevList,
        data: [...list.data.filter((x) => x.url !== user.url)],
      }))
    }
  }

  const handleFilter = ({ name, tags }) => {
    let tempListData = JSON.parse(localStorage.getItem('hrExDb')).data || []
    if (name) {
      tempListData = tempListData.filter((listItem) =>
        listItem.name.toLowerCase().includes(name.toLowerCase()),
      )
    }
    if (tags && tags.length > 0) {
      tempListData = tempListData.filter((listItem) =>
        tags.some((tagName) =>
          listItem.tags
            .toString()
            .toLowerCase()
            .includes(tagName.toLowerCase()),
        ),
      )
    }
    setFilteredList([...tempListData])
  }

  return (
    <div style={AppStyles.app()}>
      {pageState === 1 && (
        <List
          users={filteredList}
          addClick={() => navigateToPage(2)}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          filterList={handleFilter}
        />
      )}
      {pageState === 2 && (
        <Details
          user={user}
          saveClick={handleSaveClick}
          backClick={handleBackClick}
        />
      )}
    </div>
  )
}

export default App
