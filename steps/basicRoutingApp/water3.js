import React from 'react';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();

const Link = ({to, children}) => {
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

const Route = ({path, component}) => {
	const pathname = window.location.pathname;
	console.log(`matching ${path} to ${pathname}`);
	if (pathname.match(path)) {
		return React.createElement(component);
	}
	else {
		return null;
	}
}

export default class Water extends React.Component {
	componentDidMount() {
		// whenever browser url changes, force re-render
		history.listen(() => this.forceUpdate());
	}

	render() {
		return (
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
