import React, { Component } from "react";
import HomePage from "./components/HomePage";
import LoginForm from "./components/form/LoginForm";
import RegisterForm from "./components/form/RegisterForm";
import CreateEvent from "./components/form/CreateEvent";
import MyEvents from "./components/events/MyEvents";
import EvenDetail from "./components/events/EventDetail";
import EditForm from "./components/form/EditForm";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={HomePage}></Route>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/register" component={RegisterForm}></Route>
            <Route path="/createEvent" component={CreateEvent}></Route>
            <Route path="/MyEvents" component={MyEvents}></Route>
            <Route path="/event/:id" component={EvenDetail}></Route>
            <Route path="/editForm" component={EditForm} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
