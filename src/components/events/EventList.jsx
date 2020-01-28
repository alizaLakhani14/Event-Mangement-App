import React from "react";
import { connect } from "react-redux";
import { Card, Button, Icon } from "antd";
import "./EventList.css";
import { useFirestoreConnect } from "react-redux-firebase";
import { NavLink } from "react-router-dom";

const EventList = props => {
  console.log(props);
  useFirestoreConnect([{ collection: "Events" }]);
  let eventList =
    props.events &&
    props.events.map(event => {
      return (
        <Card className="ant-card" key={event.id} size="default">
          <img src={event.images[0]} alt="img" className="event-img" />
          <div className="details">
            <h1 className="event-heading">{event.name}</h1>
            <p>{event.description}</p>
            <NavLink to={`event/${event.id}`}>
              <button className="view-more">
                View More <Icon type="arrow-right" className="view-more-icon" />{" "}
              </button>
            </NavLink>
          </div>
        </Card>
      );
    });
  return <div className="eventList">{eventList}</div>;
};

const mapStateToProps = state => {
  return {
    events: state.firestore.ordered.Events,
    name: state.firebase.profile.name
  };
};

export default connect(mapStateToProps)(EventList);
