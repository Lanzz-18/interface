import React, { useState } from "react";
import Bed from "../assets/bed.png";
import Call from "../assets/call.png";
import Contact from "../assets/contact.png";
import House from "../assets/house.png";
import LinkIcon from "../assets/link.png";
import { Link } from "react-router-dom";

const PropertyCard = (props) => {
  return (
    <div className="product-card">
        <img
            src={`/images/${props.picture}`}
            alt={"images of the property"}
            className="profile-picture"
        ></img>

        <div className="property-details">
            <div className="property-header">
            <p id="location">{props.location}</p>
            <h3 id="price">€{props.price}</h3>
            </div>
            <p id="date">
            Added on {props.added.month} {props.added.day} {props.added.year}
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
                    <img src={LinkIcon} alt="Bed icon"></img>
                    <p>
                    <Link to={`/property/${props.id}`}>Details</Link>
                    </p>
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
                <button id="favourite-button" onClick={props.onFavClick}>
                    {props.isFav ? "Remove Favourite" : "Add to Favourites"}
                </button>
            </div>
      </div>
    </div>
  );
};

export default PropertyCard;
