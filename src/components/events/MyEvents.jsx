import { useHistory } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";
import { Card, Icon, Button, Alert } from "antd";
import { useFirestoreConnect } from "react-redux-firebase";
import "./MyEvents.css";
// import { NavLink } from "react-router-dom";
import { deleteEvent, fetchValues } from "./../../actions/";

const MyEvents = props => {
  let history = useHistory();
  let myEvents;
  useFirestoreConnect([{ collection: "Events" }]);
  console.log(props.events, "events");

  myEvents = props.events
    ? props.events.filter(event => event.creator === props.user)
    : null;

  console.log(myEvents, "checking");

  return (
    <div className="my-events">
      <div className="heading">
        <h1 className="my-events-heading">My Events</h1>
      </div>
      <div className="my-events-list">
        {myEvents &&
          myEvents.map(event => (
            <Card className="ant-card" key={event.id} style={{ margin: "1em" }}>
              <img src={event.images[0]} alt="img" className="event-img"></img>
              <div className="details">
                <h1 className="event-heading">{event.name}</h1>
                <div>
                  <button
                    className="my-events-button"
                    onClick={() => props.history.push(`event/${event.id}`)}
                  >
                    {" "}
                    View More
                    <Icon type="arrow-right" style={{ margin: "5px" }} />
                  </button>
                </div>
                <div>
                  <Button
                    type="primary"
                    onClick={() => props.deleteEvent(event)}
                  >
                    Delete Event
                  </Button>
                </div>
                <div
                  style={{
                    marginTop: "5px"
                  }}
                >
                  <Button
                    type="primary"
                    onClick={() => {
                      props
                        .fetchValues(event.id, props.events)
                        .then(res => history.push("/editForm"));
                    }}
                  >
                    Edit
                  </Button>
                </div>
              </div>
            </Card>
          ))}
      </div>
      <div className="error-div">
        {props.error === true && (
          <Alert
            style={{
              margin: "1em",
              width: "300px",
              textAlign: "center"
            }}
            type="error"
            message="Something went wrong"
            className="error-alert"
          ></Alert>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    events: state.firestore.ordered.Events,
    user: state.firebase.auth.uid,
    error: state.errorReducer
  };
};

const mapDispatchToProps = {
  deleteEvent,
  fetchValues
};

export default connect(mapStateToProps, mapDispatchToProps)(MyEvents);
