import React, { Component } from "react";
import "antd/dist/antd.css";
import "./HomePage.css";
import { Layout, Button, Carousel } from "antd";
import event1 from "./../images/event1.jpg";
import event2 from "./../images/event2.jpg";
import event3 from "./../images/event3.jpg";
import event4 from "./../images/event4.jpg";
import EventList from "./events/EventList";
// import RegisterForm from "./form/RegisterForm";
// import LoginForm from "./form/LoginForm";
import {NavLink} from 'react-router-dom';


class HomePage extends Component {
  state = {
    events: [
      {
        title: "event1",
        description: "this is a event"
      },
      {
        title: "event1",
        description: "this is a event"
      },
      {
        title: "event1",
        description: "this is a event"
      },
      {
        title: "event1",
        description: "this is a event"
      },
      {
        title: "event1",
        description: "this is a event"
      },
      {
        title: "event1",
        description: "this is a event"
      }
    ]
  };

  render() {
    return (
      <div className="App">
        <Layout className="layout-style">
          <header>
            <h1>LAKHANI EVENTS</h1>
            <div className="buttons">
              <Button type="primary" className="header-button">
                Sign In
              </Button>
              <button className="header-button sign-up">Register</button>
              <Button type="primary" className="header-button">
                Create Event
              </Button>
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
            <EventList events={this.state.events} />
          </section>
        </Layout>
        {/* <RegisterForm />
				<LoginForm /> */}
      </div>
    );
  }
}

export default HomePage;
