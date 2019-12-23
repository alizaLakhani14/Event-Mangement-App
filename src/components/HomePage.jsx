import React, { Component } from "react";
import "antd/dist/antd.css";
import "./HomePage.css";
import { Layout, Button, Carousel } from "antd";
import event1 from "./../images/event1.jpg";
import event2 from "./../images/event2.jpg";
import event3 from "./../images/event3.jpg";
import event4 from "./../images/event4.jpg";
import EventList from "./events/EventList";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "./../actions";

class HomePage extends Component {
  render() {
    const { uid } = this.props;
    return (
      <div className="App">
        <Layout className="layout-style">
          <header>
            <h1>LAKHANI EVENTS</h1>
            <div className="buttons">
              {uid ? ( <> <NavLink to="/createEvent">
                <Button type="primary" className="header-button">
                  Create Event
                </Button>
              </NavLink>

              <Button type="primary" onClick={this.props.signOut}>
                Sign Out
              </Button></>) : (<> <NavLink to="/login">
                <Button type="primary" className="header-button">
                  Sign In
                </Button>
              </NavLink>
              <NavLink to="/register">
                <button className="header-button sign-up">Register</button>
              </NavLink></>)}
            </div>
          </header>

          <section className="carousel">
            <Carousel autoplay>
              <div>
                <img src={event1} alt="img" />
              </div>
              <div>
                <img src={event2} alt="img" />
              </div>
              <div>
                <img src={event3} alt="img" />
              </div>
              <div>
                <img src={event4} alt="img" />
              </div>
            </Carousel>
          </section>
          <section className="events-list">
            <h1>Events</h1>
            <EventList />
          </section>
        </Layout>
        {/* <CreateEvent /> */}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => {
      dispatch(signOut());
    }
  };
};

const mapStateToProps = state => {
  return {
    uid: state.firebase.auth.uid
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
