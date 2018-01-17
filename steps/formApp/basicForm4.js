import React from 'react';
import ReactDOM from 'react-dom';

// using ref gives direct access to the DOM element
export default class FormDemo extends React.Component {
    state = {
        fields: { // individual fields
            name: '',
            email: ''
        },
        people: []
    };

    // the value from the text input goes into state which forces a display of the 
    // text in the widget
    onInputChange = (evt) => {
        const fields = this.state.fields;
        // field name is stored in the name
        fields[evt.target.name] = evt.target.value;
        this.setState({fields});
    }

    onFormSubmit = (evt) => {
        // unpack the old state array and make a new one + new name
        // state.name is continuously updated in onNameChange
        const people = [...this.state.people, this.state.fields];
        // clear out the name after each submit.
        this.setState(
            {
                people, 
                fields: {name:'', email:''}
            }
        );

        evt.preventDefault();
    }
    
    render() {
        return (
            <div>
                <h1> Sign Up Sheet </h1>
                <form onSubmit={this.onFormSubmit}>
                    <input 
                        placeholder="Name"
                        name="name"
                        value={this.state.fields.name}
                        onChange={this.onInputChange}
                    />
                    <input 
                        placeholder="Email"
                        name="email"
                        value={this.state.fields.email}
                        onChange={this.onInputChange}
                    />
                    <input type="submit" />
                </form>
                <div>
                    <h3>List of Names</h3>
                    <ul>
                        {/* return li element for each name in the array */}
                        {this.state.people.map(({name, email}, index) => {
                            return <li key={index}> {name} ({email})</li>
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}