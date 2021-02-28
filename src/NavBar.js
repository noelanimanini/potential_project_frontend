import React from 'react'
import potential from './potential.png';
import Menu from './Menu';
import {Link} from 'react-router-dom'

 const NavBar = () => {
    const navStyle = {backgroundColor: 'pink', opacity: '.6', display: 'flex', justifyContent: 'space-around'}
    const imageStyle = {display: 'flex', justifyContent: 'center', cursor: 'pointer'}
    const menuStyle = {position: 'relative', left: '80px'}


    return (
        <div className="navbar" style={navStyle}>
            <Link to="/home">
                <div style={imageStyle}> 
                    <img  src={potential} alt="Logo"/>
                </div>
            </Link>
                <div style={menuStyle}>
                    {<Menu/>}  
                </div>
        </div>
    )
}

export default NavBar

