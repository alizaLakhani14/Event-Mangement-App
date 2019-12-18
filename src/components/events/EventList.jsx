// import React from "react";
// // import { Row } from 'antd';
// // import Event from "./Event";
// import "./EventList.css";
// import { connect } from "react-redux";
// import { Card } from "antd";

// const EventList = props => {
//   console.log(props.events, "state se pas huway events");

//   let events = props.events.map(event => {
//     return (
//       <Card style={{ width: 300 }}>
//         <h1>{event.name}</h1>
//         <p>{event.description}</p>
//       </Card>
//     );
//   });
//   return (
//     // <div style={{ padding: "30px" }} className="EventList">
//     //   {props.events.map(event => (
//     //     <Event
//     //       title={event.name}
//     //       description={event.title}
//     //       key={Math.random() * 1000}
//     //     />
//     //   ))}
//     // </div>
//     <div>{events}</div>
//   );
// };

// const mapStateToProps = state => {
//   console.log(state);
//   return {
//     events: state.events
//   };
// };

// export default connect(mapStateToProps)(EventList);

import React from "react";
import { connect } from "react-redux";
import { Card } from "antd";
import "./EventList.css";
const EventList = props => {
  console.log(props.events, "YE STATE HAI JO PROPS MAI PASS HORAHAY HAIN");
  let eventList = props.events.map(event => {
    return (
      <Card style={{ width: 300, margin:'1em'}} key={event.id}>
        <h1>{event.name}</h1>
        <p>{event.description}</p>
      </Card>
    );
  });
  return <div className="eventList">{eventList}</div>;
};

const mapStateToProps = state => {
  return {
    events: state.events
  };
};

export default connect(mapStateToProps)(EventList);
