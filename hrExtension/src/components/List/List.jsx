import React from 'react'
import { Plus } from 'react-feather'
import { ListStyles } from './list.styles'
import ListFilterForm from './ListFilterForm'
import ListTable from './ListTable'

const List = ({ addClick, onEdit, onDelete, users, filterList }) => {
  return (
    <>
      <div style={ListStyles.listContainer()}>
        <ListFilterForm filterList={filterList} />
        <div style={ListStyles.listWrapper()}>
          {users && users.length > 0 && (
            <ListTable users={users} onEdit={onEdit} onDelete={onDelete} />
          )}
          <div style={ListStyles.ListActionButtonWrapper()}>
            <button
              style={ListStyles.listActionButton()}
              onClick={addClick}
              title="add"
            >
              <Plus size="1rem" className="btn-success" />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default List
