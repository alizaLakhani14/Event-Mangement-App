import { useHistory } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";
import { Card, Icon, Alert } from "antd";
import { useFirestoreConnect } from "react-redux-firebase";
import "./MyEvents.css";

import { deleteEvent, fetchValues } from "./../../actions/";
import Header from "./../Header/Header";

const MyEvents = props => {
  let history = useHistory();
  let myEvents;
  useFirestoreConnect([{ collection: "Events" }]);
  console.log(props.events, "events");

  myEvents = props.events
    ? props.events.filter(event => event.creator === props.user)
    : null;


  return (
    <div className="my-events">
      <Header />
      <div className="my-events-container">
        <div className="heading">
          <h1 className="my-events-heading">My Events</h1>
        </div>
        <div className="my-events-list">
          {myEvents &&
            myEvents.map(event => (
              <Card
                className="ant-card"
                key={event.id}
                style={{ margin: "1em" }}
              >
                <img
                  src={event.images[0]}
                  alt="img"
                  className="event-img"
                ></img>
                <div className="details">
                  <h1 className="event-heading">{event.name}</h1>
                  <p className="my-events-description">{event.description}</p>
                  <div className="my-events-buttons">
                    <div>
                      <button
                        className="view-more-button"
                        onClick={() => props.history.push(`event/${event.id}`)}
                      >
                        {" "}
                        View More
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={() => props.deleteEvent(event)}
                        className="delete-button"
                      >
                        Delete Event
                      </button>
                    </div>
                    <div>
                      <button
                        className="edit-button"
                        onClick={() => {
                          props
                            .fetchValues(event.id, props.events)
                            .then(res => history.push("/editForm"));
                        }}
                      >
                        Edit
                      </button>
                    </div>
                    <div className="delete-edit-icons">
                      <Icon
                        type="delete"
                        className="delete"
                        onClick={() => props.deleteEvent(event)}
                      />
                      <Icon
                        type="edit"
                        className="edit"
                        onClick={() => {
                          props
                            .fetchValues(event.id, props.events)
                            .then(res => history.push("/editForm"));
                        }}
                      />
                    </div>
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
