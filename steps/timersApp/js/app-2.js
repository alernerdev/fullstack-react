/*
  eslint-disable react/prefer-stateless-function, react/jsx-boolean-value,
  no-undef, jsx-a11y/label-has-for
*/
import React from 'react';
import ReactDOM from 'react-dom';
import uuid from 'uuid/v4';

import './helpers';


// container for the list and the + sign at the bottom
class TimersDashboard extends React.Component {
	state = {
		timers: [
			{
				title: "Practice Squat",
				project: "Gym Chores",
				id: uuid(),
				elapsed: 5456099,
				runningSince: Date.now()
			},
			{
				title: "Bake Squash",
				project: "Kitchen Chores",
				id: uuid(),
				elapsed: 1273998,
				runningSince: null
			}
		]
	};

	render() {
		return (
			<div className='ui three column centered grid'>
				<div className='column'>
					<EditableTimerList timers={this.state.timers}/>
					<ToggleableTimerForm/>
				</div>
			</div>
		);
	}
}

// + sign or an open form
class ToggleableTimerForm extends React.Component {
	state = {
		isOpen: false
	};

	handleFormOpen = () => {
		this.setState({isOpen: true});
	}

	render() {
		if (this.state.isOpen) {
			return (
				<TimerForm />
			);
		} else {
			return (
				<div className='ui basic content center aligned segment'>
					<button
						className='ui basic button icon'
						onClick={this.handleFormOpen}
					>
						<i className='plus icon' />
					</button>
				</div>
			);
		}
	}
}

// list of timers which can be edited
// editFormOpen controls which flavor is showm
class EditableTimerList extends React.Component {
	render() {
		const timers = this.props.timers.map((timer) => {
			<EditableTimer
				key = {timer.id}
				id = {timer.id}
				title= {timer.title}
				project={timer.project}
				elapsed={timer.elspased}
				runningSince={timer.runningSince}
			/>
		});
		return (
			<div id='timers'>
				{timers}
			</div>
		);
	}
}

// one timer instance that can be edited
class EditableTimer extends React.Component {
	state = {
		editFormOpen: false
	};

	render() {
		if (this.state.editFormOpen) {
			return (
				<TimerForm
					id={this.props.id}
					title={this.props.title}
					project={this.props.project}
				/>
			);
		} else {
			return (
				<Timer
					id={this.props.id}
					title={this.props.title}
					project={this.props.project}
					elapsed={this.props.elapsed}
					runningSince={this.props.runningSince}
				/>
      );
    }
  }
}

class Timer extends React.Component {

	render() {
		const elapsedString = helpers.renderElapsedString(this.props.elapsed);
		return (
			<div className='ui centered card'>
				<div className='content'>
					<div className='header'>
						{this.props.title}
					</div>
					<div className='meta'>
						{this.props.project}
					</div>
					<div className='center aligned description'>
						<h2>
							{elapsedString}
						</h2>
					</div>
					<div className='extra content'>
						<span className='right floated edit icon'>
							<i className='edit icon' />
						</span>
						<span className='right floated trash icon'>
							<i className='trash icon' />
						</span>
					</div>
				</div>
				<div className='ui bottom attached blue basic button'>
					Start
				</div>
			</div>
		);
	}
}

class TimerForm extends React.Component {
	state = {
		title: this.props.title || '',
		project: this.props.project || ''
	};

	handleTitleChange = (e) => {
		this.setState({title: e.target.value});
	}

	handleProjectChange = (e) => {
		this.setState({project: e.target.value});
	}

	render() {
		const submitText = this.props.title ? 'Update' : 'Create';

		/* when creating a new timer, these props will not be passed in and
		will be initially empty. But when editing a form, these fields will be filled in */
		return (
			<div className='ui centered card'>
				<div className='content'>
					<div className='ui form'>
						<div className='field'>
							<label>Title</label>
							<input
								type='text'
								value={this.state.title}
								onChange={this.handleTitleChange}
							/>
						</div>
						<div className='field'>
							<label>Project</label>
							<input
								type='text'
								value={this.state.project}
								onChange={this.handleProjectChange}
							/>
						</div>
						<div className='ui two bottom attached buttons'>
							<button className='ui basic blue button'>
								{submitText}
							</button>
							<button className='ui basic red button'>
								Cancel
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

ReactDOM.render(
	<TimersDashboard />,
	document.getElementById('content')
);
