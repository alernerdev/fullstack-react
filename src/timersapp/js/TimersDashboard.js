import React from 'react';
import ReactDOM from 'react-dom';

import helpers from './helpers';

import ToggleableTimerForm from './ToggleableTimerForm';
import EditableTimerList from './EditableTimerList';

const UIDGenerator = require('uid-generator');
const uidgen = new UIDGenerator(); // Default is a 128-bit UID encoded in base58


// container for the list and the + sign at the bottom
export default class TimersDashboard extends React.Component {
	state = {
		timers: [
			{
				title: "Practice Squat",
				project: "Gym Chores",
				id: uidgen.generateSync(),
				elapsed: 5456099,
				runningSince: Date.now()
			},
			{
				title: "Bake Squash",
				project: "Kitchen Chores",
				id: uidgen.generateSync(),
				elapsed: 1273998,
				runningSince: null
			}
		]
	};

	handleCreateFormSubmit = (timer) => {
		this.createTimer(timer);
	};

	createTimer = (timer) => {
		const t = helpers.newTimer(timer);
		this.setState({timers: this.state.timers.concat(t)});
		console.log('added a new timer to the list of total  ' +
			this.state.timers.length + " timers");
	};

	handleEditFormSubmit = (attrs) => {
		this.updateTimer(attrs);
	};

	handleTrashClick = (timerId) => {
		console.log("TimerDashboard: handleTrashClick");
		this.deleteTimer(timerId);
	};

	handleStartClick = (timerId) => {
		console.log("TimerDashboard: handleStartClick");
		this.startTimer(timerId);
	};

	handleStopClick = (timerId) => {
		this.stopTimer(timerId);
	};

	/*
		look through the list of timers looking for a specific id and update it
		I am generating a new state array of timers rather than modifying an existing state
	*/
	updateTimer = (attrs) => {
		this.setState({
			timers: this.state.timers.map((timer) => {
				if (timer.id === attrs.id) {
					console.log("found a timer match");
					return Object.assign({}, timer, {
						title: attrs.title,
						project: attrs.project
					});
				}
				else {
					return timer;
				}
			})
		});
	};

	deleteTimer = (timerId) => {
		this.setState({
			timers: this.state.timers.filter(t => t.id !== timerId),
		});
	};

	startTimer = (timerId) => {
		const now = Date.now();

		this.setState({
			timers: this.state.timers.map((timer) => {
				if (timer.id === timerId) {
					return Object.assign({}, timer, {
						runningSince: now
					});
				}
				else {
					return timer;
				}
			})
		});
	};

	stopTimer = (timerId) => {
		const now = Date.now();	
		
		this.setState({
			timers: this.state.timers.map((timer) => {
				if (timer.id === timerId) {
					const lastElapsed = now - timer.runningSince;
					return Object.assign({}, timer, {
						elapsed: timer.elapsed + lastElapsed,
						runningSince: null
					});
				}
				else {
					return timer;
				}
			})
		});
	}

	render() {
		return (
			<div className='ui three column centered grid'>
				<div className='column'>
					<EditableTimerList
						timers={this.state.timers}
						onFormSubmit={this.handleEditFormSubmit}
						onTrashClick={this.handleTrashClick}
						onStartClick={this.handleStartClick}
						onStopClick={this.handleStopClick}
					/>
					<ToggleableTimerForm
						onFormSubmit = {this.handleCreateFormSubmit}/>
				</div>
			</div>
		);
	}
}
