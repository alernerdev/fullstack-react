import React from 'react';
import ReactDOM from 'react-dom';

import TimerForm from './TimerForm';

// + sign or an open form
export default class ToggleableTimerForm extends React.Component {
	state = {
		isOpen: false
	};

	handleFormOpen = () => {
		this.setState({isOpen: true});
	}

	handleFormClose = () => {
		this.setState({isOpen: false});
	}

	handleFormSubmit = (timer) => {
		// submit from TimerForm below gets here, we catch it, and pass
		// it further up
		/* also, potentially, onFormSubmit could be async call to the server and the form
		closes regardless -- which means response comes back after form is closed
		*/
		this.props.onFormSubmit(timer);
		this.setState({isOpen: false});
	}

	render() {
		if (this.state.isOpen) {
			return (
				<TimerForm
					onFormSubmit={this.handleFormSubmit}
					onFormClose={this.handleFormClose}
				/>
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

