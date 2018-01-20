import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import validator from 'validator';
import Field from './Field';

// using ref gives direct access to the DOM element
export default class FormDemo extends React.Component {
    state = {
        fields: { // individual fields
            name: '',
            email: ''
        },
        people: [],
        fieldErrors: {}
    };

    validate = () => {
        const person = this.state.fields;
        const fieldErrors = this.state.fieldErrors;
        const errMessages = Object.keys(fieldErrors).filter((k)=>fieldErrors[k]);

        if (!person.name)
            return true;
        if (!person.email)
            return true;
        if (errMessages.length)
            return true;

        return false;
    }

    // this function is involded by Field
    onInputChange = ({name, value, error}) => {
        const fields = this.state.fields;
        const fieldErrors = this.state.fieldErrors;
        fields[name] = value;
        fieldErrors[name] = error;
        this.setState({fields, fieldErrors});
    }

    onFormSubmit = (evt) => {
        const people = this.state.people;
        const person = this.state.fields;
        evt.preventDefault();

        if (this.validate())
            return;

        this.setState({
            people: people.concat(person),
            fields: {
                name:'',
                email:''
            }
        });
    }

    render() {
        return (
            <div>
                <h1> Sign Up Sheet </h1>
                <form onSubmit={this.onFormSubmit}>
                    <Field
                        placeholder="Name"
                        name="name"
                        value={this.state.fields.name}
                        onChange={this.onInputChange}
                        validate={(val)=> (val ? false : 'Name Required')}
                    />
                    <br/>
                    <Field
                        placeholder="Email"
                        name="email"
                        value={this.state.fields.email}
                        onChange={this.onInputChange}
                        validate={(val)=> (validator.isEmail(val) ? false : 'Invalid Email')}
                    />
                    <br/>
                    <input type="submit" disabled={this.validate()}/>
                </form>
                <div>
                    <h3>People</h3>
                    <ul>
                        {/* return li element for each name in the array */}
                        {this.state.people.map(({name, email}, index) => {
                            return (<li key={index}> {name} ({email})</li>);
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}
