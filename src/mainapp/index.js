import React from 'react';
import ReactDOM from 'react-dom';
import '../favicon.ico'; // Tell webpack to load favicon.ico
import '../../node_modules/semantic-ui/dist/semantic.min.css';
import '../../node_modules/semantic-ui/dist/components/menu.min.css';
import Header from '../common/header';

ReactDOM.render(
	<Header active="main"/>,
	document.getElementById('header')
)


