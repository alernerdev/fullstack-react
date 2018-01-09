import React from 'react';
import ReactDOM from 'react-dom';

import helpers from './helpers';
import TimerActionButton from './TimerActionButton';

export default class Timer extends React.Component {
	componentDidMount() {
		// save the interval id
		this.forceUpdateInterval = setInterval( () => this.forceUpdate(), 100);
	}

	componentWillUnmount() {
		clearInterval(this.forceUpdateInterval);
	}

	handleStartClick = () => {
		console.log("Timer: handleStartClick");
		this.props.onStartClick(this.props.id);
	};
	
	handleStopClick = () => {
		console.log("Timer: handleStopClick");
		this.props.onStopClick(this.props.id);		
	};

	handleTrashClick = () => {
		console.log("Timer: handleTrashClick");
		this.props.onTrashClick(this.props.id);
	};

	render() {
		const elapsedString = 
			helpers.renderElapsedString(this.props.elapsed, this.props.runningSince);

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
						<span
							className='right floated edit icon'
							onClick={this.props.onEditClick}
						>
							<i className='edit icon' />
						</span>
						<span
							className='right floated trash icon'
							onClick={this.handleTrashClick}
						>
							<i className='trash icon' />
						</span>
					</div>
				</div>
				<TimerActionButton
					timerIsRunning={!!this.props.runningSince}
					onStartClick={this.handleStartClick}
					onStopClick={this.handleStopClick}
				/>
			</div>
		);
	}
}