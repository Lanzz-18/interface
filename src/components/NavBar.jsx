import React from 'react';

const NavBar = () => {
    return(
        <div className="Nav">
            <div id="logo">
                <a href="/">SiteLogo</a>
            </div>
            <div className="nav-links">
                <a href="#">Buy</a>
                <a href="#">Rent</a>
                <a href="#">Find Agent</a>
                <a href="#">House Prices</a>
            </div>
        </div>
    )
}

export default NavBar;