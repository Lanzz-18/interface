import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => {
    return(
        <div className="Home">
            {/* Image card */}
            <div className="main-panel">
                <h1><span>Believe</span> in finding it</h1>
                <h3>With the UK's largest choice of homes</h3>

                <div className="search-panel">
                <ul className="search-option-container">
                    <li className="search-option">Buy</li>
                    <li className="search-option">Rent</li>
                    <li className="search-option">Sold</li>
                </ul>
                <hr />
                <form className="search-panel-form">
                    <div className="search-group">
                    <label for="search">Search properties to buy</label>
                    <input type="search" id="search" placeholder='Bath, NW3, or Leeds station'></input>
                    </div>
                    <button id="search-button"><Link to="/search-page">Search</Link></button>
                </form>
                </div>
            </div>
        </div>
    )
}

export default Home