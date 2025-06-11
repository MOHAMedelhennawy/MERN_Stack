import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return ( 
        <nav>
            <ul>
                <li>
                    <NavLink style={(isActive) => ({ color: isActive ? 'red' : 'black'})}to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="about">About</NavLink>
                </li>
                <li>
                    <NavLink to="dashboard">Dashboard</NavLink>
                </li>
            </ul>
        </nav>
    );
}
 
export default Navbar;