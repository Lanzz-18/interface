import React, { useState, useEffect } from "react";
import DropDown from "./DropDown";
import PropertyCard from "./PropertyCard";
import data from "../assets/properties.json";

/* Creating list of property types */
const propertTypes = [
  "House",
  "Flat",
  "Apartment",
  "Bungalow",
  "Land",
  "Penthouse",
];

/* Creating list of bedroom ranges */
const bedroomCount = ["Studio", 1, 2, 3, 4, 5];

/* Creating list of price ranges */
const priceRange = [];
let increment = 10000;
for (let i = 50000; i <= 20000000; ) {
  priceRange.push("€" + i);
  if (i === 300000) {
    increment = 25000;
  } else if (i === 500000) {
    increment = 50000;
  } else if (i === 700000) {
    increment = 100000;
  } else if (i === 1000000) {
    increment = 500000;
  } else if (i === 3000000) {
    increment = 1000000;
  } else if (i === 10000000) {
    increment = 5000000;
  }
  i += increment;
}

// Main code body
const SearchPage = () => {
  // Creating default criteria for the search filters
  const [criteria, changeCriteria] = useState({
    type: "Any",
    minPrice: 0,
    maxPrice: Infinity,
    minBed: 0,
    maxBed: Infinity,
    postcode: "",
    date: "Anytime",
  });

  // Creatiing a place to store the filtered data
  const [filteredData, changeFilteredData] = useState(data.properties);

  // Checking each of the properties of each property
  function filterChanges(prop) {
    const propDate = `${prop.added.month} ${prop.added.day} ${prop.added.year}`;
    const matchType = criteria.type === "Any" || prop.type === criteria.type;
    const matchPrice =
      prop.price >= criteria.minPrice && prop.price <= criteria.maxPrice;
    const matchBeds =
      prop.bedrooms >= criteria.minBed && prop.bedrooms <= criteria.maxBed;
    const matchPostcode = prop.location
      .toUpperCase()
      .includes(criteria.postcode.toUpperCase());
    const matchDate = criteria.date === "Anytime" || propDate === criteria.date;
    return matchType && matchPrice && matchBeds && matchPostcode && matchDate;
  }

  // Updating filtered list everytime the criteria is changed
  useEffect(() => {
    const results = data.properties.filter(filterChanges);
    changeFilteredData(results);
  }, [criteria]);

  // Function to update the criteria everytime a search filter is changed
  function updateCriteria(field, value) {
    changeCriteria((oldCriteria) => ({ ...oldCriteria, [field]: value }));
  }

  /* Clear button */
  const clearFilters = (e) => {
    e.preventDefault();
    changeCriteria({
      type: "Any",
      minPrice: 0,
      maxPrice: Infinity,
      minBed: 0,
      maxBed: Infinity,
      postcode: "",
      date: "Anytime",
    });
  };

  // Favourites functionality
  const [favourites, changeFavourites] = useState([]);
  
  // Add to favourites button 
  const toggleFavourite = (prop) => {
    changeFavourites((prev) => {
      const alreadyFavourite = prev.find(item => item.id === prop.id);
      if (alreadyFavourite) {
        // If the property is already in the list, filter it out
        return prev.filter(item => item.id !== prop.id);
      } else {
        return [...prev, prop];
      }
    });
  };

  // Sending the property id as data transfer
  const handleDrag = (e, prop) => {
    e.dataTransfer.setData("propertyId", prop.id);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    // Finding the property from data using the id
    const id = e.dataTransfer.getData("propertyId");
    const propertyToAdd = data.properties.find((p) => p.id === id);
    changeFavourites((prev) => {
        if (!prev.find((p) => p.id === id)) {
            return [...prev, propertyToAdd];
        } else {
            return prev;
        }
    })
  };

  return (
    <div>
      {/* Creating the form*/}
      <form className="search-form">
        <h1>Search properties for sale</h1>
        <div className="filters">
          <div className="search-input-group">
            <label htmlFor="location-search">Search location</label>
            <input
              type="search"
              placeholder="NW3, BR5, etc"
              id="location-search"
              value={criteria.postcode}
              onChange={(val) => updateCriteria("postcode", val.target.value)}
            ></input>
          </div>

          <DropDown
            label="Property Type"
            options={propertTypes}
            default="Any"
            onSelect={(value) => updateCriteria("type", value)}
          />

          <div className="search-input-group">
            <label htmlFor="date-search">Search by date added</label>
            <input
              type="search"
              placeholder="October 12 2025.."
              id="date-search"
              value={criteria.date}
              onChange={(val) => updateCriteria("date", val.target.value)}
            ></input>
          </div>

          <div className="range-value-group">
            <label>No. of Bedrooms</label>
            <div className="range-values">
              <DropDown
                options={bedroomCount}
                default="No min"
                onSelect={(value) => updateCriteria("minBed", value)}
              />
              <p>-</p>
              <DropDown
                options={bedroomCount}
                default="No max"
                onSelect={(value) => updateCriteria("maxBed", value)}
              />
            </div>
          </div>

          <div className="range-value-group">
            <label>Price Range</label>
            <div className="range-values">
              <DropDown
                options={priceRange}
                default="No min"
                onSelect={(value) =>
                  updateCriteria("minPrice", parseInt(value.match(/(\d+)/)))
                }
              />
              <p>-</p>
              <DropDown
                options={priceRange}
                default="No max"
                onSelect={(value) =>
                  updateCriteria("maxPrice", parseInt(value.match(/(\d+)/)))
                }
              />
            </div>
          </div>

          <button id="clear-button" onClick={clearFilters}>
            Clear
          </button>
        </div>
      </form>

      {/* Favourites section */}
      <div
        className="favourites-section"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <p id="favourite-section-header">{favourites.length} Favourite Properties Added</p>
        {favourites.length === 0 
            ? (<p>Add your favourite properties here</p>) 
            : (
                <div className="fav-props-container">
                    {favourites.map((favProperty) => (
                        <div key={favProperty.id} className="fav-prop-profile">
                            <img src={`images/${favProperty.picture}`} alt="Property picture" />
                            <div>
                                <p id="favourite-prop-location">{favProperty.location}</p>
                                <p id="favourite-prop-type"><string>{favProperty.type}</string></p>
                            </div>
                            <button id="remove-button" onClick={() => toggleFavourite(favProperty)}>Remove</button>
                            
                        </div>
                    ))}
                </div>
        )}
      </div>

      {/* Showcasing the results */}
      <section className="results-section">
        <h2 id="results-text">{filteredData.length} Property Results Found</h2>
        {filteredData.map((property) => (
          <div
            key={property.id}
            draggable="true"
            onDragStart={(e) => handleDrag(e, property)}
          >
            <PropertyCard
                key={property.id}
                id={property.id}
                type={property.type}
                bedrooms={property.bedrooms}
                price={property.price}
                location={property.location}
                description={property.description}
                picture={property.picture}
                added={property.added}
                onFavClick={() => toggleFavourite(property)}
                isFav={favourites.some(p => p.id === property.id)}
            />
          </div>
        ))}
      </section>
    </div>
  );
};

export default SearchPage;
