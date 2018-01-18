import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import validator from 'validator';

class Field extends React.Component {
    static propTypes = {
        placeholder: PropTypes.string,
        name: PropTypes.string.isRequired,
        value: PropTypes.string,
        validate: PropTypes.func,
        onChange: PropTypes.func.isRequired
    };
    state = {
        value: this.props.value,
        error: false
    }

    componentWillReceiveProps(update) {
        this.setState({value: update.value});
    }

    /* from input to here, from here further up to the parent */
    onChange = (evt) => {
        const name = this.props.name;
        const value = evt.target.value;
        // if validate func was passed in, validate it
        const error = this.props.validate ? this.props.validate(value) : false;
        this.setState({value, error});

        this.props.onChange({name, value, error});
    }

    render() {
        return (
            <div>
                <input 
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    onChange={this.onChange}
                />
                <span style={{color:'red'}}>{this.state.error}</span>
            </div>
        );
    }
}

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
                            return <li key={index}> {name} ({email})</li>
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}