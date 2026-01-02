import React, {useState} from 'react';
import SearchBar from './components/SearchBar';
import PropertyCard from './components/PropertyCard';
import PropertyPage from './components/PropertyPage';
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import homeImage from "./assets/homes.jpg";
import DropDown from './components/Dropdown';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App(){
  return(
    <Router>
      <div className="App"> 
        <NavBar />
        <div className="Content">
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="search-bar" element={<SearchBar location="New York" purpose="sale"/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App;