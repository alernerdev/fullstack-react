import React, { PropTypes } from 'react';
import styles from '../styles/switchstyle.css';

const CREDITCARD = 'Creditcard';
const BTC = 'Bitcoin';
const CASH = 'Cash';
const CHECK = 'Check';

const Choice = function (props) {
	const cssClasses = [];

	if (props.active) {
		// <-- check props, not state
		cssClasses.push("active");
	}

	return (
		<div
			onClick={props.onClick}
			className={cssClasses}
		>
			{props.label} {/* <-- allow any label */}
		</div>
	);
};

export default class Switch extends React.Component {
	state = {
		payMethod: BTC,
	};

	select = (choice) => {
		return (evt) => {
			this.setState({
			payMethod: choice,
		})};
	};

	render() {
		return (
			<div className='switch'>
				<Choice
					onClick={this.select(CASH)}
					active={this.state.payMethod === CASH}
					label='Pay with Cash'
				/>
				<Choice
					onClick={this.select(CHECK)}
					active={this.state.payMethod === CHECK}
					label='Pay with Check'
				/>
				<Choice
					onClick={this.select(CREDITCARD)}
					active={this.state.payMethod === CREDITCARD}
					label='Pay with Creditcard'
				/>

				<Choice
					onClick={this.select(BTC)}
					active={this.state.payMethod === BTC}
					label='Pay with Bitcoin'
				/>
				<div className="selection">
					Paying with: {this.state.payMethod}
				</div>
			</div>
		);
	}
}

