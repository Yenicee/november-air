import "./styles.css"
import { Link } from 'react-router-dom';
import React, { useState } from "react";
import SelectButton from "../components/selectButton";


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
                        <Link to='/from'>Home</Link>
                    </li>
                    <li>
                        <Link to='/home'>Planning</Link>
                    </li>
                </ul>
            </nav>
            <div className="airplane">
                <SelectButton />
            </div>
            <div>
                <h1>DEPARTURE AIRPORT</h1>
            </div>
        </header>

    )

}


export default Header;