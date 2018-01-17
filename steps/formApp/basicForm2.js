import React from 'react';
import ReactDOM from 'react-dom';

// using ref gives direct access to the DOM element
export default class FormDemo extends React.Component {
    state = {
        names: []
    };

    onFormSubmit = (evt) => {
        const name = this.refs.name.value;
        // unpack the old state array and make a new one + new name
        const names = [...this.state.names, name];
        this.setState({names: names});
        this.refs.name.value = '';

        evt.preventDefault();
    }
    
    render() {
        return (
            <div>
                <h1> Sign Up Sheet </h1>
                <form onSubmit={this.onFormSubmit}>
                    <input placeholder="Name" ref="name" />
                    <input type="submit" />
                </form>
                <div>
                    <h3>List of Names</h3>
                    <ul>
                        {/* return li element for each name in the array */}
                        {this.state.names.map((name, index) => {
                            return <li key={index}> {name}</li>
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}