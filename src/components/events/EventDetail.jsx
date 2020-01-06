import React, { useState } from "react";
import { connect } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { Icon, Carousel } from "antd";
import EventDetailMap from "./EventDetailMap";
import "./EventDetail.css";

const EventDetail = props => {
  const [isVisible, setVisibility] = React.useState(false);

  const toggleVisibilityButoon = () => {
    setVisibility(!isVisible);
  };

  useFirestoreConnect([{ collection: "Events" }]);
  return (
    <div className="detailPage">
      <div className="img-name">
        <Carousel autoplay>
          {props.event.images.map(image => (
            <div>
              <img src={image} alt="img" className="event-detail-img" />{" "}
            </div>
          ))}
        </Carousel>

        <div className="event-details-div">
          <h1 className="event-name-heading ">{props.event.name}</h1>
          <div className="contact-info">
            <Icon
              type="phone"
              style={{
                color: "#f13a59",
                fontSize: "30px"
              }}
            />
            <span className="event-span">{props.event.contactNumber}</span>
          </div>
          <div>
            <Icon
              type="user"
              style={{
                color: "#f13a59",
                fontSize: "30px"
              }}
            />
            <span className="event-span">{props.event.maxMembers}</span>
          </div>
          <div>
            <Icon
              type="tag"
              style={{
                color: "#f13a59",
                fontSize: "30px"
              }}
            />
            <span className="event-span">{`${props.event.price} Rs`}</span>
          </div>
        </div>
      </div>

      <div className="event-description-div">
        <p className="event-description">{props.event.description}</p>
      </div>
      <div className="show-map-div">
        <button onClick={toggleVisibilityButoon} className="show-map-btn">
          {isVisible === false ? "Show Map" : "Hide Map"}
        </button>
      </div>
      <div className="map">
        {props.event.places && isVisible === true && (
          <EventDetailMap
            latitude={props.event.places.lat}
            longitude={props.event.places.lng}
          />
        )}
      </div>
    </div>
  );
};
const mapStateToProps = (state, ownProps) => {
  const events = state.firestore.ordered.Events;
  const id = ownProps.match.params.id;
  const event = events ? events.filter(event => event.id === id)[0] : "loading";

  return {
    event
  };
};
export default connect(mapStateToProps)(EventDetail);
