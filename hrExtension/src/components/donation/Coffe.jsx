import React from 'react'
import coffeeLink from '../../assets/coffee.png'

const Coffe = () => {
    const handleLinkClick = () => {
        chrome.tabs.create({ url: 'https://www.buymeacoffee.com/reget' })
    }

    return (
        <img
            src={coffeeLink}
            style={{ width: '100%', cursor: 'pointer' }}
            onClick={handleLinkClick}
        />
    )
}

export default Coffe
