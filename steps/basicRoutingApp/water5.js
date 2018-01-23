import React from 'react';
import PropTypes from 'prop-types';
import {
	BrowserRouter as Router, Route, Link, Redirect, Switch
} from 'react-router-dom';

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
							<Link to ='/basicroutingapp/atlantic/ocean'>
								<code>/atlantic/ocean</code>
							</Link>
						</li>
						<li>
							<Link to ='/basicroutingapp/pacific'>
								<code>/pacific</code>
							</Link>
						</li>
						<li>
							<Link to ='/basicroutingapp/black-sea'>
								<code>/black-sea</code>
							</Link>
						</li>
						<li>
							<Link to ='/basicroutingapp/badlink'>
								<code>/simulate-bad-click</code>
							</Link>
						</li>
					</ul>
					<hr />

					<Switch> {/*match the first route -- not all that match*/}
						<Route path='/basicroutingapp/atlantic/ocean' render={()=>{
							return (<div>
								<h3>More stuff on atlantic ocean</h3>
								<h4>notice the /atlantic/ocean url</h4>
							</div>);
						}} />
						<Route path='/basicroutingapp/atlantic' component={Atlantic} />
						<Route path='/basicroutingapp/pacific' component={Pacific} />
						<Route path='/basicroutingapp/black-sea' component={BlackSea} />
						<Route exact={true} path='/basicroutingapp/' render={()=>{
							return (<div>
								<h3>Welcome. '/' state before the url got changed</h3>
							</div>);
						}} />
						{/*when no path specified, matches every location*/}
						<Route render={({location})=>{
							return (<div className='ui inverted red segment'>
								<h3>Error. No matches for <code>{location.pathname}</code></h3>
							</div>);
						}} />
					</Switch>
				</div>
			</Router>
		);
	}
}

class BlackSea extends React.Component {
    state = {
        counter: 3
    };

    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState(prevState => {
                return {
                    counter: prevState.counter - 1
                };
            });
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div>
                <h3>Black Sea</h3>
                <p>Nothing to sea here...</p>
                <p>Redirecting in {this.state.counter} seconds...</p>
                {
                    (this.state.counter < 1) ? 
                        (<Redirect to='/basicroutingapp' />) : null
                }
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
