import React from 'react';
import ReactDOM from 'react-dom';

// using ref gives direct access to the DOM element
export default class FormDemo extends React.Component {
    state = {
        name: '',
        names: []
    };

    // the value from the text input goes into state which forces a display of the 
    // text in the widget
    onNameChange = (evt) => {
        this.setState({name: evt.target.value});
    }

    onFormSubmit = (evt) => {
        // unpack the old state array and make a new one + new name
        const names = [...this.state.names, this.state.name];
        this.setState({names: names, name:''});

        evt.preventDefault();
    }
    
    render() {
        return (
            <div>
                <h1> Sign Up Sheet </h1>
                <form onSubmit={this.onFormSubmit}>
                    <input 
                        placeholder="Name"
                        value={this.state.name}
                        onChange={this.onNameChange}
                    />
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