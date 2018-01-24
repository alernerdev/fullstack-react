import React from 'react';
import ReactDOM from 'react-dom';
import './js/app';
import '../../node_modules/semantic-ui/dist/semantic.min.css';
import '../favicon.ico'; // Tell webpack to load favicon.ico
import Header from '../common/header';

ReactDOM.render(
	<Header active="form"/>,
	document.getElementById('header')
)
