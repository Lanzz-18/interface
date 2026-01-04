import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import data from "../assets/properties.json";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const prop = data.properties.find((item) => item.id === id);
  if (!prop) {
    // If the prop is empty
    return (
        <div>
            <h1>No property found</h1>
        </div>
    )
  } else {
    // Gallery arrow functions
    const [imgIndex, changeImgIndex] = useState(1);
    // Previous image button
    function previousImg(){
        changeImgIndex(imgIndex > 1 ? imgIndex-1 : 7)
    }
    // Next image button
    function nextImg(){
        changeImgIndex(imgIndex < 7 ? imgIndex+1 : 1)
    }
    // Tab functionality
    const [toggleContent, changeToggleContent] = useState(1)
    const updateToggle = (id) => {
        changeToggleContent(id);
    }
    return (
        <div className="product-details-page">
            <button id="back-button" onClick={() => navigate(-1)}>Back</button>
            <h1 id="property-details-heading">Property details</h1>
            <h1 id="property-location">{prop.location}</h1>

            <h4 id="gallery-heading">Gallery</h4>
            <div className="property-gallery">
                <button onClick={previousImg}>&lt;</button>
                <img src={`/images/${prop.id}/${imgIndex}.jpeg`} id="image-view"></img>
                <button onClick={nextImg}>&gt;</button>
            </div>

            <div className="property-sub-details">
                <p>- Bedrooms: <span>{prop.bedrooms}</span></p>
                <p>- Price: <span>€{prop.price}</span></p>
                <p>- Type: <span>{prop.type}</span></p>
            </div>

            <div className="tab-section">
                <ul className="tab-headings">
                    <li onClick={() => updateToggle(1)} className={toggleContent === 1 ? "highlight-tab-heading" : ''}>Description</li>
                    <li onClick={() => updateToggle(2)} className={toggleContent === 2 ? "highlight-tab-heading" : ''}>Floor plan</li>
                    <li onClick={() => updateToggle(3)} className={toggleContent === 3 ? "highlight-tab-heading" : ''}>Google maps</li>
                </ul>
                <div className={toggleContent === 1 ? "show-content" : "content"} id="description">
                    <p>{prop.description}</p>
                </div>

                <div className={toggleContent === 2 ? "show-content" : "content"} id="floor-plan">
                    <img src={`/images/${prop.id}/floor-plan.jpg`}></img>
                </div>

                <div className={toggleContent === 3 ? "show-content" : "content"} id="google-maps"> 
                    <h3>Google Maps Location</h3>
                    <a href={`${prop["google-link"]}`} target="_blank">View on maps</a>
                </div>
            </div>
        </div>
    );
  }
};

export default PropertyDetails;

/*
 <iframe
    title="Property location"
    width="100%"
    height="300"
    style={{ border: 0 }}
    loading="lazy"
    src={'{https://maps.google.com/maps?q=${encodeURIComponent(property.location)}&z=15&output=embed}'}
/>
*/