import React from "react";
import { ListStyles } from "./list.styles";
import { Edit3, Trash2, ExternalLink } from 'react-feather'

const ListTable = ({ users, onDelete, onEdit }) => {

    const handleLinkClick = (link) => {
        if (link) {
            chrome.tabs.create({ url: link });
        }
    };

    return (
        <div style={ListStyles.listTable()}>
            {users?.map((client, index) => (
                <div key={"iHr" + index} style={ListStyles.listTableItem()}>

                    <p style={ListStyles.tableListItemImportant()}>{client.name}</p>
                    <p style={ListStyles.tableListItemImportant()}>{client.tags?.toString()}</p>
                    <p
                        style={ListStyles.linkedinLink()}
                        onClick={() => handleLinkClick(client.url)}
                    >
                        Linkedin
                        <span>
                            <ExternalLink size="1rem" />
                        </span>
                    </p>
                    <button
                        style={ListStyles.listActionButton()}
                        onClick={() => onEdit(client)}
                    >
                        <Edit3 size="1rem" />
                    </button>
                    <button
                        style={ListStyles.listActionButton(false)} onClick={() => onDelete(client)}>
                        <Trash2 size="1rem" />
                    </button>
                </div>
            ))
            }

        </div >
    );
};

export default ListTable;
