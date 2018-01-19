/*
  eslint-disable react/prefer-stateless-function, react/jsx-boolean-value,
  no-undef, jsx-a11y/label-has-for
*/
import React from 'react';
import ReactDOM from 'react-dom';

import Switch from './Switch';
import Counter from './Counter';

class ComponentCollage extends React.Component {
	render() {
		return (
			<div>
				<Switch />
				<Counter initialValue={6}/>
			</div>
		);
	}
}

ReactDOM.render(
	<ComponentCollage />,
	document.getElementById('content')
);
