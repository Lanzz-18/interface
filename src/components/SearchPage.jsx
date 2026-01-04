import React, {useState, useEffect} from 'react';
import DropDown from './DropDown';
import PropertyCard from './PropertyCard';
import data from '../assets/properties.json';

/* Creating list of property types */
const propertTypes =[
    "House", 
    "Flat", 
    "Apartment",
    "Bungalow", 
    "Plot", 
    "Penthouse"
];

/* Creating list of bedroom ranges */
const bedroomCount = ["Studio", 1, 2, 3, 4 ,5];

/* Creating list of added to site values */
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

function SearchPage(){
    const[criteria, changeCriteria] = useState({
        type:"Any",
        minPrice:0,
        maxPrice: Infinity,
        minBed: 0,
        maxBed: Infinity,
        postcode: '',
        date: "Anytime"
    });
    const [filteredData, changeFilteredData] = useState(data.properties);

    function filterChanges(prop){
        const matchType = criteria.type === 'Any' || prop.type === criteria.type;
        const matchPrice = prop.price >= criteria.minPrice && prop.price <= criteria.maxPrice;
        const matchBeds = prop.bedrooms >= criteria.minBed && prop.bedrooms <= criteria.maxBed;
        const matchPostcode = prop.location.toUpperCase().includes(criteria.postcode.toUpperCase());
        return matchType && matchPrice && matchBeds && matchPostcode;
    };

    useEffect(() => {
        const results = data.properties.filter(filterChanges)
        changeFilteredData(results);
    }, [criteria])

    function updateCriteria(field, value){
        changeCriteria(oldCriteria => ({...oldCriteria, [field]:value}))
    }

    /*
    <DropDown 
        label="Search radius"
        options={searchRadius}
        default="This area only"
        onSelect={(value) => updateCriteria('type', value)}
    /> 

    <DropDown 
        label="Added to Site"
        options={addedToSite}
        default="Anytime"
        onSelect={(value) => console.log(`User selected: ${value}`)}
    />
    */

    return(
        <div>
            {/* Creating the form*/}
            <form className="search-form">
                <h1>Search properties for sale</h1>
                <div className="filters">
                    <div className="search-input-group">
                        <label htmlFor="location-search">Search location</label>
                        <input 
                            type='search' 
                            placeholder="NW3, BR5, etc" 
                            id="location-search"
                            value={criteria.postcode}
                            onChange={(val) => updateCriteria('postcode', val.target.value)}></input>
                    </div>

                    <DropDown 
                        label="Property Type"
                        options={propertTypes}
                        default="Any"
                        onSelect={(value) => updateCriteria('type', value)}
                    />

                    <div className="search-input-group">
                        <label htmlFor="date-search">Search by date added</label>
                        <input 
                            type='search' 
                            placeholder="October 12 2025.." 
                            id="date-search"
                            value={criteria.date}
                            onChange={(val) => updateCriteria('date',val.target.value)}></input>
                    </div>

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

                    <div className="range-value-group">
                        <label>Price Range</label>
                        <div className="range-values">
                            <DropDown 
                                options={priceRange}
                                default="No min"
                                onSelect={(value) => updateCriteria('minPrice', parseInt(value.replace(/\D/g, '')))}
                            />
                            <p>-</p>
                            <DropDown 
                                options={priceRange}
                                default="No max"
                                onSelect={(value) => updateCriteria('maxPrice', parseInt(value.replace(/\D/g, '')))}
                            />
                        </div>
                    </div>
                </div>
            </form>

            <section className='results-section'>
                <h2 id="results-text">{filteredData.length} Property Results Found</h2>
                {filteredData.map((property) => (
                        <PropertyCard 
                            key={property.id}
                            type={property.type}
                            bedrooms={property.bedrooms}
                            price={property.price}       
                            location={property.location}
                            description={property.description}
                            picture={property.picture}
                            added={property.added}
                        />
                ))}
            </section>
        </div>
    )
}/*
 {
    "id":"prop1",
    "type":"House", - 
    "bedrooms":3, - 
    "price":750000, -
    "tenure":"Freehold",
    "description":"Attractive three bedroom semi-detached family home situated within 0.5 miles of Petts Wood station with fast trains to London and within easy walking distance of local shops, schools, bus routes and National Trust woodland. The property comprises; two receptions, fitted 18'9 x 10'1 kitchen/breakfast room and conservatory. The property also benefits from having a utility room and cloakroom. To the first floor there are three bedrooms and a family bathroom with separate WC. Additional features include double glazing, gas central heating and a well presented interior...",
    "location":"Petts Wood Road, Petts Wood, Orpington BR5", -
    "picture":"images/prop1pic1small.jpg",
    "url":"properties/prop1.html",
    "added": { - 
        "month":"October",
        "day":12,
        "year":2022
    }
},
*/

export default SearchPage;