import React, { useState } from 'react'
import { ChevronsLeft, ChevronsRight } from 'react-feather'
import ListFilter from './ListFilter'
import { ListStyles } from './list.styles'
import ListIO from './ListIO'
import Coffe from '../donation/Coffe'

const ListFilterForm = ({ filterList, updateImportedList, list }) => {
    const [showFilter, setShowFilter] = useState(false)
    return (
        <div style={ListStyles.filterTab(showFilter)}>
            {showFilter ? (
                <div style={ListStyles.FilterWrapper()}>
                    <button
                        title="hide filter menu"
                        style={ListStyles.filterHideButton()}
                        onClick={() => setShowFilter(false)}
                    >
                        <ChevronsLeft size={'1rem'} />
                    </button>
                    <ListFilter filterList={filterList} />
                    <ListIO
                        updateImportedList={updateImportedList}
                        list={list}
                    />
                    <Coffe />
                </div>
            ) : (
                <button
                    title="show filter menu"
                    style={ListStyles.filterShowButton()}
                    onClick={() => setShowFilter(true)}
                >
                    <ChevronsRight size={'1rem'} />
                </button>
            )}
        </div>
    )
}

export default ListFilterForm
