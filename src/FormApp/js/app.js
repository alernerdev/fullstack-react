import React from 'react';
import ReactDOM from 'react-dom';

import ButtonsDemo from './ButtonsDemo';
import FormDemo from './FormDemo';
import AsyncFormDemo from './AsyncFormDemo';

ReactDOM.render(
	<ButtonsDemo />,
	document.getElementById('content')
);
ReactDOM.render(
	<FormDemo />,
	document.getElementById('contentForm')
);
ReactDOM.render(
	<AsyncFormDemo />,
	document.getElementById('contentAsyncForm')
);




