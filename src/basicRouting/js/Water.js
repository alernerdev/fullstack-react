import React from 'react';
import PropTypes from 'prop-types';
import createHistory from 'history/createBrowserHistory';

class Router extends React.component {
	static childContextTypes = {
		history: PropTypes.object,
		location: PropTypes.object
	}

	constructor(props) {
		super(props);
		this.history = createHistory();
		this.history.listen(() => this.forceUpdate());
	}

	getChildContext() {
		return {
			history: this.history,
			location: window.location
		}
	}

	render() {
		return this.props.children;
	}
}

const Link = ({to, children}, {history}) => {
	return (<a onClick={(e) => {
					// prevent the browser to go to the server by default
					e.preventDefault();
					history.push(to);
				}}
				href={to}
			>
				{/*render the children this wrapper is wrapping*/}
				{children}
			</a>
		);
}
Link.contextTypes = {
	history: PropTypes.oject
}

const Route = ({path, component}, {location}) => {
	const pathname = location.pathname;
	console.log(`matching ${path} to ${pathname}`);
	if (pathname.match(path)) {
		return React.createElement(component);
	}
	else {
		return null;
	}
}
Route.contextTypes = {
	location: PropTypes.oject
}

export default class Water extends React.Component {
	render() {
		return (
			<Router>
				<div className='ui text container'>
					<h2 className='ui dividing header'>
						Which body of water?
					</h2>
					<ul>
						<li>
							<Link to ='/basicroutingapp/atlantic'>
								<code>/atlantic</code>
							</Link>
						</li>
						<li>
							<Link to ='/basicroutingapp/pacific'>
								<code>/pacific</code>
							</Link>
						</li>
					</ul>
					<hr />

					<Route path='/basicroutingapp/atlantic' component={Atlantic} />
					<Route path='/basicroutingapp/pacific' component={Pacific} />
			</div>
			</Router>
		);
	}
}

const Atlantic = () => (
	<div>
		<h3>Atlantic Ocean</h3>
		<p>
			The Atlantic Ocean covers approximately 1/5th of the surface of the earth.
		</p>
	</div>
);

const Pacific = () => (
	<div>
		<h3>Pacific Ocean</h3>
		<p>
			Ferdinand Magellan, a Portuguese explorer, named the ocean
			'mar pacifico' in 1521, which means peaceful sea.
		</p>
	</div>
);
