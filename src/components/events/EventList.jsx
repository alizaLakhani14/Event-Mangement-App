import React from 'react';
import { Row } from 'antd';
import Event from './Event';
import './EventList.css';

const EventList = ({ events }) => {
	console.log(events);
	return (
		<div style={{ padding: '30px' }} className='EventList'>
			
				{events.map((event) => (
					<Event title={event.title} description={event.description} key={Math.random() * 1000} />
				))}
		</div>
	);
};

export default EventList;
