import React from 'react';
import DropDown from './Dropdown';

const propertTypes =["House", "Flat", "Bungalow", "Land"];

function SearchBar(props){
    return(
        <section>
            {/* Creating the form*/}
            <form>
                <h1>Find property for {props.purpose} in {props.location}</h1>
            </form>
            <DropDown 
                label="Property Type"
                options={propertTypes}
                onSelect={(value) => console.log(`User selected: ${value}`)}
            />
            
        </section>
    )
}

export default SearchBar;