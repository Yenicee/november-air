import "./styles.css"
import { Link } from 'react-router-dom';
import React, { useState } from "react";



const Header = () => {
   

    return (
        <header>
            <img src="/logo.png" alt="logo november" className="logo" />

            <label className="burger" htmlFor="burger">
                <input
                    type="checkbox"
                    className="side-menu"
                    id="burger"
                />
                <span></span>
                <span></span>
                <span></span>
            </label>

            <nav className="nav">
                <ul>
                    <li>
                        <Link to='/index'>Inicio</Link>
                    </li>
                    <li>
                        <Link to='/planning'>Planning</Link>
                    </li>
                    <li>
                        <Link to='/contact'>Contac</Link>
                    </li>
                </ul>
            </nav>
        </header>

    )

}


export default Header;