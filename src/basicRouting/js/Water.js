import React from 'react';

const Route = ({path, component}) => {
	const pathname = window.location.pathname;
	console.log(`matching ${path} to ${pathname}`);
	if (pathname.match(path)) {
		React.createElement(component);
	}
	else {
		return null;
	}
}

export default class Water extends React.Component {
	render() {
		return (
			<div className='ui text container'>
				<h2 className='ui dividing header'>
					Which body of water?
				</h2>
				<ul>
					<li>
						<a href='/basicroutingapp/atlantic'>
							<code>/atlantic</code>
						</a>
					</li>
					<li>
						<a href='/pacific'>
							<code>/pacific</code>
						</a>
					</li>
				</ul>
				<hr />
				<Route path='/basicroutingapp/atlantic' component={Atlantic} />
				<Route path='/pacific' component={Pacific} />
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
