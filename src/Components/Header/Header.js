import React from 'react'
import './Header.css';
import { useNavigate } from 'react-router-dom';

const Header = ({ onPage }) => {

    const navigation = useNavigate();


    return (
        <div className='header' >
            <div className="logo" onClick={() => navigation('/')} >QEstate</div>

            {
                onPage === 'home' ? (
                    <span className="nav_Link" onClick={() => navigation('/listings')}>Explore</span>
                ) : 
                (   onPage === "details" ? (
                    <div>
                    <span className="nav_Link" onClick={() => navigation('/')}>Featured</span>
                    <span className="nav_Link" onClick={() => navigation('/listings')}>Explore</span>
                    </div>
                ) :
                    <span className="nav_Link" onClick={() => navigation('/')}>Featured Listing</span>
                )
            }

        </div>

    )
}

export default Header;