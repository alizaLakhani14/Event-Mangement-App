import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './App.css';
import { Layout, Button, Carousel, Modal } from 'antd';
import event1 from './images/event1.jpg';
import event2 from './images/event2.jpg';
import event3 from './images/event3.jpg';
import event4 from './images/event4.jpg';
import EventList from './components/events/EventList';
import RegisterForm from './components/form/RegisterForm';

class App extends Component {
	state = {
		events: [
			{
				title: 'event1',
				description: 'this is a event'
			},
			{
				title: 'event1',
				description: 'this is a event'
			},
			{
				title: 'event1',
				description: 'this is a event'
			},
			{
				title: 'event1',
				description: 'this is a event'
			},
			{
				title: 'event1',
				description: 'this is a event'
			},
			{
				title: 'event1',
				description: 'this is a event'
			}
		],
		visible: false
	};

	toggleModal = () => {
		console.log('hello');
		this.setState({
			visible: !this.state.visible
		});
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
							<Button className="header-button sign-up" onClick={this.toggleModal}>
								Register
							</Button>
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
				<Modal visible={this.state.visible} footer={null} onCancel={this.toggleModal}>
					<RegisterForm />
				</Modal>
			</div>
		);
	}
}

export default App;
