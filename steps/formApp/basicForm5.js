import React from 'react';
import ReactDOM from 'react-dom';
import validator from 'validator';

export default class FormDemo extends React.Component {
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

    componentWillRecieveProps(update) {
        this.setState({value: update.value});
    }

    /* from input to here, from here further up to the parent */
    onChange = (evt) => {
        const name = this.props.name;
        const value = evt.target.value;
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

    validate = (person) => {
        const errors = {};
        if (!person.name) 
            errors.name = 'Name required';
        if (!person.email) 
            errors.email = 'Email required';
        if (person.email && !validator.isEmail(person.email)) 
            errors.email = 'Invalid email';

        return errors;
    }

    // the value from the text input goes into state which forces a display of the 
    // text in the widget
    onInputChange = (evt) => {
        const fields = this.state.fields;
        // field name is stored in the name
        fields[evt.target.name] = evt.target.value;
        this.setState({fields});
    }

    onFormSubmit = (evt) => {
        const people = [...this.state.people];
        const person = this.state.fields;
        const fieldErrors = this.validate(person);
        this.setState({fieldErrors});
        evt.preventDefault();

        if (Object.keys(fieldErrors).length)
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
                    <input 
                        placeholder="Name"
                        name="name"
                        value={this.state.fields.name}
                        onChange={this.onInputChange}
                    />
                    <span style={{color:'red'}}>{this.state.fieldErrors.name}</span>
                    <br/>
                    <input 
                        placeholder="Email"
                        name="email"
                        value={this.state.fields.email}
                        onChange={this.onInputChange}
                    />
                    <span style={{color:'red'}}>{this.state.fieldErrors.email}</span>
                    <br/>
                    <input type="submit" />
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