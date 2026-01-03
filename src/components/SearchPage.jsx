import React from 'react';
import DropDown from './DropDown';

const propertTypes =[
    "Houses", 
    "Flats / Apartments", 
    "Bungalows", 
    "Land", 
    "Commercial Property", 
    "Other"
];
const bedroomCount = ["Studio", 1, 2, 3, 4 ,5];
const addedToSite = [
    "Last 24 hours", 
    "Last 3 days", 
    "Last 7 days", 
    "Last 14 days"
];
/* Creating list of price ranges */
const priceRange = [];
let increment = 10000;
for(let i=50000; i<=20000000;){
    priceRange.push("€"+i)
    if(i === 300000){
        increment = 25000
    } else if (i === 500000){
        increment = 50000
    } else if (i === 700000){
        increment = 100000
    } else if (i === 1000000){
        increment = 500000
    } else if (i === 3000000){
        increment = 1000000
    } else if (i === 10000000){
        increment = 5000000
    }
    i += increment;
}
console.log(priceRange)
/* Creating list of search radius */
const searchRadius = [
    "Within ¼ mile",
    "Within ½ mile",
    "Within 1 mile",
    "Within 3 miles",
    "Within 5 miles",
    "Within 10 miles",
    "Within 15 miles",
    "Within 20 miles",
    "Within 30 miles",
    "Within 40 miles"
]

function SearchPage(props){
    return(
        <section>
            {/* Creating the form*/}
            <form className="search-form">
                <h1>Find property for {props.purpose} in {props.location}</h1>
                <div className="filters">
                    <DropDown 
                    label="Search radius"
                    options={searchRadius}
                    default="This area only"
                    onSelect={(value) => console.log(`User selected: ${value}`)}
                    />

                    <div className="range-value-group">
                        <label>Price Range</label>
                        <div className="range-values">
                            <DropDown 
                                options={priceRange}
                                default="No min"
                                onSelect={(value) => console.log(`User selected: ${value}`)}
                            />
                            <p>-</p>
                            <DropDown 
                                options={priceRange}
                                default="No max"
                                onSelect={(value) => console.log(`User selected: ${value}`)}
                            />
                        </div>
                    </div>

                    <DropDown 
                        label="Property Type"
                        options={propertTypes}
                        default="Any"
                        onSelect={(value) => console.log(`User selected: ${value}`)}
                    />

                    <div className="range-value-group">
                        <label>No. of Bedrooms</label>
                        <div className="range-values">
                            <DropDown 
                                options={bedroomCount}
                                default="No min"
                                onSelect={(value) => console.log(`User selected: ${value}`)}
                            />
                            <p>-</p>
                            <DropDown 
                                options={bedroomCount}
                                default="No max"
                                onSelect={(value) => console.log(`User selected: ${value}`)}
                            />
                        </div>
                    </div>

                    <DropDown 
                        label="Added to Site"
                        options={addedToSite}
                        default="Anytime"
                        onSelect={(value) => console.log(`User selected: ${value}`)}
                    />
                    <button>Search properties</button>
                </div>
            </form>

            <h2 id="results-text">Results will load here</h2>
        </section>
    )
}

export default SearchPage;