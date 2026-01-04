import React from "react";
import Bed from "../assets/bed.png";
import Call from "../assets/call.png";
import Contact from "../assets/contact.png";
import House from "../assets/house.png";
import Link from "../assets/link.png";

const PropertyCard = (props) => {
  return (
    <div className="product-card">
      <img src={`/images/${props.picture}`} alt={"#"} className="profile-picture"></img>

      <div className="property-details">
        <div className="property-header">
          <p id="location">{props.location}</p>
          <h3 id="price">€{props.price}</h3>
        </div>
        <p id="date">
          Added on {props.added.month} {props.added.day}, {props.added.year}
        </p>
        <p>{props.description}</p>
        <div className="icon-groups">
          <div className="icon-group">
            <img src={House} alt="Bed icon"></img>
            <p>{props.type}</p>
          </div>

          <div className="icon-group">
            <img src={Bed} alt="Bed icon"></img>
            <p>{props.bedrooms}</p>
          </div>

          <div className="icon-group">
            <img src={Link} alt="Bed icon"></img>
            <a href="#">More</a>
          </div>
        </div>

        <div className="product-card-footer">
          <div className="contact-details">
            <div className="contact-group">
              <img src={Call} alt="telephone icon"></img>
            </div>
            <div className="contact-group" id="mail">
              <img src={Contact} alt="mail icon"></img>
            </div>
          </div>
          <button id="favourite-button">Add to Favourites</button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
