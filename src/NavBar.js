import React from 'react'
import { Link } from 'react-router-dom'
import potential from './potential.png';

 const NavBar = () => {
     const navStyle = {backgroundColor: 'pink', opacity: '.6' } 
    return (
        <div className="navbar" style={navStyle}>
            <img src={potential} alt="Logo"/>
            
        </div>
    )
}

export default NavBar
