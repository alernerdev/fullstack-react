/*
  eslint-disable react/prefer-stateless-function, react/jsx-boolean-value,
  no-undef, jsx-a11y/label-has-for
*/
import React from 'react';
import ReactDOM from 'react-dom';

import TimersDashboard from './TimersDashboard';

ReactDOM.render(
	<TimersDashboard />,
	document.getElementById('content')
);
