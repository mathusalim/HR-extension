import React from 'react'
import { Plus } from 'react-feather'
import { ListStyles } from './list.styles'
import ListFilterForm from './ListFilterForm'
import ListTable from './ListTable'

const List = ({
    addClick,
    onEdit,
    onDelete,
    users,
    filterList,
    updateImportedList,
}) => {
    return (
        <>
            <div style={ListStyles.listContainer()}>
                <ListFilterForm
                    filterList={filterList}
                    updateImportedList={updateImportedList}
                    list={users}
                />
                <div style={ListStyles.listWrapper()}>
                    <div style={ListStyles.ListActionButtonWrapper()}>
                        <span style={ListStyles.addDisclaimer()}>
                            Go to Linkedin Profile you want to save and add new
                            entry
                        </span>
                        <button
                            style={ListStyles.listActionButton()}
                            onClick={addClick}
                            title="add"
                        >
                            <Plus size="1rem" className="btn-success" />
                        </button>
                    </div>
                    {users && users.length > 0 && (
                        <ListTable
                            users={users}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    )}
                </div>
            </div>
        </>
    )
}

export default List
