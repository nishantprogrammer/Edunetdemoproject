import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaLeaf } from 'react-icons/fa';

const Navbar = () => {
    return (
        <nav className="navbar">
            <NavLink to="/" className="nav-brand">
                <FaLeaf /> EcoDrive
            </NavLink>
            <div className="nav-links">
                <NavLink
                    to="/"
                    className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                >
                    Calculator
                </NavLink>
                <NavLink
                    to="/dashboard"
                    className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                >
                    Dashboard
                </NavLink>
                <NavLink
                    to="/compare"
                    className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                >
                    Compare
                </NavLink>
            </div>
        </nav>
    );
};

export default Navbar;
