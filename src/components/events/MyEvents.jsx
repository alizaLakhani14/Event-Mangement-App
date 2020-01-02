import React from "react";
import { connect } from "react-redux";
import { Card, Icon } from "antd";
import { useFirestoreConnect } from "react-redux-firebase";
import "./MyEvents.css";

const MyEvents = props => {
  useFirestoreConnect([{ collection: "Events" }]);
  let myEvents =
    props.events &&
    props.events.filter(event => event.createrId === props.user);
  console.log(props, "eventsList");
  return (
    <div className="my-events">
      <div className="heading">
        <h1 className="my-events-heading">My Events</h1>
      </div>
      <div className="my-events-list">
        {myEvents &&
          myEvents.map(event => (
            <Card className="ant-card" key={event.id} style={{ margin: "1em" }}>
              <img src={event.url} alt="img" className="event-img"></img>
              <div className="details">
                <h1 className="event-heading">{event.name}</h1>

                <button
                  className="my-events-button"
                  onClick={() => props.history.push(`event/${event.id}`)}
                >
                  {" "}
                  View More
                  <Icon type="arrow-right" style={{ margin: "5px" }} />
                </button>
              </div>
            </Card>
          ))}
        }
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    events: state.firestore.ordered.Events,
    user: state.firebase.auth.uid
  };
};

export default connect(mapStateToProps)(MyEvents);


