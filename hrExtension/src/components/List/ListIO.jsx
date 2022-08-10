import React, { useState, useEffect } from 'react'
import { Upload, Download } from 'react-feather'
import { ListStyles } from './list.styles'

const ListIO = ({ updateImportedList, list }) => {
    const [importData, setImportData] = useState(null)

    useEffect(() => {
        if (importData) {
            updateImportedList(importData)
        }
    }, [importData])

    const handleExportClick = () => {
        const dataStr =
            'data:text/json;charset=utf-8,' +
            encodeURIComponent(JSON.stringify(list))
        const downelement = document.getElementById('downloadJson')
        downelement.setAttribute('href', dataStr)
        downelement.setAttribute(
            'download',
            `${new Date().toLocaleDateString('en-US')}hrExportData.json`
        )
        downelement.click()
    }

    const handleImportClick = () => {
        const downelement = document.getElementById('importJson')
        downelement.click()
    }

    const onReaderLoad = (event) => {
        setImportData(JSON.parse(event.target.result))
    }

    const handleInputChange = (e) => {
        var reader = new FileReader()
        reader.onload = onReaderLoad
        reader.readAsText(e.target.files[0])
    }

    return (
        <div style={ListStyles.listIOWrapper()}>
            <button title="import" style={ListStyles.listIOButton()}>
                <span
                    style={ListStyles.listIOLabel()}
                    onClick={handleImportClick}
                >
                    Import
                </span>
                <Upload size="1.4em" />
            </button>
            <button title="export" style={ListStyles.listIOButton(false)}>
                <span
                    style={ListStyles.listIOLabel()}
                    onClick={handleExportClick}
                >
                    Export
                </span>
                <Download size="1.5em" />
            </button>
            <a id="downloadJson" style={ListStyles.listIOHidden()}></a>
            <input
                id="importJson"
                type="file"
                style={ListStyles.listIOHidden()}
                accept="application/JSON"
                onChange={handleInputChange}
            />
        </div>
    )
}

export default ListIO
