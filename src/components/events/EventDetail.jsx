import React from "react";
import { connect } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { Icon, Carousel } from "antd";
import EventDetailMap from "./EventDetailMap";
import "./EventDetail.css";
import Header from "./../../components/Header/Header";

const EventDetail = props => {
  const [isVisible, setVisibility] = React.useState(false);

  const toggleVisibilityButoon = () => {
    setVisibility(!isVisible);
  };

  useFirestoreConnect([{ collection: "Events" }]);

  console.log(props.event.images);
  return (
    <div className="detailPage">
      <Header />
      <div className="event-detail-div">
        <div className="img-name">
          <Carousel autoplay>
            {props.event.images &&
              props.event.images.map(image => (
                <img src={image} alt="img" className="event-detail-img" />
              ))}
          </Carousel>

          <div className="event-details-div">
            <div>
              <h1 className="event-name-heading ">{props.event.name}</h1>
            </div>

            <div className="contact-info">
              <Icon
                type="phone"
               className='event-detail-icon'
              />
              <span className="event-span">{props.event.contactNumber}</span>
            </div>
            <div>
              <Icon
                type="user"
                className='event-detail-icon'
              />
              <span className="event-span">{props.event.maxMembers}</span>
            </div>
            <div>
              <Icon
                type="tag"
                className='event-detail-icon'
              />
              <span className="event-span">{`${props.event.price} Rs`}</span>
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
        </div>
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
