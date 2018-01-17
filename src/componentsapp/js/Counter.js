import PropTypes from 'prop-types';
import React, {Component} from 'react';

const counterStyle = {
	width: '50px',
	textAlign: 'center',
	backgroundColor: 'aliceblue',
	padding: '10px'
};

class Counter extends Component {
	// notice that state was initialized from a passed in prop
    state = {
      value: this.props.initialValue
    };

	/*
		this is an example of setting a function into the state.  The first function
		argument is the prevState
		This demonstrates the fact that state is async.  You cannot calculate new state based off
		a prev state AND THEN set the new value -- there isa racing condition there.
	*/
	decrement = () => {
		this.setState(prevState => {
			return {
				value: prevState.value - 1
			};
		});
	};

	increment = () => {
		this.setState(prevState => {
			return {
				value: prevState.value + 1
			};
		});
	};

	render() {
		return (
			// notice style keyword -- for inline styling
			<div style={counterStyle} key="counter">
				{this.state.value}
				<p>
					<button onClick={this.increment}>+</button>
					<button onClick={this.decrement}>-</button>
				</p>
			</div>
		);
	}
}

Counter.propTypes = {
  initialValue: PropTypes.number
};

Counter.defaultProps = {
  initialValue: 120
};

export default Counter;
