import React from 'react';
import ReactDOM from 'react-dom';

import Timer from './Timer';

// one timer instance that can be edited
export default class EditableTimer extends React.Component {
	state = {
		editFormOpen: false
	};

	handleEditClick = () => {
		console.log("got to handleEditClick");
		this.openForm();
	};

	handleFormClose = () => {
		this.closeForm();
	};

	openForm = () => {
		this.setState({editFormOpen: true});
	};

	closeForm = () => {
		this.setState({editFormOpen: false});
	};

	handleSubmit = (timer) => {
		this.props.onFormSubmit();
		this.closeForm();
	}

	render() {
		console.log("I am in EditableTimer and title is " + this.props.title);

		if (this.state.editFormOpen) {
			return (
				<TimerForm
					id={this.props.id}
					title={this.props.title}
					project={this.props.project}
					onFormSubmit={this.handleSubmit}
					onFormClose={this.handleFormClose}
					onStartClick = {this.props.onStartClick}
					onStopClick={this.props.onStopClick}
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
					onEditClick={this.handleEditClick}
					onTrashClick={this.props.onTrashClick}
				/>
      );
    }
  }
}
