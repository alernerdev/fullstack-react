import React from 'react';
import ReactDOM from 'react-dom';

// using ref gives direct access to the DOM element
export default class FormDemo extends React.Component {
    onFormSubmit = (evt) => {
        evt.preventDefault();
        console.log(this.refs.name.value);
    }
    
    render() {
        return (
            <div>
                <h1> Sign Up Sheet </h1>
                <form onSubmit={this.onFormSubmit}>
                    <input placeholder="Name" ref="name" />
                    <input type="submit" />
                </form>
            </div>
        );
    }
}