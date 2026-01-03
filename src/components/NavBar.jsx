import React from 'react';

const NavBar = () => {
    return(
        <div className="Nav">
            <div id="logo">
                <a href="/">FindMyHome</a>
            </div>
            <div className="nav-links">
                <a href="#">Buy</a>
                <a href="#">All Props</a>
                <a href="#">About</a>
            </div>
        </div>
    )
}

export default NavBar;