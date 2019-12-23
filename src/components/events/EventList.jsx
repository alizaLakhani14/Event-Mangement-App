import React from "react";
import { connect } from "react-redux";
import { Card } from "antd";
import "./EventList.css";
import { useFirestoreConnect } from "react-redux-firebase";
const EventList = props => {
  useFirestoreConnect([{ collection: "Events" }]);
  let eventList =
    props.events &&
    props.events.map(event => {
      return (
        <Card
          style={{ width: 300, margin: "1em" }}
          key={event.id}
          // id={props.id}
        >
          <h1>{event.name}</h1>
          <p>{event.description}</p>
        </Card>
      );
    });
  return <div className="eventList">{eventList}</div>;
};

const mapStateToProps = state => {
  return {
    events: state.firestore.ordered.Events,

  };
};

export default connect(mapStateToProps)(EventList);
