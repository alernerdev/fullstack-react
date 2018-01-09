import React from 'react';
import ReactDOM from 'react-dom';

import EditableTimer from './EditableTimer';

// list of timers which can be edited
// editFormOpen controls which flavor is showm
export default class EditableTimerList extends React.Component {
	render() {
		console.log("rendering editabletimerlist.");
		const timers = this.props.timers.map((timer) => {
			console.log("looping over list");

			return(<EditableTimer
				key = {timer.id}
				id = {timer.id}
				title= {timer.title}
				project={timer.project}
				elapsed={timer.elapsed}
				runningSince={timer.runningSince}
				onFormSubmit = {this.props.onFormSubmit}
				onTrashClick={this.props.onTrashClick}
				onStartClick = {this.props.onStartClick}
				onStopClick={this.props.onStopClick}
			/>);
		});
		return (
			<div id='timers'>
				{timers}
			</div>
		);
	}
}
