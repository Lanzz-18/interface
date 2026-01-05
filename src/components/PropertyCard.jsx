import React, { useState } from "react";
import { Link } from "react-router-dom";

const PropertyCard = (props) => {
  return (
    <div className="product-card">
        <img
            src={import.meta.env.BASE_URL + `/images/${props.picture}`}
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
                    <img src={`${import.meta.env.BASE_URL}/images/house.png`} alt="house icon"></img>
                    <p>{props.type}</p>
                </div>

                <div className="icon-group">
                    <img src={import.meta.env.BASE_URL + "/images/bed.png"} alt="bed icon"></img>
                    <p>{props.bedrooms}</p>
                </div>

                <div className="icon-group">
                    <img src={import.meta.env.BASE_URL + "/images/link.png"} alt="link icon"></img>
                    <p>
                    <Link to={`/property/${props.id}`}>Details</Link>
                    </p>
                </div>
            </div>

            <div className="product-card-footer">
                <div className="contact-details">
                    <div className="contact-group">
                        <img src={import.meta.env.BASE_URL + "/images/call.png"} alt="telephone icon"></img>
                    </div>
                    <div className="contact-group" id="mail">
                        <img src={import.meta.env.BASE_URL + "/images/contact.png"} alt="mail icon"></img>
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
