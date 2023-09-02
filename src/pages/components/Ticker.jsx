import React, { useEffect } from 'react'
import './ticker.css'

const Ticker = () => {
    useEffect(() => {
        const widget = document.querySelector('#coinmarketcap-widget-marquee')
        const widgetContainer = document.querySelector('#widget-container')
       if(widget){
        widgetContainer.appendChild(widget)
       }
       

    }, [])

    return (
        <div id="widget-container">
        </div>
    )
}

export default Ticker